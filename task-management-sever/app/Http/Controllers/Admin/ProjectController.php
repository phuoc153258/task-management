<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Project\CreateProjectRequest;
use App\Http\Requests\Admin\Project\ListProjectRequest;
use App\Http\Requests\Admin\Project\UpdateProjectUser;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\ProjectResource;
use App\Services\Admin\Project\ProjectService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class ProjectController extends Controller
{
    use Authorizable, HttpResponsable;

    public function __construct(private ProjectService $projectService)
    {
    }

    public function index(ListProjectRequest $request)
    {
        try {
            $projectResponse = $this->projectService->index($request->validated());

            return $this->success(new PaginateResource($projectResponse, ProjectResource::collection($projectResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $projectResponse = $this->projectService->show($id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function create(CreateProjectRequest $request)
    {
        try {
            $projectResponse = $this->projectService->create($request->validated());

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateProjectUser $request, $id)
    {
        try {
            $projectResponse = $this->projectService->update($request->validated(), $id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function delete($id)
    {
        try {
            $projectResponse = $this->projectService->delete($id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function restore($id)
    {
        try {
            $projectResponse = $this->projectService->restore($id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function force($id)
    {
        try {
            $projectResponse = $this->projectService->force($id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
