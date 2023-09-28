<?php

namespace App\Services\Task;

use App\Repositories\Task\TaskRepositoryInterface;

class TaskService implements TaskServiceInterface
{
    public function __construct(private TaskRepositoryInterface $taskRepository)
    {
    }

    public function index($options, $project_id, $user_id)
    {
        return  $this->taskRepository->list($options, $project_id, $user_id);
    }

    public function show($id, $project_id, $user_id)
    {
        $taskResponse = $this->taskRepository->getById($id, $project_id, $user_id);
        if (empty($taskResponse))
            abort(400, trans('base.base-failed'));

        return $taskResponse;
    }

    public function create($taskDetails)
    {
        return $this->taskRepository->create($taskDetails);
    }

    public function update($taskDetails, $id)
    {
        return  $this->taskRepository->update($taskDetails, $id);
    }

    public function delete($id)
    {
        return $this->taskRepository->delete($id);
    }
}
