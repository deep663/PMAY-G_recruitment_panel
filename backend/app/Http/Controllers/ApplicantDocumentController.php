<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplicantDocument;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ApplicantDocumentController extends Controller
{
    public function documents_upload(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'Application_No' => 'required|string|exists:applicants,Application_No',
        //     'user_id' => 'required|string|exists:users,user_id',
        //     // 'photo' => 'required|file|mimes:jpeg,png,jpg|max:2048',
        //     // 'signature' => 'required|file|mimes:jpeg,png,jpg|max:2048',
        // ]);
        
        // if ($validator->fails()) {
        //     return response()->json([
        //         'status' => 422,
        //         'message' => 'Validation errors',
        //         'errors' => $validator->errors(),
        //     ], 422);
        // }

        try {
            
            $photoPath="";
            $photoPath=$request->file('photo')->store('public/public_docuemnts');
            $signaturePath=$request->file('signature')->store('public/public_docuemnts');
            

            return response()->json([
                'status' => 201,
                'photo_path' => $photoPath,
                'signature_path' => $signaturePath,
                'Application_No'=>$request->Application_No,
                'message' => 'Documents uploaded successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to upload documents',
                'error' => "dsds"
            ], 500);
        }
    }
}
