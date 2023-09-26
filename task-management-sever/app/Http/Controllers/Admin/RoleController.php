<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\RoleResource;
use App\Repositories\Admin\Role\RoleRepositoryInterface;
use App\Services\Admin\Role\RoleService;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    use HttpResponsable;
    private RoleService $roleService;
    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function index()
    {
        try {
            $roleResponse = $this->roleService->index();
            return $this->success(RoleResource::collection($roleResponse), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
