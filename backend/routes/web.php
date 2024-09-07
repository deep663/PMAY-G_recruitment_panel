<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureTokenIsValid;
use App\Http\Controllers\ApplicantsPersonalDetailController;

Route::get('/', function () {
    return view('welcome');
});


