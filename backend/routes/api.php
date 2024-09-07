<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApplicantsPersonalDetailController;
use App\Http\Controllers\ApplicantEducationalQualificationController;
use App\Http\Controllers\PostSelectedController;
use App\Http\Controllers\ApplicantsWorkExperienceController;
use App\Http\Controllers\ApplicantDocumentController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\ApplicationStatusController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Middleware\CheckCookie;
use App\Models\User;

Auth::routes();


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [Authcontroller::class, "signin"]);
Route::post("/personalDetails",[ApplicantsPersonalDetailController::class,"personal_details"])->middleware(CheckCookie::class);
Route::post("/qualifications",[ApplicantEducationalQualificationController::class,"ed_details"])->middleware(CheckCookie::class);
Route::post("/postSelected",[PostSelectedController::class,"selected_post"])->middleware(CheckCookie::class);
Route::post("/workExperience",[ApplicantsWorkExperienceController::class,"work_experience"])->middleware(CheckCookie::class);
Route::post("/documentsUpload",[ApplicantDocumentController::class,"documents_upload"]);
Route::get("/user-data/{user_id}", [UserDataController::class, "getUserData"])->middleware(CheckCookie::class);
Route::post("/status", [ApplicationStatusController::class, "statusUpdate"])->middleware(CheckCookie::class);
Route::get("/status/{user_id}", [ApplicationStatusController::class, "statusFetch"])->middleware(CheckCookie::class);
Route::get('/FetchPostSelected/{user_id}', [PostSelectedController::class, 'getApplicationDetails'])->middleware(CheckCookie::class);

Route::get('/email/verify/{id}/{hash}', function ($id, $hash, Request $request) {
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    // Check if the hash matches the user's email hash
    if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Invalid verification link.'], 403);
    }

    // Mark the user's email address as verified
    if ($user->markEmailAsVerified()) {
        return response()->json(['message' => 'Email verified successfully.']);
    }

    return response()->json(['message' => 'Email is already verified.']);
})->middleware(['signed'])->name('verification.verify');

Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail'])->middleware(CheckCookie::class);
Route::post('/password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');
Route::get('/password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');


