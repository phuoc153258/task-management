<?php

namespace App\Http\Controllers;

use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\LeaveRequestType\LeaveRequestTypeService;
use App\Traits\AuthorizationTrait;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;

class LeaveRequestTypeController extends Controller
{
    use HttpResponseTrait, AuthorizationTrait;
    private LeaveRequestTypeService $leaveRequestType;
    public function __construct(LeaveRequestTypeRepositoryInterface $leaveRequestType)
    {
        $this->leaveRequestType = new LeaveRequestTypeService($leaveRequestType);
    }

    public function index()
    {
        try {
            $leaveRequestResponse = $this->leaveRequestType->index();
            return $this->success($leaveRequestResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
