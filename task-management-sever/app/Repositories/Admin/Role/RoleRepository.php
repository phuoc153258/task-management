<?php

namespace App\Repositories\Admin\Role;

use App\Repositories\Admin\Role\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepositoryInterface
{
    public function list()
    {
        return Role::get();
    }
}
