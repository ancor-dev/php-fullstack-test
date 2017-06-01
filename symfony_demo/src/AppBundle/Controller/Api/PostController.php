<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Post;
use Doctrine\ORM\EntityRepository;
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
        /** @var EntityRepository $postsRepository */
        $postsRepository = $this->getDoctrine()->getRepository(Post::class);

        return $postsRepository->createQueryBuilder('p')
            ->select('p', 'a')// fetching author relation via single query
            ->join('p.author', 'a')// author is mandatory
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
