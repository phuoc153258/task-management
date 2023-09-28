<?php

namespace App\Repositories\Admin\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\Paginate\PaginateService;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function list($options)
    {
        $query = LeaveRequest::with('leaveRequestType')->status();
        $leaveRequestResponse = $this->paginateService->paginate($options, $query);

        return $leaveRequestResponse;
    }

    public function show(int $id)
    {
        return LeaveRequest::status()->find($id);
    }

    public function create(array $leaveRequestDetails)
    {
        return LeaveRequest::create($leaveRequestDetails);
    }

    public function update($leaveRequest, array $leaveRequestDetails)
    {
        return $leaveRequest->update($leaveRequestDetails);
    }

    public function deleteMany($user_id)
    {
        LeaveRequest::where('user_id', $user_id)->chunk(100, function ($records) {
            foreach ($records as $record) {
                $record->delete();
            }
        });
    }
}
