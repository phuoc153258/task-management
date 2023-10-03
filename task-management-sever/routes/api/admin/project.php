<?php

use App\Http\Controllers\Admin\ProjectController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {

    Route::get('/', [ProjectController::class, 'index']);

    Route::get('/{id}', [ProjectController::class, 'show']);

    Route::post('/', [ProjectController::class, 'create']);

    Route::put('/{id}', [ProjectController::class, 'update']);

    Route::delete('/{id}', [ProjectController::class, 'delete']);

    Route::patch('/{id}/restore', [ProjectController::class, 'restore']);

    Route::delete('/{id}/force', [ProjectController::class, 'force']);
});
