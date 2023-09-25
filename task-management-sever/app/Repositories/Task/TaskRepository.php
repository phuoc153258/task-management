<?php

namespace App\Repositories\Task;

use App\Models\Task;
use App\Repositories\Task\TaskRepositoryInterface;
use App\Services\Paginate\PaginateService;

class TaskRepository implements TaskRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct()
    {
        $this->paginateService = new PaginateService();
    }

    public function getList($options, $project_id)
    {
        $query = Task::query()->ofProject($project_id);
        $task = $this->paginateService->paginate($options, $query);
        return $task;
    }

    public function getById(int $id, $project_id)
    {
        return Task::ofProject($project_id)->find($id);
    }
}
