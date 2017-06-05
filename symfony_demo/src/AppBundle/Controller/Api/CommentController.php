<?php

namespace AppBundle\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;

use AppBundle\Entity\Comment;

class CommentController extends Controller
{
    /**
     * Get comment list by post id
     * @param integer $postId
     *
     * @FOS\Get("/comments/{postId}")
     *
     * @return Comment[]
     */
    public function listByPostAction($postId)
    {
        return $this->getDoctrine()
            ->getManagerForClass(Comment::class)
            ->createQueryBuilder()
            ->select('comment')
            ->from(Comment::class, 'comment')
            ->where('comment.post = ?1')
            ->setParameter(1, $postId)
            ->getQuery()
            ->execute();
    }
}