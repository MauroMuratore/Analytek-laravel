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


}
