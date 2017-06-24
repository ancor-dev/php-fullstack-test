<?php
namespace AppBundle\Pagination;
use Pagerfanta\Pagerfanta;

/**
 * This is just example.
 * Every collection should has pagination.
 */
class PaginatedCollection {
    public $totalItems;
    public $totalPages;
    public $items;

    public function __construct(Pagerfanta $pager)
    {
        $this->totalPages  = $pager->getNbPages();
        $this->currentPage = $pager->getCurrentPage();
        $this->totalItems  = $pager->getNbResults();

        $items = [];
        foreach ($pager->getCurrentPageResults() as $item) {
            $items[] = $item;
        }

        $this->items = $items;
    } // end __construct()

}