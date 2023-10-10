<?php

namespace App\Repositories\UserProject;

use App\Models\UserProject\UserProject;
use App\Repositories\UserProject\UserProjectRepositoryInterface;

class UserProjectRepository implements UserProjectRepositoryInterface
{
    public function list($options, $project_id)
    {
        $userProjectResponse = UserProject::query()
            ->with(['user', 'project'])
            ->ofProject($project_id)
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.user_project.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

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
        return UserProject::firstOrCreate(
            ['project_id' =>  $project_id, 'user_id' => $user_id],
        );
    }
}
