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
        $leaveRequestResponse->update($leaveRequestDetails);

        return $leaveRequestResponse;
    }

    public function create($leaveRequestDetails)
    {
        return $this->leaveRequestRepository->create($leaveRequestDetails);
    }

    public function delete($id)
    {
        $leaveRequestResponse = $this->leaveRequestRepository->show($id);
        $leaveRequestResponse->delete();

        return $leaveRequestResponse;
    }

    public function restore($id)
    {
        $leaveRequestResponse = $this->leaveRequestRepository->show($id);
        $leaveRequestResponse->restore();

        return $leaveRequestResponse;
    }

    public function force($id)
    {
        $leaveRequestResponse = $this->leaveRequestRepository->show($id);
        $leaveRequestResponse->forceDelete();

        return $leaveRequestResponse;
    }
}
