<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaveRequestTypeResource;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\LeaveRequestType\LeaveRequestTypeService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class LeaveRequestTypeController extends Controller
{
    use HttpResponsable, Authorizable;
    private LeaveRequestTypeService $leaveRequestType;

    public function __construct(LeaveRequestTypeService $leaveRequestType)
    {
        $this->leaveRequestType = $leaveRequestType;
    }

    public function index()
    {
        try {
            $leaveRequestResponse = $this->leaveRequestType->index();
            return $this->success(LeaveRequestTypeResource::collection($leaveRequestResponse), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
