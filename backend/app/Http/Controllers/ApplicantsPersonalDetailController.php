<?php

namespace App\Http\Controllers;

use App\Models\ApplicantsPersonalDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Laravel\Sanctum\PersonalAccessToken;

class ApplicantsPersonalDetailController extends Controller
{
    public function personal_details(Request $request)
    {
        
        $validatedData = $request->validate([
            'Application_No' => ['required', 'string', 'max:30'],
            'user_id' => ['required'],
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'father_name' => ['required', 'string', 'max:100'],
            'mother_name' => ['required', 'string', 'max:100'],
            'dob' => ['required', 'date'],
            'marital_status' => ['required', 'string', 'max:20'],
            'religion' => ['required', 'string', 'max:50'],
            'caste' => ['required', 'string', 'max:50'],
            'gender' => ['required', 'string', 'max:10'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:15'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'country' => ['required', 'string', 'max:100'],
            'pincode' => ['required', 'string', 'max:10'],
        ]);

        try {
            $applicantDetails = ApplicantsPersonalDetail::create($validatedData);

            return response()->json([
                'status' => 201,
                'message' => 'Applicant details successfully saved',
                'data' => $applicantDetails
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while saving the details: ' . $e->getMessage(),
            ], 500);
        }
    }
}

