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

    public function list($options, $project_id, $user_id)
    {
        $query = Task::query()->ofProject($project_id)->ofUser($user_id);
        $taskResponse = $this->paginateService->paginate($options, $query);

        return $taskResponse;
    }

    public function getById(int $id, $project_id, $user_id)
    {
        return Task::ofProject($project_id)->ofUser($user_id)->find($id);
    }

    public function create($taskDetails)
    {
        $taskResponse = Task::firstOrCreate(
            $taskDetails
        );

        return $taskResponse;
    }

    public function update($taskDetails, $id)
    {
        $taskResponse = Task::find(intval($id));
        $taskResponse->update($taskDetails);

        return $taskResponse;
    }

    public function delete($id)
    {
        $taskResponse = Task::find(intval($id));
        $taskResponse->delete();

        return $taskResponse;
    }
}
