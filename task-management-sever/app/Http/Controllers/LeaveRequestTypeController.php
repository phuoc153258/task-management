<?php

namespace App\Http\Controllers;

use App\Http\Resources\LeaveRequestTypeResource;
use App\Services\LeaveRequestType\LeaveRequestTypeService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class LeaveRequestTypeController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private LeaveRequestTypeService $leaveRequestType)
    {
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
