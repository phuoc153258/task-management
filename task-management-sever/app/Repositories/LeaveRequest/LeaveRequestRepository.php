<?php

namespace App\Repositories\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\Paginate\PaginateService;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{

    public function __construct(
        private PaginateService $paginateService
    ) {
    }

    public function list($options, int $id)
    {
        $query = LeaveRequest::with('leaveRequestType')->ofUser($id);
        $leaveRequestResponse = $this->paginateService->paginate($options, $query);

        return $leaveRequestResponse;
    }

    public function show(int $id, int $user_id)
    {
        return LeaveRequest::with('leaveRequestType')->ofUser($user_id)->find($id);
    }

    public function create(array $leaveRequestDetails)
    {
        return LeaveRequest::with('leaveRequestType')->create($leaveRequestDetails);
    }

    public function update($leaveRequest, array $leaveRequestDetails)
    {
        return $leaveRequest->update($leaveRequestDetails);
    }
}
