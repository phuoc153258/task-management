<?php

namespace App\Repositories\Admin\Task;

use App\Enums\SoftDeleteStatus;
use App\Models\Task;

class TaskRepository implements TaskRepositoryInterface
{
    public function list($options, $project_id)
    {
        $taskResponse = Task::query()
            ->with(['user', 'createdBy'])
            ->ofProject($project_id)
            ->when($options['soft_delete'] == SoftDeleteStatus::OnlySoftDelete->value, function ($query) {
                return $query->onlyTrashed();
            })
            ->when($options['soft_delete'] == SoftDeleteStatus::Both->value, function ($query) {
                return $query->withTrashed();
            })
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.task.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $taskResponse;
    }

    public function getById($id)
    {
        return Task::withTrashed()->with(['user', 'createdBy'])->findOrFail($id);
    }

    public function create($taskDetails)
    {
        return Task::with(['user', 'createdBy'])->firstOrCreate(
            $taskDetails
        );
    }

    public function update($taskDetails, $id)
    {
        $taskResponse = $this->getById($id);
        $taskResponse->update($taskDetails);

        return $taskResponse;
    }

    public function delete($id)
    {
        $taskResponse = $this->getById($id);
        $taskResponse->delete();

        return $taskResponse;
    }

    public function restore($id)
    {
        $taskResponse = $this->getById($id);
        $taskResponse->restore();

        return $taskResponse;
    }

    public function force($id)
    {
        $taskResponse = $this->getById($id);
        $taskResponse->forceDelete();

        return $taskResponse;
    }

    public function deleteMany($user_id, $project_id = null)
    {
        $query = Task::ofUser($user_id);

        if ($project_id != null) $query->ofProject($project_id);

        $query->chunk(100, function ($records) {
            foreach ($records as $record) {
                $record->delete();
            }
        });
    }
}
