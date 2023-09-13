<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function getUsers()
    {
        return User::all();
    }

    public function getUserById($userId)
    {
        return User::findOrFail($userId);
    }

    public function getUserByCondition($field, $value)
    {
        return User::where($field, $value)->first();
    }

    public function deleteUser($userId)
    {
        User::destroy($userId);
    }

    public function createUser(array $userDetails)
    {
        return User::firstOrCreate(
            ['email' => $userDetails['email']],
            [
                'username' => $userDetails['username'],
                'fullname' => $userDetails['fullname'],
                'password' => $userDetails['password']
            ]
        );
    }

    public function updateUser($orderId, array $newDetails)
    {
        return User::whereId($orderId)->update($newDetails);
    }
}
