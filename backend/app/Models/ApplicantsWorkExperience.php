<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantsWorkExperience extends Model
{
    use HasFactory;

    protected $table = 'applicants_work_experience';

    protected $fillable = [
        'Application_No',
        'user_id',
        'company_name',
        'position',
        'from',
        'to',
        'location'
    ];
}
