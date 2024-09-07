<?php

namespace App\Http\Controllers;

use App\Models\ApplicantEducationalQualification;
use App\Models\User;
use App\Models\ApplicantsPersonalDetail;
use App\Models\ApplicantsWorkExperience;
use App\Models\PostSelected;

class UserDataController extends Controller
{
    public function getUserData($user_id)
    {
        $user = User::where('user_id', $user_id)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }


        $personalDetails = ApplicantsPersonalDetail::where('user_id', $user_id)
        ->select('first_name', 'last_name', 'father_name', 'mother_name', 'dob','marital_status', 'religion', 'caste', 'gender', 'email', 'phone', 'address', 'city', 'district', 'state', 'country', 'pincode')
        ->first();
        $educationalQualifications = ApplicantEducationalQualification::where('user_id', $user_id)
        ->select('examination_name','institute_name', 'board', 'passing_year', 'result')
        ->get();

        $workExperiences = ApplicantsWorkExperience::where('user_id', $user_id)
        ->select('company_name', 'position', 'from', 'to', 'location')->get();

        $selectedPosts = PostSelected::where('user_id', $user_id)->select('selected_post')->first();

        $data = [
            'selected_posts' => $selectedPosts,
            'personal_details' => $personalDetails,
            'educational_qualifications' => $educationalQualifications,
            'work_experiences' => $workExperiences,

        ];
        return response()->json($data, 200);
    }
}
