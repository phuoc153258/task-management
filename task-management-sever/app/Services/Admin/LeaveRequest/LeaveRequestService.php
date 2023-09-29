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
        return $this->leaveRequestRepository->list($options);
    }

    public function show($id)
    {
        return $this->leaveRequestRepository->show($id);
    }

    public function update($leaveRequestDetails, $id)
    {
        $leaveRequestResponse = $this->leaveRequestRepository->show($id);

        $leaveRequestDetails = [...$leaveRequestDetails, 'accept_by' => auth()->id()];
        $leaveRequestResponse->update($leaveRequestDetails);

        return $leaveRequestResponse;
    }
}
