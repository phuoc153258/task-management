<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\RoleResource;
use App\Services\Admin\Role\RoleService;
use App\Traits\HttpResponsable;

class RoleController extends Controller
{
    use HttpResponsable;

    public function __construct(private RoleService $roleService)
    {
    }

    public function index()
    {
        try {
            $roleResponse = $this->roleService->index();

            return $this->success(RoleResource::collection($roleResponse), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }
}
