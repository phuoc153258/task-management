<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LeaveRequest\UpdateLeaveRequestRequest;
use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\Admin\LeaveRequest\LeaveRequestService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    use Authorizable, HttpResponsable;

    private LeaveRequestService $leaveRequestService;
    public function __construct(LeaveRequestService $leaveRequestService)
    {
        $this->leaveRequestService = $leaveRequestService;
    }

    public function index(Request $request)
    {
        try {
            $options = [
                'search' => empty($request->input('search')) ? '' : $request->input('search'),
                'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
                'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
                'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
                'search_by' => 'content',
                'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
                'sort_by' => empty($request->input('sort_by')) ? 'id' : $request->input('sort_by'),
                'select' => ['*']
            ];
            $leaveRequestResponse = $this->leaveRequestService->index($options);
            return $this->success($leaveRequestResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->show($id);
            return $this->success($leaveRequestResponse, trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateLeaveRequestRequest $request, $id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->update($request->validated(), $id);
            return $this->success($leaveRequestResponse->fresh(), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }
}
