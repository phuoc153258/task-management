<?php

namespace App\Repositories\Task;

use App\Models\Task\Task;
use App\Notifications\Admin\AdminCreateTaskNotification;
use App\Notifications\CreateTaskNotification;
use App\Repositories\Admin\User\UserRepository;
use App\Repositories\Task\TaskRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class TaskRepository implements TaskRepositoryInterface
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    public function list($options, $user_id)
    {
        $taskResponse = Task::query()
            ->with(['user', 'createdBy', 'project'])
            ->when(!empty($options['project_id']), function ($query) use ($options) {
                return $query->ofProject($options['project_id']);
            })
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
        return Task::with(['user', 'createdBy', 'project'])->ofUser($user_id)->findOrFail($id);
    }

    public function getById($id)
    {
        return Task::with(['user', 'createdBy', 'project'])->findOrFail($id);
    }

    public function create($taskDetails)
    {
        $taskResponse = Task::with(['user', 'createdBy', 'project'])->firstOrCreate(
            $taskDetails
        );

        $users = $this->userRepository->getUsersHasRole([config('role.admin')]);
        Notification::send($taskResponse, new CreateTaskNotification($taskResponse));
        foreach ($users as $value) {
            Notification::send($taskResponse, new AdminCreateTaskNotification($taskResponse, $value));
        }

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
