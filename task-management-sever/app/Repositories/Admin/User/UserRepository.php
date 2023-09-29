<?php

namespace App\Repositories\Admin\User;

use App\Models\User;
use App\Repositories\Admin\User\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function list($options)
    {
        $userResponse = User::with('roles')
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
        return User::with('roles')->findOrFail($userId);
    }

    public function getByCondition($field, $value)
    {
        return User::with('roles')->where($field, $value)->first();
    }

    public function delete($userId)
    {
        return User::with('roles')->destroy($userId);
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

    public function update($orderId, array $newDetails)
    {
        return User::with('roles')->whereId($orderId)->update($newDetails);
    }
}
