<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Comment;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;

class CommentController extends Controller
{
    /**
     * @FOS\Get("/posts/{postId}/comments", requirements={"postId":"\d+"})
     *
     * @return \AppBundle\Entity\Comment[]
     */
    public function getComments($postId)
    {
        return $this->getDoctrine()
            ->getManagerForClass(Comment::class)
            ->createQueryBuilder()
            ->select('comment')
            ->from(Comment::class, 'comment')
            ->where('comment.post = :postId')
            ->setParameter('postId', $postId)
            ->getQuery()
            ->execute();
    }
}