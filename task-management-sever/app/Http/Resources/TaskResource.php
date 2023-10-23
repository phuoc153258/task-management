<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'project_id' => $this->project_id,
            'created_by_id' => $this->created_by,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'status_name' => $this->status_name,
            'hours' => $this->hours,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => $this->user,
            'created_by' => $this->createdBy,
            'project' => $this->project,
        ];
    }
}
