<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Comment;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;


class CommentController extends Controller
{
    /**
     * @FOS\Get("/api/comment/{post_id}")
     *
     * @return \AppBundle\Entity\Comment[]
     */
    public function listAction($post_id)
    {
        return $this->getDoctrine()
            ->getRepository(Comment::class)
            ->createQueryBuilder()
            ->from(Comment::class, 'comment')
            ->where('post_id = :post_id')
            ->setParameter('post_id', $post_id)
            ->getQuery()
            ->execute();
    }

}