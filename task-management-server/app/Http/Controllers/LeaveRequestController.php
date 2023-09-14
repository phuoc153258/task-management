<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveRequest\CreateLeaveRequestRequest;
use App\Http\Requests\LeaveRequest\UpdateLeaveRequestRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Traits\AuthorizationTrait;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    use HttpResponseTrait, AuthorizationTrait;

    protected LeaveRequestRepositoryInterface $leaveRequestRepository;
    protected LeaveRequestTypeRepositoryInterface $leaveRequestTypeRepository;
    public function __construct(LeaveRequestRepositoryInterface $leaveRequestRepository, LeaveRequestTypeRepositoryInterface $leaveRequestTypeRepository)
    {
        $this->leaveRequestRepository = $leaveRequestRepository;
        $this->leaveRequestTypeRepository = $leaveRequestTypeRepository;
    }

    public function index(Request $request)
    {
        try {
            $user = $this->getCurrentUser();
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
            $leaveRequestResponse = $this->leaveRequestRepository->getLeaveRequests($options, $user->id);
            return $this->success($leaveRequestResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        $user = $this->getCurrentUser();
        $leaveRequest = $this->leaveRequestRepository->getLeaveRequest($id, $user->id);
        if (empty($leaveRequest))
            return $this->error(null, trans('base.base-failed'), 400);

        return $this->success($leaveRequest, trans('base.base-success'), 200);
    }

    public function create(CreateLeaveRequestRequest $request)
    {
        try {
            $currentUser = $this->getCurrentUser();
            $leaveRequestDetails = [...$request->all(), 'user_id' => $currentUser->id];
            $leaveRequestResponse = $this->leaveRequestRepository->createLeaveRequest($leaveRequestDetails);
            return $this->success($leaveRequestResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateLeaveRequestRequest $request, $id)
    {
        try {
            $currentUser = $this->getCurrentUser();
            $leaveRequest = $this->leaveRequestRepository->getLeaveRequest($id, $currentUser->id);
            if (empty($leaveRequest)) return $this->error(null, trans('base.base-failed'));
            $this->leaveRequestRepository->updateLeaveRequest($leaveRequest, $request->validated());
            return $this->success($leaveRequest->fresh(), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function delete($id)
    {
        $currentUser = $this->getCurrentUser();
        $leaveRequest = $this->leaveRequestRepository->getLeaveRequest($id, $currentUser->id);
        if (empty($leaveRequest)) return $this->error(null, trans('base.base-failed'));

        $leaveRequest->delete();
        return $this->success($leaveRequest, trans('user.delete-user-success'), 200);
    }
}
