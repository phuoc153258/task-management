<?php

namespace App\Repositories\Admin\Project;

use App\Models\Project;
use App\Services\Paginate\PaginateService;

class ProjectRepository implements ProjectRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function index($options)
    {
        $query = Project::query();
        $projectResponse = $this->paginateService->paginate($options, $query);
        return $projectResponse;
    }

    public function show($id)
    {
        return Project::find($id);
    }
}
