<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplicantEducationalQualification;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class ApplicantEducationalQualificationController extends Controller
{
    public function ed_details(Request $request)
    {
       
        $data = $request->validate([
            'Application_No'=> 'required|string',
            'user_id' => 'required|string',
            'examinations' => 'required|array',
            'examinations.*.examination_name' => 'required|string',
            'examinations.*.institute_name' => 'required|string',
            'examinations.*.board' => 'required|string',
            'examinations.*.passing_year' => ['required', 'date'],
            'examinations.*.result' => 'required|string',
        ]);

        try {
            foreach ($data['examinations'] as $examination) {
                ApplicantEducationalQualification::create([
                    'Application_No' => $data['Application_No'],
                    'user_id' => $data['user_id'],
                    'examination_name' => $examination['examination_name'],
                    'institute_name' => $examination['institute_name'],
                    'board' => $examination['board'],
                    'passing_year' => $examination['passing_year'],
                    'result' => $examination['result'],
                ]);
            }

            return response()->json([
                'status' => 201,
                'message' => 'Educational qualification details successfully submitted.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to submit educational qualification details.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

