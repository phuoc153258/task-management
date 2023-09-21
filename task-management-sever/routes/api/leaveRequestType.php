<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveRequestTypeController;

Route::middleware('auth:api')->group(function () {
    Route::get('/', [LeaveRequestTypeController::class, 'index']);
});
