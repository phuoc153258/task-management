<?php

namespace App\Services\Paginate;

interface PaginateServiceInterface
{
    public function paginate(array $options,  $query);
}
