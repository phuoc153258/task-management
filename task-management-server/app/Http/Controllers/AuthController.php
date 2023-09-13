<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Repositories\User\UserRepositoryInterface;
use App\Traits\HttpResponseTrait;
use App\Traits\JwtResponseTrait;

class AuthController extends Controller
{
    use HttpResponseTrait;
    use JwtResponseTrait;
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        // $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login()
    {
        $credentials = request(['username', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return $this->error(['error' => 'Unauthorized'], trans('auth.login-failed'), 401);
        }

        return $this->success($this->respondWithToken($token), trans('auth.login-success'), 200);
    }

    public function register(CreateUserRequest $request)
    {
        try {
            $user = $this->userRepository->createUser($request->validated());
            return $this->success($user, trans('message.create-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function me()
    {
        return $this->success(auth()->user(), trans('base.base-success'));
    }

    public function logout()
    {
        auth()->logout();

        return $this->success(['message' => 'Successfully logged out'], trans('base.base-success'));
    }

    public function refresh()
    {
        return $this->success($this->respondWithToken(auth()->refresh()), trans('base.base-success'));
    }
}
