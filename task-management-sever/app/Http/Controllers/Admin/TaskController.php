<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\ListTaskRequest;
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
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $projectResponse = $this->taskService->show($id);

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function create(CreateTaskRequest $request)
    {
        try {
            $projectResponse = $this->taskService->create($request->validated());

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        try {
            $projectResponse = $this->taskService->update($request->validated(), $id);

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }

    public function delete($id)
    {
        try {
            $projectResponse = $this->taskService->delete($id);

            return $this->success(new TaskResource($projectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th, trans('base.base-failed'));
        }
    }
}
