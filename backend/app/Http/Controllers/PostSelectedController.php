<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostSelected;

class PostSelectedController extends Controller
{
    public function selected_post(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|string',
            'selected_post' => 'required|string',
        ]);

        try {
            $existingPost = PostSelected::where('user_id', $data['user_id'])
                ->where('selected_post', $data['selected_post'])
                ->first();

            if ($existingPost) {
                return response()->json([
                    'status' => 409,
                    'message' => 'The post has already been selected by this user.',
                ], 409);
            }

            $words = explode(' ', $data['selected_post']);
            $abbreviation = '';
            foreach ($words as $word) {
                $abbreviation .= strtoupper(substr($word, 0, 1));
            }

            $user_id_digits = substr($data['user_id'], -4);
            $unique_string = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
            $application_no = $abbreviation . $user_id_digits . $unique_string;

            PostSelected::create([
                'user_id' => $data['user_id'],
                'selected_post' => $data['selected_post'],
                'Application_No' => $application_no,
            ]);

            return response()->json([
                'status' => 201,
                'message' => 'Post selection successfully submitted.',
                'application_no' => $application_no,
                'user_id' => $data['user_id']
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to submit post selection.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getApplicationDetails($user_id)
    {
        
        $postSelected = PostSelected::where('user_id', $user_id)->first();

        if ($postSelected) {
            if ($postSelected->Application_No) {
                return response()->json([
                    'Application_No' => $postSelected->Application_No,
                    'selected_post' => $postSelected->selected_post,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Application number not found for this user_id.'
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'No user_id and Application number found.'
            ], 404);
        }
    }
}
