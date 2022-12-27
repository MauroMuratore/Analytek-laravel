<?php

namespace App\Http\Controllers\AnalytekUC;

use App\Models\AnalytekUC\UCExecution;
use App\Models\AnalytekUC\UCTimeOnPage;
use App\Models\AnalytekUC\UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class UCAnalytekController extends Controller
{
    public function getUseCases()
    {
        return UseCase::all();
    }

    public function setPerfomanceData(Request $request)
    {
        
        $json_request = json_decode($request->getContent(), true);
        $uuid = (string) Str::uuid();
        try {
            Performance::create([
                'uuid' => $uuid,
                'id_use_case' => $json_request['use_case']
            ]);
            foreach ($json_request['data'] as $data) {
                $page = explode(':', $data)[0];
                $time = explode(':', $data)[1];
                PerformanceData::create([
                    'id_performance' => $uuid,
                    'page' => $page,
                    'time' => $time
                ]);
            }

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
              'message' => 'success'
            ],
            200
          );
    }


}
