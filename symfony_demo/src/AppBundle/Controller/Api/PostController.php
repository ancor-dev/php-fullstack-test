<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Post;
use AppBundle\Repository\PostRepository;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;

/**
 * Class PostController
 * @package AppBundle\Controller\Api
 */
class PostController extends Controller
{
    /**
     * @FOS\Get("/posts")
     * @FOS\QueryParam(name="limit", default="30", requirements="\d+")
     * @FOS\QueryParam(name="offset", default="0", requirements="\d+")
     *
     * @param ParamFetcherInterface $fetcher
     * @return Post[]
     */
    public function listAction(ParamFetcherInterface $fetcher): array
    {
        return $this->getPostRepository()->findPosts($fetcher->get('limit'), $fetcher->get('offset'));
    }

    /**
     * @FOS\Get("/posts/{id}")
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
        return $this->getDoctrine()->getRepository(Post::class);
    }
}
