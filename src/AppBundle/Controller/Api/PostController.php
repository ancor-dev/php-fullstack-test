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
        $repository = $this->getDoctrine()->getRepository('AppBundle:Post');
        return $repository->findAll();
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