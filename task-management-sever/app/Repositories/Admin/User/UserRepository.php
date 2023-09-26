<?php

namespace App\Repositories\Admin\User;

use App\Models\User;
use App\Repositories\Admin\User\UserRepositoryInterface;
use App\Services\Paginate\PaginateService;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function getUsers($options)
    {
        $query =  User::with('roles');
        $userResponse = $this->paginateService->paginate($options, $query);
        return $userResponse;
    }

    public function getUserById($userId)
    {
        return User::with('roles')->findOrFail($userId);
    }

    public function getUserByCondition($field, $value)
    {
        return User::with('roles')->where($field, $value)->first();
    }

    public function deleteUser($userId)
    {
        User::with('roles')->destroy($userId);
    }

    public function createUser(array $userDetails)
    {
        return User::with('roles')->firstOrCreate(
            ['email' => $userDetails['email']],
            [
                'username' => $userDetails['username'],
                'fullname' => $userDetails['fullname'],
                'password' => $userDetails['password']
            ]
        )->assignRole($userDetails['role_id']);
    }

    public function updateUser($orderId, array $newDetails)
    {
        return User::with('roles')->whereId($orderId)->update($newDetails);
    }
}
