<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Post;
use AppBundle\Pagination\PaginatedCollection;
use AppBundle\Repository\PostRepository;
use FOS\RestBundle\Controller\Annotations as FOS;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PostController extends Controller
{
    /**
     * @FOS\Get("/posts", requirements={"id" = "\d+"})
     * @FOS\QueryParam(name="page", requirements="\d+", default="1")
     * @FOS\QueryParam(name="perPage", requirements="\d+", default="10")
     *
     * @param ParamFetcherInterface $fetcher
     * @return PaginatedCollection
     */
    public function listAction(ParamFetcherInterface $fetcher): PaginatedCollection
    {
        $pager = $this
            ->getPostRepository()
            ->findLatest($fetcher->get('page'),
                         $fetcher->get('perPage'));

        $collection = new PaginatedCollection($pager);

        return $collection;
    }

    /**
     * @FOS\Get("/posts/{slug}", requirements={"slug" = "[\w\d_-]+"})
     *
     * @param Post $post
     * @return Post
     */
    public function getAction(Post $post): Post
    {
        return $post;
    }

    private function getPostRepository(): PostRepository
    {
        return $this->getDoctrine()
                    ->getRepository(Post::class);
    }

}
