<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\Role\RoleRepositoryInterface;
use App\Services\Admin\Role\RoleService;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    use HttpResponseTrait;
    private RoleService $roleService;
    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleService = new RoleService($roleRepository);
    }

    public function index()
    {
        try {
            $roleResponse = $this->roleService->index();
            return $this->success($roleResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
