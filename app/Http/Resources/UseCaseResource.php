<?php
 
namespace App\Http\Resources;
 
use Illuminate\Http\Resources\Json\JsonResource;
 
class UseCaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'last_page' => $this->last_page
        ];
    }
}