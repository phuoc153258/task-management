<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveRequestController;

Route::middleware('auth:api')->group(function () {
    Route::get('/', [LeaveRequestController::class, 'index']);

    Route::get('/{id}', [LeaveRequestController::class, 'show']);

    Route::post('/', [LeaveRequestController::class, 'create']);

    Route::put('/{id}', [LeaveRequestController::class, 'update']);

    Route::delete('/{id}', [LeaveRequestController::class, 'delete']);

    // Route::patch('/{id}/restore', [LeaveRequestController::class, 'restore']);

    // Route::delete('/{id}/force', [LeaveRequestController::class, 'force']);
});
