<?php

namespace App\Repositories\Task;

use App\Models\Task\Task;
use App\Notifications\CreateTaskNotification;
use App\Repositories\Task\TaskRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class TaskRepository implements TaskRepositoryInterface
{

    public function list($options, $project_id, $user_id)
    {
        $taskResponse = Task::query()
            ->with(['user', 'createdBy'])
            ->ofProject($project_id)
            ->ofUser($user_id)
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

    public function show(int $id, $user_id)
    {
        return Task::with(['user', 'createdBy'])->ofUser($user_id)->findOrFail($id);
    }

    public function getById($id)
    {
        return Task::with(['user', 'createdBy'])->findOrFail($id);
    }

    public function create($taskDetails)
    {
        $taskResponse = Task::with(['user', 'createdBy'])->firstOrCreate(
            $taskDetails
        );
        Notification::send($taskResponse, new CreateTaskNotification($taskResponse));

        return $taskResponse;
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
}
