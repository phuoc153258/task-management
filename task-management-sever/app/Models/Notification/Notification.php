<?php

namespace App\Models\Notification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Notifiable;

class Notification extends DatabaseNotification
{
    use HasFactory, NotificationAttribute, NotificationRelationship, NotificationScope, Notifiable;
}
