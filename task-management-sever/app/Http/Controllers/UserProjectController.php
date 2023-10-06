<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserProject\ListUserProjectRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\UserProjectResource;
use App\Services\UserProject\UserProjectService;
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
            $user = $this->getCurrentUser();
            $userProjectResponse = $this->userProjectService->index($request->validated(), $project_id, $user->id);

            return $this->success(new PaginateResource($userProjectResponse, UserProjectResource::collection($userProjectResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function create($project_id, $user_id)
    {
        try {
            $user = $this->getCurrentUser();
            $userProjectResponse = $this->userProjectService->create($project_id, $user_id, $user->id);

            return $this->success(new UserProjectResource($userProjectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function delete($project_id, $user_id)
    {
        try {
            $user = $this->getCurrentUser();
            $userProjectResponse = $this->userProjectService->delete($project_id, $user_id, $user->id);

            return $this->success(new UserProjectResource($userProjectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
