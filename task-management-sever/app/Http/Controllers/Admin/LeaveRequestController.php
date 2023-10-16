<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LeaveRequest\AcceptLeaveRequestRequest;
use App\Http\Requests\Admin\LeaveRequest\CreateLeaveRequestRequest;
use App\Http\Requests\Admin\LeaveRequest\UpdateLeaveRequestRequest;
use App\Http\Requests\Admin\LeaveRequest\ListLeaveRequestRequest;
use App\Http\Resources\LeaveRequestResource;
use App\Http\Resources\PaginateResource;
use App\Services\Admin\LeaveRequest\LeaveRequestService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class LeaveRequestController extends Controller
{
    use Authorizable, HttpResponsable;

    public function __construct(private LeaveRequestService $leaveRequestService)
    {
    }

    public function index(ListLeaveRequestRequest $request)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->index($request->validated());

            return $this->success(new PaginateResource($leaveRequestResponse, LeaveRequestResource::collection($leaveRequestResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->show($id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function create(CreateLeaveRequestRequest $request)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->create($request->validated());

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateLeaveRequestRequest $request, $id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->update($request->validated(), $id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse->fresh()), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function accept(AcceptLeaveRequestRequest $request, $id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->update($request->validated(), $id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse->fresh()), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'), 400);
        }
    }

    public function delete($id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->delete($id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function restore($id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->restore($id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function force($id)
    {
        try {
            $leaveRequestResponse = $this->leaveRequestService->force($id);

            return $this->success(new LeaveRequestResource($leaveRequestResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
