<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicantDocument extends Model
{
    use HasFactory;

    protected $table = 'applicants_documents';

    protected $fillable = [
        'Application_No',
        'user_id',
        'document_name',
        'document_path',
    ];
}
