<?php

namespace Database\Seeders;

use App\Models\Analytek\UseCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UseCaseSeeder
{
    public function seed(){

        $string = Storage::get("public/Analytek/use_cases.json");
        $json_a = json_decode($string, true);
         
    }
}