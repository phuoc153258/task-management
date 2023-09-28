<?php

namespace App\Services\LeaveRequest;

use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\LeaveRequest\LeaveRequestServiceInterface;

class LeaveRequestService implements LeaveRequestServiceInterface
{
    public function __construct(private LeaveRequestRepositoryInterface $leaveRequest)
    {
    }

    public function index($options, $user_id)
    {
        return $this->leaveRequest->list($options, $user_id);
    }

    public function show($id, $user_id)
    {
        $leaveRequest = $this->leaveRequest->show($id, $user_id);
        if (empty($leaveRequest))
            abort(400, trans('base.base-failed'));

        return $leaveRequest;
    }

    public function create($leaveRequestDetails)
    {
        return $this->leaveRequest->create($leaveRequestDetails);
    }

    public function update($leaveRequestDetails, $id, $user_id)
    {
        $leaveRequest = $this->leaveRequest->show($id, $user_id);
        if (empty($leaveRequest)) abort(400, trans('base.base-failed'));
        $this->leaveRequest->update($leaveRequest, $leaveRequestDetails);

        return $leaveRequest;
    }

    public function delete($id, $user_id)
    {
        $leaveRequest = $this->leaveRequest->show($id, $user_id);
        if (empty($leaveRequest)) abort(400, trans('base.base-failed'));
        $leaveRequest->delete();

        return $leaveRequest;
    }
}
