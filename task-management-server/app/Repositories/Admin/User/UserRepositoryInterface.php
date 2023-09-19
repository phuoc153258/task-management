<?php

namespace App\Repositories\Admin\User;

interface UserRepositoryInterface
{
    public function getUsers($options);
    public function getUserById($userId);
    public function getUserByCondition($field, $value);
    public function deleteUser($userId);
    public function createUser(array $userDetails);
    public function updateUser($userId, array $userDetails);
}
