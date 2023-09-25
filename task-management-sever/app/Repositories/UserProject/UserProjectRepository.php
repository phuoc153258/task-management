<?php

namespace App\Repositories\UserProject;

use App\Models\UserProject;
use App\Repositories\UserProject\UserProjectRepositoryInterface;
use App\Services\Paginate\PaginateService;

class UserProjectRepository implements UserProjectRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct()
    {
        $this->paginateService = new PaginateService();
    }

    public function getList($options, $project_id)
    {
        $query = UserProject::query()->ofProject($project_id);
        $userProject = $this->paginateService->paginate($options, $query);
        return $userProject;
    }

    public function getById(int $id, $project_id)
    {
        return UserProject::ofProject($project_id)->find($id);
    }

    public function getUserHasJoined($project_id, $user_id)
    {
        return UserProject::where('project_id', $project_id)->where('user_id', $user_id)->first();
    }
}