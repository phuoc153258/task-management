<?php

namespace App\Repositories\User;

use App\Models\User\User;
use App\Repositories\User\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function getById($userId)
    {
        return User::with('roles')->findOrFail($userId);
    }

    public function update($orderId, array $newDetails)
    {
        return User::whereId($orderId)->update($newDetails);
    }

    public function create($userDetails)
    {
        return User::firstOrCreate(
            $userDetails
        );
    }
}
