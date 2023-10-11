<?php

namespace App\Repositories\User;

use App\Models\User\User;
use App\Notifications\RegisterUserNotification;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Notification;

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
        $user = User::firstOrCreate(
            $userDetails
        );
        Notification::send($user, new RegisterUserNotification($user));

        return $user;
    }
}
