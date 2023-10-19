<?php

namespace App\Repositories\Admin\User;

use App\Enums\SoftDeleteStatus;
use App\Models\User\User;
use App\Notifications\RegisterUserNotification;
use App\Notifications\Admin\AdminRegisterUserNotification;
use App\Repositories\Admin\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Notification;

class UserRepository implements UserRepositoryInterface
{
    public function list($options)
    {
        $userResponse = User::with('roles')
            ->when($options['soft_delete'] == SoftDeleteStatus::OnlySoftDelete->value, function ($query) {
                return $query->onlyTrashed();
            })
            ->when($options['soft_delete'] == SoftDeleteStatus::Both->value, function ($query) {
                return $query->withTrashed();
            })
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.user.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $userResponse;
    }

    public function getUsersHasRole($role)
    {
        return User::with("roles")->whereHas("roles", function ($query) use ($role) {
            $query->whereIn("id", $role);
        })->get();
    }

    public function getById($userId)
    {
        return User::withTrashed()->with('roles')->findOrFail($userId);
    }

    public function getByCondition($field, $value)
    {
        return User::withTrashed()->with('roles')->where($field, $value)->first();
    }

    public function create(array $userDetails)
    {
        $userResponse = User::withoutEvents(function () use ($userDetails) {
            return User::with('roles')
                ->firstOrCreate(array_diff_key($userDetails, array_flip(['role_id'])))
                ->assignRole($userDetails['role_id']);
        });

        $users = $this->getUsersHasRole([config('role.admin')]);
        Notification::send($userResponse, new RegisterUserNotification($userResponse));
        foreach ($users as $value) {
            Notification::send($value, new AdminRegisterUserNotification($userResponse, $value));
        }

        return $userResponse;
    }

    public function getAll()
    {
        return User::get();
    }
}
