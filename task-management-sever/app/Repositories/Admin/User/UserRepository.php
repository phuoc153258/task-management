<?php

namespace App\Repositories\Admin\User;

use App\Enums\SoftDeleteStatus;
use App\Models\User\User;
use App\Repositories\Admin\User\UserRepositoryInterface;

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
            return User::with('roles')->firstOrCreate(
                ['email' => $userDetails['email']],
                [
                    'username' => $userDetails['username'],
                    'fullname' => $userDetails['fullname'],
                    'password' => $userDetails['password']
                ]
            )->assignRole($userDetails['role_id']);
        });

        return $userResponse;
    }
}
