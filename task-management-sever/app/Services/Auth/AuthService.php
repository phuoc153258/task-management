<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use App\Services\Auth\AuthServiceInterface;

class AuthService implements AuthServiceInterface
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login($userDetails)
    {
        if (!$token = auth()->attempt($userDetails))
            abort(401, trans('auth.login-failed'));

        return ['token' => $token];
    }

    public function register($userInfo)
    {
        $user = $this->userRepository->createUser($userInfo);
        return $user;
    }

    public function me()
    {
        $user = auth()->user();
        $userInfo = $this->userRepository->getUserById($user->id);
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
