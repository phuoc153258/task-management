<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\ListProjectRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\ProjectResource;
use App\Services\Project\ProjectService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class ProjectController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private ProjectService $projectService)
    {
    }

    public function index(ListProjectRequest $request)
    {
        try {
            $user = $this->getCurrentUser();
            $projectResponse = $this->projectService->index($request->validated(), $user->id);

            return $this->success(new PaginateResource($projectResponse, ProjectResource::collection($projectResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $user = $this->getCurrentUser();
            $projectResponse = $this->projectService->show($id, $user->id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
