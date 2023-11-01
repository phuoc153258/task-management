<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\CreateUserRequest;
use App\Http\Requests\Admin\User\GetAllUserRequest;
use App\Http\Requests\Admin\User\ListUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Http\Requests\Admin\User\UploadAvatarUserRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\Admin\UserResource;
use App\Services\Admin\User\UserService;
use App\Traits\HttpResponsable;

class UserController extends Controller
{
    use HttpResponsable;

    public function __construct(private UserService $userService)
    {
    }

    public function index(ListUserRequest $request)
    {
        try {
            $userResponse = $this->userService->index($request->validated());

            return $this->success(new PaginateResource($userResponse,  UserResource::collection($userResponse->items())), trans('user.get-list-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $userResponse = $this->userService->show($id);

            return $this->success(new UserResource($userResponse), trans('user.get-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('user.get-user-failed'), 400);
        }
    }

    public function create(CreateUserRequest $request)
    {
        try {
            $userResponse = $this->userService->create($request->validated());

            return $this->success(new UserResource($userResponse), trans('user.create-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateUserRequest $request, $id)
    {
        try {
            $userResponse = $this->userService->update($request->validated(), $id);

            return $this->success(new UserResource($userResponse), trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('user.update-user-failed'), 400);
        }
    }

    public function avatar(UploadAvatarUserRequest $request, $id)
    {
        try {
            $userResponse = $this->userService->avatar($request->file('avatar'), $id);

            return $this->success(new UserResource($userResponse), trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('user.update-user-failed'), 400);
        }
    }

    public function password($id)
    {
        try {
            $userResponse = $this->userService->password($id);

            return $this->success(new UserResource($userResponse), trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('user.update-user-failed'), 400);
        }
    }

    public function delete($id)
    {
        try {
            $userResponse = $this->userService->delete($id);

            return $this->success(new UserResource($userResponse), trans('user.delete-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function restore($id)
    {
        try {
            $userResponse = $this->userService->restore($id);

            return $this->success(new UserResource($userResponse), trans('user.delete-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function force($id)
    {
        try {
            $userResponse = $this->userService->force($id);

            return $this->success(new UserResource($userResponse), trans('user.delete-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function list(GetAllUserRequest $request)
    {
        try {
            $userResponse = $this->userService->list($request->validated());

            return $this->success($userResponse, trans('user.get-list-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
