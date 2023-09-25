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

    public function index($options, $project_id)
    {
        $taskResponse = $this->taskRepository->getList($options, $project_id);
        return $taskResponse;
    }

    public function show($id, $project_id)
    {
        $taskResponse = $this->taskRepository->getById($id, $project_id);
        if (empty($taskResponse))
            abort(400, trans('base.base-failed'));

        return $taskResponse;
    }
}
