<?php

namespace App\Services\Admin\LeaveRequest;

use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepository;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\Admin\LeaveRequest\LeaveRequestServiceInterface;

class LeaveRequestService implements LeaveRequestServiceInterface
{
    private LeaveRequestRepositoryInterface $leaveRequest;
    private LeaveRequestTypeRepositoryInterface $leaveRequestType;

    public function __construct(LeaveRequestRepositoryInterface $leaveRequest, LeaveRequestTypeRepository $leaveRequestType)
    {
        $this->leaveRequest = $leaveRequest;
        $this->leaveRequestType = $leaveRequestType;
    }

    public function index($options)
    {
        $leaveRequest = $this->leaveRequest->getLeaveRequests($options);
        return $leaveRequest;
    }

    public function show($id)
    {
        $leaveRequest = $this->leaveRequest->getLeaveRequest($id);
        if (empty($leaveRequest))
            abort(400, trans('base.base-failed'));

        return $leaveRequest;
    }

    // public function create($leaveRequestDetails)
    // {
    //     $leaveRequest = $this->leaveRequest->createLeaveRequest($leaveRequestDetails);
    //     return $leaveRequest;
    // }

    public function update($leaveRequestDetails, $id)
    {
        $leaveRequest = $this->leaveRequest->getLeaveRequest($id);
        if (empty($leaveRequest)) abort(400, trans('base.base-failed'));
        $leaveRequestDetails = [...$leaveRequestDetails, 'accept_by' => auth()->id()];
        $this->leaveRequest->updateLeaveRequest($leaveRequest, $leaveRequestDetails);
        return $leaveRequest;
    }

    // public function delete($id, $user_id)
    // {
    //     $leaveRequest = $this->leaveRequest->getLeaveRequest($id, $user_id);
    //     if (empty($leaveRequest)) abort(400, trans('base.base-failed'));
    //     $leaveRequest->delete();
    //     return $leaveRequest;
    // }
}
