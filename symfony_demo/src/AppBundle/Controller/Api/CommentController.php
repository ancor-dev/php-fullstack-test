<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Comment;
use AppBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;

class CommentController extends Controller
{
    /**
     * @FOS\Get("/posts/{id}/comments")
     *
     * @param Post $post
     * @return \AppBundle\Entity\Comment[]
     */
    public function listByPostAction(Post $post)
    {
        return $this->getDoctrine()
            ->getRepository(Comment::class)
            ->findBy(['post' => $post]);
    }
}
