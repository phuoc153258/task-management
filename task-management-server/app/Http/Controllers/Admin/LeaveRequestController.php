<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LeaveRequest\UpdateLeaveRequestRequest;
use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\Admin\LeaveRequest\LeaveRequestService;
use App\Traits\AuthorizationTrait;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    use AuthorizationTrait, HttpResponseTrait;
    use HttpResponseTrait, AuthorizationTrait;

    private LeaveRequestService $leaveRequestService;
    public function __construct(LeaveRequestRepositoryInterface $leaveRequestRepository, LeaveRequestTypeRepositoryInterface $leaveRequestTypeRepository)
    {
        $this->leaveRequestService = new LeaveRequestService($leaveRequestRepository, $leaveRequestTypeRepository);
    }

    public function index(Request $request)
    {
        try {
            $options = [
                'search' => empty($request->input('search')) ? '' : $request->input('search'),
                'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
                'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
                'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
                'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
                'search_by' => 'title',
                'sort_by' => 'id',
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
