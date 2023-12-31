<?php

namespace App\Repositories\Admin\TaskReport;

use App\Enums\SoftDeleteStatus;
use App\Models\TaskReport\TaskReport;

class TaskReportRepository implements TaskReportRepositoryInterface
{
    public function list($options, $task_id)
    {
        return TaskReport::query()
            ->with(['task'])
            ->ofTask($task_id)
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
    }

    public function getById($id)
    {
        return TaskReport::withTrashed()->with(['task'])->findOrFail($id);
    }

    public function create($taskReportDetails)
    {
        return TaskReport::with(['task'])->firstOrCreate(
            $taskReportDetails
        );
    }

    public function update($taskReportDetails, $id)
    {
        $taskReportResponse = $this->getById($id);
        $taskReportResponse->update($taskReportDetails);

        return $taskReportResponse;
    }

    public function delete($id)
    {
        $taskReportResponse = $this->getById($id);
        $taskReportResponse->delete();

        return $taskReportResponse;
    }

    public function restore($id)
    {
        $taskReportResponse = $this->getById($id);
        $taskReportResponse->restore();

        return $taskReportResponse;
    }

    public function force($id)
    {
        $taskReportResponse = $this->getById($id);
        $taskReportResponse->forceDelete();

        return $taskReportResponse;
    }

    public function deleteMany($task_id)
    {
        $query = TaskReport::ofTask($task_id)->delete();
    }

    public function restoreMany($task_id)
    {
        $query = TaskReport::ofTask($task_id)->withTrashed()->restore();
    }

    public function forceMany($task_id)
    {
        $query = TaskReport::ofTask($task_id)->withTrashed()->forceDelete();
    }
}
