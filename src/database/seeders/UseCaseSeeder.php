<?php

namespace Database\Seeders;

use App\Models\AnalytekUC\UseCase;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UseCaseSeeder extends Seeder
{
    public function run(){
        $string = Storage::get("public/Analytek/UseCase.json");
        $json_a = json_decode($string, true);
        $usesCase = $json_a['use_cases'];
        for($i = 0; $i < count($usesCase); $i++){
            DB::table('use_cases')->insert([
                'name' => $usesCase[$i]['name'],
                'max_time' => $usesCase[$i]['max_time'],
                'pages' => $usesCase[$i]['pages'],
            ]);
        }         
    }
}