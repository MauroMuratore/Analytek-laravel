<?php

namespace App\Http\Controllers\Analytek;

use App\Models\Analytek\Perfomance;
use App\Models\Analytek\PerfomanceData;
use App\Models\Analytek\UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnalytekController extends Controller
{
    public function getUseCases()
    {
        return UseCase::all();
    }

    public function setPerfomanceData(Request $request)
    {
        $perfomance = new Perfomance();
        $perfomance->id = $request->id;
        $perfomance->id_use_case = $request->id_use_case;
        $perfomance->save();

        $perfomanceData = new PerfomanceData();
        $perfomanceData->id_perfomance = $request->id;
        $perfomanceData->page = $request->page;
        $perfomanceData->time = $request->time;
        $perfomanceData->save();
    }


}
