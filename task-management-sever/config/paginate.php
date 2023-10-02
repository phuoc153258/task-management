<?php

return [
    'default' => [
        'page' => 1,
        'per_page' => 10,
        'search' => '',
        'sort' => '',
    ],
    'user' => [
        'search_by' => 'username',
        'sort_by' => 'fullname',
        'select' => ['*'],
    ],
    'leave_request' => [
        'search_by' => 'content',
        'sort_by' => 'start_date',
        'select' => ['*'],
    ],
    'project' => [
        'search_by' => 'title',
        'sort_by' => 'description',
        'select' => ['*'],
    ],
    'user_project' => [
        'search_by' => 'user_id',
        'sort_by' => 'user_id',
        'select' => ['*'],
    ],
    'task' => [
        'search_by' => 'title',
        'sort_by' => 'title',
        'select' => ['*'],
    ],
];