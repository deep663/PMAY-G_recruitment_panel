<?php

namespace App\Http\Controllers;

use App\Models\ApplicantsWorkExperience;
use Illuminate\Http\Request;

class ApplicantsWorkExperienceController extends Controller
{
    public function work_experience(Request $request)
    {
        
        $data = $request->validate([
            'Application_No' => 'required|string',
            'user_id' => 'required|string',
            'work_experiences' => 'required|array',
            'work_experiences.*.company_name' => 'required|string',
            'work_experiences.*.position' => 'required|string',
            'work_experiences.*.from' => ['required', 'date'],
            'work_experiences.*.to' => ['required', 'date'],
            'work_experiences.*.location' => 'required|string',
        ]);

        try {
            foreach ($data['work_experiences'] as $experience) {
                ApplicantsWorkExperience::create([
                    'Application_No' => $data['Application_No'],
                    'user_id' => $data['user_id'],
                    'company_name' => $experience['company_name'],
                    'position' => $experience['position'],
                    'from' => $experience['from'],
                    'to' => $experience['to'],
                    'location' => $experience['location']
                ]);
            }

            return response()->json([
                'status' => 201,
                'message' => 'Work experiences successfully submitted.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to submit work experiences.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
