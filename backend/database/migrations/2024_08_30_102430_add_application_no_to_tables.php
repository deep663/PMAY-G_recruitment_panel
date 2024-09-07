<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddApplicationNoToTables extends Migration
{
    public function up()
    {
        Schema::table('applicants_personal_details', function (Blueprint $table) {
            $table->string('Application_No')->after('id');
        });

        Schema::table('applicants_educational_qualifications', function (Blueprint $table) {
            $table->string('Application_No')->after('id');
        });

        Schema::table('applicants_work_experience', function (Blueprint $table) {
            $table->string('Application_No')->after('id');
        });

        Schema::table('post_selected', function (Blueprint $table) {
            $table->string('Application_No')->after('id');
        });

        Schema::table('applicants_documents', function (Blueprint $table) {
            $table->string('Application_No')->after('id');
        });

        Schema::table('application_status', function (Blueprint $table) {
            $table->string('Application_No')->after('id');
        });
    }

    public function down()
    {
        Schema::table('applicants_personal_details', function (Blueprint $table) {
            $table->dropColumn('Application_No');
        });

        Schema::table('applicants_educational_qualifications', function (Blueprint $table) {
            $table->dropColumn('Application_No');
        });

        Schema::table('applicants_work_experience', function (Blueprint $table) {
            $table->dropColumn('Application_No');
        });

        Schema::table('post_selected', function (Blueprint $table) {
            $table->dropColumn('Application_No');
        });

        Schema::table('applicants_documents', function (Blueprint $table) {
            $table->dropColumn('Application_No');
        });

        Schema::table('application_status', function (Blueprint $table) {
            $table->dropColumn('Application_No');
        });
    }
}
