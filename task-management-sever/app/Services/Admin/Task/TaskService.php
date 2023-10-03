<?php

namespace App\Services\Admin\Task;

use App\Repositories\Admin\Task\TaskRepositoryInterface;

class TaskService implements TaskServiceInterface
{
    public function __construct(private TaskRepositoryInterface $taskRepository)
    {
    }

    public function index($options, $project_id)
    {
        return $this->taskRepository->list($options, $project_id);
    }

    public function show($id)
    {
        return $this->taskRepository->getById($id);
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

    public function restore($id)
    {
        return $this->taskRepository->restore($id);
    }

    public function force($id)
    {
        return $this->taskRepository->force($id);
    }
}
