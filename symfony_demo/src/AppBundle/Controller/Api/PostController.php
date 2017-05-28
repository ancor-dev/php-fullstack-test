<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;

class PostController extends Controller
{
    /**
     * @FOS\Get("/posts")
     *
     * @return \AppBundle\Entity\Post[]
     */
    public function listAction()
    {
        return $this->getDoctrine()
            ->getManagerForClass(Post::class)
            ->createQueryBuilder()
            ->select('post')
            ->from(Post::class, 'post')
            ->getQuery()
            ->execute();
    }

    /**
     * @FOS\Get("/posts/{id}")
     *
     * @return \AppBundle\Entity\Post
     */
    public function getAction(Post $post)
    {
        return $post;
    }
}