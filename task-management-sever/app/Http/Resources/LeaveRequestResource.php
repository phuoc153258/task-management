<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveRequestResource extends JsonResource
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
            'content' => $this->content,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'status' => $this->status,
            'status_name' => $this->status_name,
            'accept_by' => $this->accept_by,
            'user_id' => $this->user_id,
            'leave_request_type_id' => $this->leave_request_type_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'leave_request_type' => $this->leaveRequestType,
        ];
    }
}
