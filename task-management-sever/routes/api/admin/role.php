<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\RoleController;

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {

    Route::get('/', [RoleController::class, 'index']);
});
