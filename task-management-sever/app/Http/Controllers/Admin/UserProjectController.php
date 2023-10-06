<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserProject\ListUserProjectRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\UserProjectResource;
use App\Services\Admin\UserProject\UserProjectService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class UserProjectController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private UserProjectService $userProjectService)
    {
    }

    public function index(ListUserProjectRequest $request, $project_id)
    {
        try {
            $userProjectResponse = $this->userProjectService->index($request->validated(), $project_id);

            return $this->success(new PaginateResource($userProjectResponse, UserProjectResource::collection($userProjectResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function create($project_id, $user_id)
    {
        try {
            $userProjectResponse = $this->userProjectService->create($project_id, $user_id);

            return $this->success(new UserProjectResource($userProjectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function delete($project_id, $user_id)
    {
        try {
            $userProjectResponse = $this->userProjectService->delete($project_id, $user_id);

            return $this->success(new UserProjectResource($userProjectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function restore($project_id, $user_id)
    {
        try {
            $userProjectResponse = $this->userProjectService->restore($project_id, $user_id);

            return $this->success(new UserProjectResource($userProjectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function force($project_id, $user_id)
    {
        try {
            $userProjectResponse = $this->userProjectService->force($project_id, $user_id);

            return $this->success(new UserProjectResource($userProjectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
