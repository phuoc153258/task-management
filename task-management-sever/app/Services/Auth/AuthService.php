<?php

namespace App\Services\Auth;

use App\Repositories\User\UserRepositoryInterface;
use App\Services\Auth\AuthServiceInterface;

class AuthService implements AuthServiceInterface
{
    public function __construct(private UserRepositoryInterface $userRepository)
    {
    }

    public function login($userDetails)
    {
        if (!$token = auth()->attempt($userDetails))
            abort(401, trans('auth.login-failed'));

        return ['token' => $token];
    }

    public function register($userInfo)
    {
        return $this->userRepository->create($userInfo);
    }

    public function me()
    {
        $user = auth()->user();
        $userInfo = $this->userRepository->getById($user->id);

        return $userInfo;
    }

    public function logout()
    {
        auth()->logout();
    }

    public function refresh()
    {
        return ['token' => auth()->refresh()];
    }
}
