<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;


class CommentController extends Controller
{
    /**
     * @FOS\Get("/posts/{post}/comments")
     *
     * @return \AppBundle\Entity\Comment[]
     */
    public function listAction(Post $post)
    {
        return $post->getComments();
    }

}