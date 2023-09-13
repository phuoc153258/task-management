<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Traits\AuthorizationTrait;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    use HttpResponseTrait, AuthorizationTrait;

    protected LeaveRequestRepositoryInterface $leaveRequestRepository;
    public function __construct(LeaveRequestRepositoryInterface $leaveRequestRepository)
    {
        $this->leaveRequestRepository = $leaveRequestRepository;
    }

    public function index(Request $request)
    {
        try {
            $user = $this->getCurrentUser();

            $options = [
                'search' => empty($request->input('search')) ? '' : $request->input('search'),
                'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
                'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
                'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
                'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
                'search_by' => 'title',
                'sort_by' => 'id',
                'select' => ['*']
            ];
            $leaveRequestResponse = $this->leaveRequestRepository->getLeaveRequests($options, $user->id);
            return $this->success($leaveRequestResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        $leaveRequest = $this->leaveRequestRepository->getLeaveRequest($id);
        if (empty($leaveRequest))
            return $this->error(null, trans('base.base-failed'), 400);

        return $this->success($leaveRequest, trans('base.base-success'), 200);
    }

    // public function create(CreateUserRequest $request)
    // {
    //     $user = $this->userRepository->createUser($request->validated());
    //     return $this->success($user, trans('user.create-user-success'), 200);
    // }
}
