<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applicants_educational_qualifications', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('examination_name');
            $table->string('institute_name');
            $table->string('passing_year');
            $table->string('result');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants_educational_qualifications');
    }
};
