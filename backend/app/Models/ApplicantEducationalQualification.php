<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantEducationalQualification extends Model
{
    use HasFactory;

    protected $table = 'applicants_educational_qualifications';

    protected $fillable = [
        'Application_No',
        'user_id',
        'examination_name',
        'board',
        'institute_name',
        'passing_year',
        'result',
    ];
}
