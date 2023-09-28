<?php

return [
    'default' => [
        'page' => 1,
        'per_page' => 10,
        'search' => '',
        'sort' => '',
    ],
    'leave_request' => [
        'search_by' => 'content',
        'sort_by' => 'id',
        'fields' => ['id', 'content', 'start_date', 'end_date'],
        'select' => ['*'],
    ]
];
