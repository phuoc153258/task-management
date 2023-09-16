<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\LeaveRequest\LeaveRequestService;
use App\Traits\AuthorizationTrait;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    use AuthorizationTrait, HttpResponseTrait;
    private LeaveRequestService $leaveRequestService;

    public function __construct()
    {
        $this->leaveRequestService = new LeaveRequestService();
    }

    public function index(Request $request)
    {
        // try {
        //     $options = [
        //         'search' => empty($request->input('search')) ? '' : $request->input('search'),
        //         'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
        //         'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
        //         'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
        //         'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
        //         'search_by' => 'title',
        //         'sort_by' => 'id',
        //         'select' => ['*']
        //     ];
        //     $leaveRequestResponse = $this->leaveRequestService->index($options, $user->id);
        //     return $this->success($leaveRequestResponse, trans('base.base-success'));
        // } catch (\Throwable $th) {
        //     return $this->error($th->getMessage(), trans('base.base-failed'));
        // }
    }
}
