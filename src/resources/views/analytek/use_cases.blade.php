@extends('analytek.base')
@section('body')

<div class="row justify-content-center">
    <div class="col-8 justify-content-center">
        <div class="w-100 text-center">
            <h1 class="tek-color">Use Cases</h1>
        </div>
        <div class="row">
        @foreach($use_cases as $uc)
            <div class="col-12 px-5 py-3">
                <a href="{{ route('analytek.show', ['id' =>$uc->id])}}">{{ $uc->name}}</a>
            </div>
        @endforeach
        </div>
    </div>
</div>

@endsection