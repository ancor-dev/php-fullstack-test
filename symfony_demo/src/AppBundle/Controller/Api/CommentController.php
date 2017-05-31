<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\{
    Comment, Post
};
use AppBundle\Repository\CommentRepository;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Controller\Annotations as FOS;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class CommentController
 * @package AppBundle\Controller\Api
 */
class CommentController extends Controller
{
    /**
     * @FOS\Get("/posts/{post}/comments")
     * @FOS\QueryParam(name="limit", default="30", requirements="\d+")
     * @FOS\QueryParam(name="offset", default="0", requirements="\d+")
     *
     * @param Post $post
     * @param ParamFetcherInterface $fetcher
     * @return Comment[]
     */
    public function listByPostAction(Post $post, ParamFetcherInterface $fetcher): array
    {
        return $this->getCommentRepository()->findBy(
            ['post' => $post],
            ['publishedAt' => 'DESC', 'id' => 'DESC'],
            $fetcher->get('limit'),
            $fetcher->get('offset')
        );
    }

    private function getCommentRepository(): CommentRepository
    {
        return $this->getDoctrine()->getRepository(Comment::class);
    }
}
