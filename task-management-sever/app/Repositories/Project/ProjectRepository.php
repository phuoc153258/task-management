<?php

namespace App\Repositories\Project;

use App\Models\Project;
use App\Repositories\Project\ProjectRepositoryInterface;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function list($options, $user_id)
    {
        $projectResponse = Project::query()->with('user')
            ->userHasJoined($user_id)
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.leave_request.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $projectResponse;
    }

    public function getById(int $id, $user_id)
    {
        return Project::with('user')->userHasJoined($user_id)->findOrFail($id);
    }
}
