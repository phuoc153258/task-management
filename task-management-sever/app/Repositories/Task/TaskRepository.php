<?php

namespace App\Repositories\Task;

use App\Models\Task;
use App\Repositories\Task\TaskRepositoryInterface;
use App\Services\Paginate\PaginateService;

class TaskRepository implements TaskRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function getList($options, $project_id, $user_id)
    {
        $query = Task::query()->ofProject($project_id)->ofUser($user_id);
        $task = $this->paginateService->paginate($options, $query);
        return $task;
    }

    public function getById(int $id, $project_id, $user_id)
    {
        return Task::ofProject($project_id)->ofUser($user_id)->find($id);
    }
}
