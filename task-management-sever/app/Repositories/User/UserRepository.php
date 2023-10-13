<?php

namespace App\Repositories\User;

use App\Models\User\User;
use App\Notifications\Admin\AdminRegisterUserNotification;
use App\Notifications\RegisterUserNotification;
use App\Repositories\Admin\User\UserRepository as AdminUserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(private AdminUserRepository $adminUserRepository)
    {
    }

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

        $users = $this->adminUserRepository->getUsersHasRole([1]);
        Notification::send($user, new RegisterUserNotification($user));
        foreach ($users as $value) {
            Notification::send($value, new AdminRegisterUserNotification($user, $value));
        }

        return $user;
    }
}
