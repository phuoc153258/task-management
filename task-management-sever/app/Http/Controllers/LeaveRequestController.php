<?php

namespace App\Http\Controllers;

use App\Enums\LeaveRequestStatus;
use App\Http\Requests\LeaveRequest\CreateLeaveRequestRequest;
use App\Http\Requests\LeaveRequest\ListLeaveRequestRequest;
use App\Http\Requests\LeaveRequest\UpdateLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Http\Resources\PaginateResource;
use App\Services\LeaveRequest\LeaveRequestService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private LeaveRequestService $leaveRequestService)
    {
    }

    public function index(ListLeaveRequestRequest $request)
    {
        try {
            $user = $this->getCurrentUser();
            $leaveRequestResponse = $this->leaveRequestService->index($request->validated(), $user->id);

            return $this->success(new PaginateResource($leaveRequestResponse, LeaveRequestResource::collection($leaveRequestResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $user = $this->getCurrentUser();
            $leaveRequestResponse = $this->leaveRequestService->show($id, $user->id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function create(CreateLeaveRequestRequest $request)
    {
        try {
            $currentUser = $this->getCurrentUser();
            $leaveRequestDetails = [...$request->all(), 'user_id' => $currentUser->id];
            $leaveRequestResponse = $this->leaveRequestService->create($leaveRequestDetails);

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function update(UpdateLeaveRequestRequest $request, $id)
    {
        try {
            $currentUser = $this->getCurrentUser();
            $leaveRequestResponse = $this->leaveRequestService->update($request->validated(), $id, $currentUser->id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse->fresh()), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'), 400);
        }
    }

    public function delete($id)
    {
        try {
            $currentUser = $this->getCurrentUser();
            $leaveRequestResponse = $this->leaveRequestService->delete($id, $currentUser->id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }
}
