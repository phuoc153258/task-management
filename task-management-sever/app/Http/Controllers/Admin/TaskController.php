<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Task\ListTaskRequest;
use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\PaginateResource;
use App\Http\Resources\TaskResource;
use App\Services\Admin\Task\TaskService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;

class TaskController extends Controller
{
    use HttpResponsable, Authorizable;

    public function __construct(private TaskService $taskService)
    {
    }

    public function index(ListTaskRequest $request, $project_id)
    {
        try {
            $taskResponse = $this->taskService->index($request->validated(), $project_id);

            return $this->success(new PaginateResource($taskResponse, TaskResource::collection($taskResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $taskResponse = $this->taskService->show($id);

            return $this->success(new TaskResource($taskResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function create(CreateTaskRequest $request)
    {
        try {
            $taskResponse = $this->taskService->create($request->validated());

            return $this->success(new TaskResource($taskResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        try {
            $taskResponse = $this->taskService->update($request->validated(), $id);

            return $this->success(new TaskResource($taskResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function delete($id)
    {
        try {
            $taskResponse = $this->taskService->delete($id);

            return $this->success(new TaskResource($taskResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function restore($id)
    {
        try {
            $taskResponse = $this->taskService->restore($id);

            return $this->success(new TaskResource($taskResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function force($id)
    {
        try {
            $taskResponse = $this->taskService->force($id);

            return $this->success(new TaskResource($taskResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
