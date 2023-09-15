<?php

namespace App\Services\LeaveRequest;

use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepository;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\LeaveRequest\LeaveRequestServiceInterface;

class LeaveRequestService implements LeaveRequestServiceInterface
{
    private LeaveRequestRepositoryInterface $leaveRequest;
    private LeaveRequestTypeRepositoryInterface $leaveRequestType;

    public function __construct(LeaveRequestRepositoryInterface $leaveRequest, LeaveRequestTypeRepository $leaveRequestType)
    {
        $this->leaveRequest = $leaveRequest;
        $this->leaveRequestType = $leaveRequestType;
    }

    public function index($options, $user_id)
    {
        $leaveRequest = $this->leaveRequest->getLeaveRequests($options, $user_id);
        return $leaveRequest;
    }

    public function show($id, $user_id)
    {
        $leaveRequest = $this->leaveRequest->getLeaveRequest($id, $user_id);
        if (empty($leaveRequest))
            abort(400, trans('base.base-failed'));

        return $leaveRequest;
    }

    public function create($leaveRequestDetails)
    {
        $leaveRequest = $this->leaveRequest->createLeaveRequest($leaveRequestDetails);
        return $leaveRequest;
    }

    public function update($leaveRequestDetails, $id, $user_id)
    {
        $leaveRequest = $this->leaveRequest->getLeaveRequest($id, $user_id);
        if (empty($leaveRequest)) abort(400, trans('base.base-failed'));
        $this->leaveRequest->updateLeaveRequest($leaveRequest, $leaveRequestDetails);
        return $leaveRequest;
    }

    public function delete($id, $user_id)
    {
        $leaveRequest = $this->leaveRequest->getLeaveRequest($id, $user_id);
        if (empty($leaveRequest)) abort(400, trans('base.base-failed'));
        $leaveRequest->delete();
        return $leaveRequest;
    }
}
