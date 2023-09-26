<?php

namespace App\Repositories\Project;

use App\Models\Project;
use App\Repositories\Project\ProjectRepositoryInterface;
use App\Services\Paginate\PaginateService;

class ProjectRepository implements ProjectRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function getList($options, $user_id)
    {
        $query = Project::query()->joinedByUser($user_id);
        $project = $this->paginateService->paginate($options, $query);
        return $project;
    }

    public function getById(int $id, $user_id)
    {
        return Project::joinedByUser($user_id)->find($id);
    }
}
