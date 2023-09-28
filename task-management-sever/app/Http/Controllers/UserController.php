<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\ChangepasswordRequest;

use App\Traits\HttpResponsable;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\User\UserService;
use App\Traits\Authorizable;

class UserController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private UserService $userService)
    {
    }

    public function update(UpdateUserRequest $request)
    {
        try {
            $userInfo = $request->validated();
            $currentUser = $this->getCurrentUser();
            $avatar = $request->file('avatar');
            $userResponse = $this->userService->update($userInfo, $currentUser->id, $avatar);

            return $this->success(new UserResource($userResponse), trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('user.update-user-failed'), 400);
        }
    }

    public function password(ChangepasswordRequest $request)
    {
        try {
            $userInfo = $request->validated();
            $currentUser = $this->getCurrentUser();
            $userResponse = $this->userService->password($userInfo, $currentUser->id);

            return $this->success(new UserResource($userResponse), trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('user.update-user-failed'), 400);
        }
    }
}
