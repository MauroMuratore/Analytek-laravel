<?php

namespace App\Http\Controllers\AnalytekUC;

use App\Models\AnalytekUC\UCExecution;
use App\Models\AnalytekUC\UCTimeOnPage;
use App\Models\AnalytekUC\UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class UseCaseController extends Controller
{
    public function getUseCases()
    {
        return UseCase::all();
    }

    public function getUseCase($id){
        $use_case = UseCase::find($id);
        $executions = [];
        foreach ($use_case->uc_executions as $uc_execution) {
            $time_on_page = [];
            foreach ($uc_execution->uc_time_on_page as $uc_time_on_page) {
                $time_on_page[] = [
                    'page' => $uc_time_on_page->page,
                    'time' => $uc_time_on_page->time
                ];
            }
            $executions[] = [
                'uuid' => $uc_execution->uuid,
                'time_on_page' => $time_on_page
            ];
        }

        return [
            'name' => $use_case->name,
            'max_time' => $use_case->max_time,
            'pages' => $use_case->pages,
            'executions' => $executions
        ];
    }

    public function setUCExecution(Request $request)
    {
        $json_request = json_decode($request->getContent(), true);
        $uuid = (string) Str::uuid();
        try {
            $total_time = 0;
            $order=0;
            foreach ($json_request['data'] as $data ) {
                $page = explode(':', $data)[0];
                $time = explode(':', $data)[1];
                $order++;
                $total_time += $time;
                UCTimeOnPage::create([
                    'uuid_uc_exe' => $uuid,
                    'page' => $page,
                    'time' => $time,
                    'order' => $order
                ]);
            }
            UCExecution::create([
                'uuid' => $uuid,
                'id_use_case' => $json_request['use_case'],
                'time' => $total_time
            ]);

        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
        $errorResJson = $e
            ->getResponse()
            ->getBody()
            ->getContents();
        $errorRes = json_decode(stripslashes($errorResJson), true);
        // Return error
        return response()->json(
            [
            'message' => 'error',
            'data' => $errorRes
            ],
            $errorRes['response']['code']
        );
        }

        return response()->json(
            [
              'status' => '200',
              'message' => 'success',
              'data' => UCExecution::where("uuid",$uuid)->first()
            ],
            200
          );
    }

    public function getUCDataPlot($id){
        $useCase = UseCase::findOrFail($id);
        $t_max = $useCase->max_time;
        //calculate only finish execution
        $ucExes = UCExecution::where('id_use_case', $id)
            ->has('uc_time_on_page', '>', '0')->get();
        
        //calculate time average for all execution
        $t_average = $ucExes->map(function ($ucEx){
                        return $ucEx->time;
                    })->avg();

        //calculate success rate
        $success_rate = $ucExes->filter(function($ucEx) use ($t_max){
                        return $ucEx->time < $t_max;
                    })->count() / $ucExes->count();

        return [
            "name" => $useCase->name,
            "max_time" => $t_max,
            "man_pages" => $useCase->pages,
            "avg_time" => $t_average,
            "success_rate" => $success_rate,
            "fail_rate" => 1 - $success_rate,
            "paths" => $this->getUCPath($ucExes)
        ];

    }

    //può essere implementato molto meglio!!
    function getUCPath($ucExes){
        //get all path
        $paths = [];
        foreach($ucExes as $ucEx){
            $path = $ucEx->uc_time_on_page
                ->map(function ($uc_top){
                return $uc_top->page;
            })->all();
            if(!in_array($path, $paths)){
                $paths[] = $path;
            }
        }
        //for each path calculate rate and avg time for each page
        $ritorno = [];
        foreach($paths as $path){
            //filter exe that uses $path
            $exesWithPath = $this->filterExesFromPath($ucExes, $path);
            //foreach page of path calculate average time
            $page_time = [];
            for($index=0; $index<count($path); $index++){
                $temp_page_time = $exesWithPath->map(function ($uc_ex) use ($index){
                        //extract only the time of page
                        return $uc_ex->uc_time_on_page->slice($index, 1)
                                ->map(function($uc_top){
                                    return $uc_top->time;
                                });
                    })->values()->all();
                $avg_page_time =0;
                foreach($temp_page_time as $tpt){
                    $avg_page_time+= $tpt->first() / count($exesWithPath); 
                } 

                $page_time[] = [
                    "page" => $path[$index],
                    "avg_time" => $avg_page_time
                ];
            }
            $path_name = implode(",", $path);
            $ritorno[] = [
                "path" => $path_name,
                "count" => count($exesWithPath),
                "page_time" => $page_time
            ];       
        }
        $count = array_column($ritorno, "count");
        array_multisort($count, SORT_DESC, $ritorno);
        return $ritorno;
    }

    function filterExesFromPath($ucExes, $path){
        return $ucExes->filter(function ($ucEx) use ($path){
            //calculate path of exe
            $temp_ex_path = $ucEx->uc_time_on_page
                    ->map(function ($uc_top){
                    return $uc_top->page;
                })->all();
            //check if they are equal
            if($path == $temp_ex_path){
                return true;
            }else{
                return false;
            }
        });
    }

}
