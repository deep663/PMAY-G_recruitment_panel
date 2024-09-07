<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostSelected extends Model
{
    use HasFactory;

    protected $table = 'post_selected';

    protected $fillable = [
        'user_id',
        'selected_post',
        'Application_No'
    ];
}
