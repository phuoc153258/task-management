<?php

namespace App\Repositories\UserProject;

use App\Models\UserProject;
use App\Repositories\UserProject\UserProjectRepositoryInterface;
use App\Services\Paginate\PaginateService;

class UserProjectRepository implements UserProjectRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function list($options, $project_id)
    {
        $query = UserProject::query()->ofProject($project_id);
        $userProjectResponse = $this->paginateService->paginate($options, $query);

        return $userProjectResponse;
    }

    public function getById(int $id, $project_id)
    {
        return UserProject::ofProject($project_id)->find($id);
    }

    public function isJoined($project_id, $user_id)
    {
        return UserProject::ofProject($project_id)->ofUser($user_id)->first();
    }

    public function create($project_id, $user_id)
    {
        $userProjectResponse = UserProject::firstOrCreate(
            ['project_id' =>  $project_id, 'user_id' => $user_id],
        );

        return $userProjectResponse;
    }
}
