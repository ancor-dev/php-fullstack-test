<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Comment;
use AppBundle\Pagination\PaginatedCollection;
use AppBundle\Repository\CommentRepository;
use FOS\RestBundle\Controller\Annotations as FOS;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Comments CRUD Controller
 */
class CommentController extends Controller
{
    /**
     * @FOS\Get("/posts/{postId}/comments", requirements={"postId" = "\d+"})
     * @FOS\QueryParam(name="page", requirements="\d+", default="1")
     * @FOS\QueryParam(name="perPage", requirements="\d+", default="10")
     *
     * @param int                   $postId
     * @param ParamFetcherInterface $fetcher
     *
     * @return PaginatedCollection
     */
    public function listCommentsByPostAction(ParamFetcherInterface $fetcher, int $postId): PaginatedCollection
    {
        $repository = $this->getCommentRepository();

        $query = $repository->queryLatestByPostId($postId);
        $pager = $repository->queryToPager($query,
                                           $fetcher->get('page'),
                                           $fetcher->get('perPage'));
        $collection = new PaginatedCollection($pager);

        return $collection;
    } // end listCommentsByPostAction()

    private function getCommentRepository(): CommentRepository
    {
        return $this->getDoctrine()
                    ->getRepository(Comment::class);
    } // end getCommentRepository()

}
