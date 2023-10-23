<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/', [TaskController::class, 'index']);

    Route::get('/{id}', [TaskController::class, 'show']);

    Route::post('/', [TaskController::class, 'create'])->middleware('role:admin');

    Route::put('/{id}', [TaskController::class, 'update'])->middleware('role:admin');

    Route::delete('/{id}', [TaskController::class, 'delete'])->middleware('role:admin');
});
