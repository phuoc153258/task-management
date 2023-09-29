<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Project\CreateProjectRequest;
use App\Http\Requests\Admin\Project\UpdateProjectUser;
use App\Http\Requests\Project\ListProjectRequest;
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
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $projectResponse = $this->projectService->show($id);

            return $this->success($projectResponse, trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function create(CreateProjectRequest $request)
    {
        try {
            $projectInfo = [...$request->validated(), 'created_by' => $this->getCurrentUser()->id];
            $projectResponse = $this->projectService->create($projectInfo);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function update(UpdateProjectUser $request, $id)
    {
        try {
            $projectResponse = $this->projectService->update($request->validated(), $id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'), 400);
        }
    }

    public function delete($id)
    {
        try {
            $projectResponse = $this->projectService->delete($id);

            return $this->success(new ProjectResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'), 400);
        }
    }
}
