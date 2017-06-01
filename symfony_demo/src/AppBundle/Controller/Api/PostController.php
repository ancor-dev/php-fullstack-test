<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;

class PostController extends Controller
{
    /**
     * @FOS\Get("/api/posts")
     *
     * @return \AppBundle\Entity\Post[]
     */
    public function listAction()
    {
        return $this->getDoctrine()
            ->getRepository(Post::class)
            ->findAll();
    }

    /**
     * @FOS\Get("/api/posts/{id}")
     *
     * @return \AppBundle\Entity\Post
     */
    public function getAction(Post $post)
    {
        return $post;
    }
}