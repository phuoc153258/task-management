<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use App\Services\Paginate\PaginateService;

class UserRepository implements UserRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function list($options)
    {
        $query =  User::query();
        $userResponse = $this->paginateService->paginate($options, $query);

        return $userResponse;
    }

    public function getById($userId)
    {
        return User::with('roles')->findOrFail($userId);
    }

    public function getByCondition($field, $value)
    {
        return User::where($field, $value)->first();
    }

    public function delete($userId)
    {
        User::destroy($userId);
    }

    public function create(array $userDetails)
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

    public function update($orderId, array $newDetails)
    {
        return User::whereId($orderId)->update($newDetails);
    }
}
