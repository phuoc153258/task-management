<?php

namespace App\Repositories\Admin\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{

    public function list($options)
    {
        $leaveRequestResponse = LeaveRequest::with('leaveRequestType')
            ->status()
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.leave_request.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $leaveRequestResponse;
    }

    public function show(int $id)
    {
        return LeaveRequest::status()->findOrFail($id);
    }

    public function create(array $leaveRequestDetails)
    {
        return LeaveRequest::firstOrCreate($leaveRequestDetails);
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
