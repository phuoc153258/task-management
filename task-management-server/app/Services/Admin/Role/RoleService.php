<?php

namespace App\Services\Admin\Role;

use App\Repositories\Admin\Role\RoleRepositoryInterface;

class RoleService
{
    private $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function index()
    {
        $usersResponse = $this->roleRepository->getAll();
        return $usersResponse;
    }
}
