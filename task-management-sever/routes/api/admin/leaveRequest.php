<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\LeaveRequestController;

Route::group(['middleware' => ['auth:api', 'role:manager|admin']], function () {
    Route::get('/', [LeaveRequestController::class, 'index']);

    Route::get('/{id}', [LeaveRequestController::class, 'show']);

    // Route::post('/', [LeaveRequestController::class, 'create']);

    Route::put('/{id}', [LeaveRequestController::class, 'update']);

    // Route::delete('/{id}', [LeaveRequestController::class, 'delete']);
});
