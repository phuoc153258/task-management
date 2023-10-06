<?php

namespace App\Repositories\Admin\User;

interface UserRepositoryInterface
{
    public function list($options);

    public function getById($userId);

    public function getByCondition($field, $value);

    public function create(array $userDetails);
}
