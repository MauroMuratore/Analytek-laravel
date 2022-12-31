<?php

namespace App\Http\Controllers\AnalytekUC;

use App\Models\AnalytekUC\UCExecution;
use App\Models\AnalytekUC\UCTimeOnPage;
use App\Models\AnalytekUC\UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AnalytekUC\UseCaseController;


class UseCaseViewController extends Controller
{
    public function getUseCases()
    {
        return view('analytek.use_cases')
        ->with('use_cases', UseCase::all());
    }

    public function getUCPlot($id){
        $uc_controller = new UseCaseController;
        return view('analytek.uc_plot')
        ->with('use_case_name', UseCase::findOrFail($id)->name);
    }

    


}
