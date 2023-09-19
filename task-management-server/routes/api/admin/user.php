<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {

    Route::get('/', [UserController::class, 'index']);

    Route::get('/{id}', [UserController::class, 'show']);

    Route::post('/', [UserController::class, 'create']);

    Route::post('/{id}', [UserController::class, 'update']);

    Route::delete('/{id}', [UserController::class, 'delete']);
});
