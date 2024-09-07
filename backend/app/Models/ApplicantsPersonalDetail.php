<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantsPersonalDetail extends Model
{
    use HasFactory;

    protected $table = 'applicants_personal_details';

    protected $fillable = [
        'Application_No',
        'user_id',
        'first_name',
        'last_name',
        'father_name',
        'mother_name',
        'dob',
        'marital_status',
        'religion',
        'caste',
        'gender',
        'email',
        'phone',
        'address',
        'city',
        'district',
        'state',
        'country',
        'pincode',
    ];
}
