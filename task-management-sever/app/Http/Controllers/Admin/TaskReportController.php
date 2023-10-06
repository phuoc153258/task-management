<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TaskReport\CreateTaskReportRequest;
use App\Http\Requests\Admin\TaskReport\ListTaskReportRequest;
use App\Http\Requests\Admin\TaskReport\UpdateTaskReportRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\TaskReportResource;
use App\Services\Admin\TaskReport\TaskReportService;
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
            $taskReportResponse = $this->taskReportService->index($request->validated(), $id);

            return $this->success(new PaginateResource($taskReportResponse, TaskReportResource::collection($taskReportResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $taskReportResponse = $this->taskReportService->show($id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function create(CreateTaskReportRequest $request)
    {
        try {
            $taskReportResponse = $this->taskReportService->create($request->validated());

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateTaskReportRequest $request, $id)
    {
        try {
            $taskReportResponse = $this->taskReportService->update($request->validated(), $id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function delete($id)
    {
        try {
            $taskReportResponse = $this->taskReportService->delete($id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function restore($id)
    {
        try {
            $taskReportResponse = $this->taskReportService->restore($id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function force($id)
    {
        try {
            $taskReportResponse = $this->taskReportService->force($id);

            return $this->success(new TaskReportResource($taskReportResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
