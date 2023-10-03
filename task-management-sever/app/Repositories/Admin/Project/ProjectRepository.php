<?php

namespace App\Repositories\Admin\Project;

use App\Enums\SoftDeleteStatus;
use App\Models\Project;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function list($options)
    {
        $projectResponse = Project::query()
            ->with('user')
            ->when($options['soft_delete'] == SoftDeleteStatus::OnlySoftDelete->value, function ($query) {
                return $query->onlyTrashed();
            })
            ->when($options['soft_delete'] == SoftDeleteStatus::Both->value, function ($query) {
                return $query->withTrashed();
            })
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.project.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $projectResponse;
    }

    public function show($id)
    {
        return Project::withTrashed()->findOrFail($id);
    }

    public function create($projectDetails)
    {
        return Project::with('user')->firstOrCreate($projectDetails);
    }
}
