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
        $usesCase = $json_a['use_cases'];
        for($i = 0; $i < count($usesCase); $i++){
            $useCase = new UseCase();
            $useCase->name = $usesCase[$i]['name'];
            $useCase->max_time = $usesCase[$i]['max_time'];
            $useCase->last_page = $usesCase[$i]['last_page'];
            $useCase->save();
        }         
    }
}