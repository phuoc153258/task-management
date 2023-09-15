<?php

namespace App\Services\Auth;

interface AuthServiceInterface
{
    public function login($userDetails);

    public function register($userInfo);

    public function me();

    public function logout();

    public function refresh();
}
