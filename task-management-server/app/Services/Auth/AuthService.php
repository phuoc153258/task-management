<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use App\Services\Auth\AuthServiceInterface;
use App\Traits\JwtResponseTrait;

class AuthService implements AuthServiceInterface
{
    use JwtResponseTrait;
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login($userDetails)
    {
        if (!$token = auth()->attempt($userDetails))
            abort(401, trans('auth.login-failed'));

        return $this->respondWithToken($token);
    }

    public function register($userInfo)
    {
        $user = $this->userRepository->createUser($userInfo);
        return $user;
    }

    public function me()
    {
        $user = auth()->user();
        $userInfo = User::with('role')->find($user->id);
        return $userInfo;
    }

    public function logout()
    {
        auth()->logout();
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
}
