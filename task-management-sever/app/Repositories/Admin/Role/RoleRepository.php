<?php

namespace App\Repositories\Admin\Role;

use App\Models\LeaveRequestType;
use App\Repositories\Admin\Role\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepositoryInterface
{

    public function getAll()
    {
        return Role::get();
    }
}
