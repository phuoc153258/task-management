<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskReport\CreateTaskReportRequest;
use App\Http\Requests\TaskReport\ListTaskReportRequest;
use App\Http\Requests\TaskReport\UpdateTaskReportRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\TaskReportResource;
use App\Services\TaskReport\TaskReportService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class TaskReportController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private TaskReportService $taskReportService)
    {
    }

    public function index(ListTaskReportRequest $request, $id)
    {
        try {
            $user = $this->getCurrentUser();
            $taskReportResponse = $this->taskReportService->index($request->validated(), $id, $user->id);
            return $this->success(new PaginateResource($taskReportResponse, TaskReportResource::collection($taskReportResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $user = $this->getCurrentUser();
            $taskReportResponse = $this->taskReportService->show($id, $user->id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function create(CreateTaskReportRequest $request)
    {
        try {
            $user = $this->getCurrentUser();
            $taskReportResponse = $this->taskReportService->create($request->validated(), $user->id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function update(UpdateTaskReportRequest $request, $id)
    {
        try {
            $user = $this->getCurrentUser();
            $taskReportResponse = $this->taskReportService->update($request->validated(), $id, $user->id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function delete($id)
    {
        try {
            $user = $this->getCurrentUser();
            $taskReportResponse = $this->taskReportService->delete($id, $user->id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }
}
