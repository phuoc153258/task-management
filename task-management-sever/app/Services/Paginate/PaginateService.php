<?php

namespace App\Services\Paginate;

use App\Services\Paginate\PaginateServiceInterface;

class PaginateService implements PaginateServiceInterface
{
    public function __construct()
    {
    }

    public function paginate(array $options, $query)
    {
        if (!$options['is_paginate']) return $query->get();

        if ($options['search'])
            $query
                ->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");

        if ($options['sort'] != '')
            $query
                ->orderBy($options['sort_by'], $options['sort']);

        $data = $query->select($options['select'])->paginate($options['limit'], ['page' => $options['page']]);

        return $data;
    }
}
