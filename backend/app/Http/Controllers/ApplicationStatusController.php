<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplicationStatus;

class ApplicationStatusController extends Controller
{
    public function statusUpdate(Request $request)
    {
        
        $status = $request->validate([
            'Application_No' => 'required|string',
            'user_id' => 'required|string',
            'status' => 'required|string',
        ]);

        try {
            ApplicationStatus::create([
                'Application_No' => $status['Application_No'],
                'user_id' => $status['user_id'],
                'status' => $status['status'],
            ]);

            return response()->json(['message' => 'Application status updated successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update application status: ' . $e->getMessage()], 500);
        }
    }

    public function statusFetch($user_id)
    {

        $status = ApplicationStatus::where('user_id', $user_id)
            ->select('Application_No', 'status')
            ->get();

        if ($status->isEmpty()) {
            return response()->json(['message' => 'No application status found.'], 404);
        }

        return response()->json($status, 200);
    }
}
