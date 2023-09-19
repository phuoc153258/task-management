<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::group(['middleware' => ['auth:api']], function () {

    Route::post('/', [UserController::class, 'update']);

    Route::put('/password', [UserController::class, 'password']);
});
