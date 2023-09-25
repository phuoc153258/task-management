<?php

use App\Http\Controllers\Admin\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {

    Route::get('/', [ProjectController::class, 'index']);

    Route::get('/{id}', [ProjectController::class, 'show']);
});
