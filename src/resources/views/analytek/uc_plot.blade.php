@extends('analytek.base')

@section('more-header')
<script src="https://cdn.plot.ly/plotly-2.16.1.min.js"></script>
<script src="/js/Analytek/uc-plot.js"></script>
@endsection

@section('body')
<div class="row justify-content-center">
    <div class="col-8 justify-content-center">
        <div class="w-100 text-center">
            <h1 class="tek-color">{{ $use_case_name }}</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 pt-5">
                <h3 class="tek-color">Time</h1>
                <div id="div-time"></div>
            </div>
            <div class="col-12 pt-5" >
                <h3 class="tek-color">Success Rate</h1>
                <div id="div-success"></div>
            </div>
            <div class="col-12 py-5">
                <h3 class="tek-color">Paths' time</h1>

                <div id="div-path-time"></div>
            </div>
            <div class="col-12 py-5">
                <h3 class="tek-color">Paths' count</h1>
                <div id="div-path-count"></div>
            </div>

        </div>
    </div>
</div>
@endsection