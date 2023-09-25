<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Repositories\User\UserRepositoryInterface;
use App\Services\Auth\AuthService;
use App\Traits\HttpResponsable;

class AuthController extends Controller
{
    use HttpResponsable;

    private AuthService $authService;

    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->authService = new AuthService($userRepositoryInterface);
    }

    public function login()
    {
        try {
            $credentials = request(['username', 'password']);
            $token = $this->authService->login($credentials);
            return $this->success($token, trans('auth.login-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('auth.login-failed'), 401);
        }
    }

    public function register(CreateUserRequest $request)
    {
        try {
            $userInfo = $request->validated();
            $userResponse = $this->authService->register($userInfo);
            return $this->success($userResponse, trans('message.create-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function me()
    {
        try {
            $userResponse = $this->authService->me();
            return $this->success($userResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error(null, trans('base.base-failed'));
        }
    }

    public function logout()
    {
        try {
            $this->authService->logout();

            return $this->success('Successfully logged out', trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error(null, trans('base.base-failed'));
        }
    }

    public function refresh()
    {
        try {
            $token = $this->authService->refresh();
            return $this->success($token, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error(null, trans('base.base-failed'));
        }
    }
}
