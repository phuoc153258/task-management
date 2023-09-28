<?php

namespace App\Services\Admin\Role;

use App\Repositories\Admin\Role\RoleRepositoryInterface;

class RoleService
{
    public function __construct(private RoleRepositoryInterface $roleRepository)
    {
    }

    public function index()
    {
        $usersResponse = $this->roleRepository->getAll();
        return $usersResponse;
    }
}
