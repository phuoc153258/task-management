<?php

namespace App\Services\Task;

use App\Repositories\Task\TaskRepositoryInterface;

class TaskService implements TaskServiceInterface
{
    public function __construct(private TaskRepositoryInterface $taskRepository)
    {
    }

    public function index($options, $user_id)
    {
        return  $this->taskRepository->list($options, $user_id);
    }

    public function show($id, $user_id)
    {
        return $this->taskRepository->show($id, $user_id);
    }

    public function create($taskDetails)
    {
        return $this->taskRepository->create($taskDetails);
    }

    public function update($taskDetails, $id)
    {
        return $this->taskRepository->update($taskDetails, $id);
    }

    public function delete($id)
    {
        return $this->taskRepository->delete($id);
    }
}
