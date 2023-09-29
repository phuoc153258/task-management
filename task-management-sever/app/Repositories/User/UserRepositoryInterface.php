<?php

namespace App\Repositories\User;

interface UserRepositoryInterface
{
    public function getById($userId);
    public function update($userId, array $userDetails);
}
