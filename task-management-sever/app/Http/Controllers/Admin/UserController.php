<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\CreateUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\Admin\UserResource;
use App\Services\Admin\User\UserService;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use HttpResponsable;

    public function __construct(private UserService $userService)
    {
    }

    public function index(Request $request)
    {
        try {
            $options = [
                'search' => empty($request->input('search')) ? '' : $request->input('search'),
                'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
                'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
                'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
                'search_by' => 'username',
                'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
                'sort_by' => empty($request->input('sort_by')) ? 'id' : $request->input('sort_by'),
                'select' => ['*']
            ];
            $userResponse = $this->userService->index($options);

            return $this->success(new PaginateResource($userResponse,  UserResource::collection($userResponse->items())), trans('user.get-list-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $userResponse = $this->userService->show($id);
            return $this->success(new UserResource($userResponse), trans('user.get-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('user.get-user-failed'), 400);
        }
    }

    public function create(CreateUserRequest $request)
    {
        try {
            $userInfo = $request->validated();
            $userResponse = $this->userService->create($userInfo);
            return $this->success(new UserResource($userResponse), trans('user.create-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function update(UpdateUserRequest $request, $id)
    {
        try {
            $userInfo = $request->validated();
            $avatar = $request->file('avatar');
            $userResponse = $this->userService->update($userInfo, $id, $avatar);
            return $this->success(new UserResource($userResponse), trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('user.update-user-failed'), 400);
        }
    }

    public function password($id)
    {
        try {
            $userResponse = $this->userService->password($id);
            return $this->success(new UserResource($userResponse), trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('user.update-user-failed'), 400);
        }
    }

    public function delete($id)
    {
        try {
            $userResponse = $this->userService->delete($id);
            return $this->success(new UserResource($userResponse), trans('user.delete-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'), 400);
        }
    }
}
