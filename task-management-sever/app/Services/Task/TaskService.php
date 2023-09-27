<?php

namespace App\Services\Task;

use App\Repositories\Task\TaskRepositoryInterface;

class TaskService implements TaskServiceInterface
{
    private TaskRepositoryInterface $taskRepository;
    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index($options, $project_id, $user_id)
    {
        $taskResponse = $this->taskRepository->getList($options, $project_id, $user_id);
        return $taskResponse;
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
        $taskResponse = $this->taskRepository->create($taskDetails);
        return $taskResponse;
    }

    public function update($taskDetails, $id)
    {
        $taskResponse = $this->taskRepository->update($taskDetails, $id);
        return $taskResponse;
    }

    public function delete($id)
    {
        $taskResponse = $this->taskRepository->delete($id);
        return $taskResponse;
    }
}
