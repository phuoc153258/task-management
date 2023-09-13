<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveRequestController;

Route::middleware('auth:api')->group(function () {
    Route::get('/', [LeaveRequestController::class, 'index']);

    Route::get('/{id}', [LeaveRequestController::class, 'show']);

    Route::post('/', [LeaveRequestController::class, 'create']);
});