<?php

namespace App\Services\Admin\LeaveRequest;

use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\Admin\LeaveRequest\LeaveRequestServiceInterface;

class LeaveRequestService implements LeaveRequestServiceInterface
{
    public function __construct(
        private LeaveRequestRepositoryInterface $leaveRequestRepository
    ) {
    }

    public function index($options)
    {
        $leaveRequestResponse = $this->leaveRequestRepository->list($options);
        return $leaveRequestResponse;
    }

    public function show($id)
    {
        $leaveRequestResponse = $this->leaveRequestRepository->show($id);
        if (empty($leaveRequestResponse))
            abort(400, trans('base.base-failed'));

        return $leaveRequestResponse;
    }

    public function update($leaveRequestDetails, $id)
    {
        $leaveRequestResponse = $this->leaveRequestRepository->show($id);
        if (empty($leaveRequestResponse)) abort(400, trans('base.base-failed'));

        $leaveRequestDetails = [...$leaveRequestDetails, 'accept_by' => auth()->id()];
        $this->leaveRequestRepository->update($leaveRequestResponse, $leaveRequestDetails);

        return $leaveRequestResponse;
    }
}
