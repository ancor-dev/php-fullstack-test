<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Comment;
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
     * REST resource action which returns comment list for specific post
     *
     * @FOS\Get("/posts/{id}/comments")
     *
     * @param Post $post
     *
     * @return Comment[]
     */
    public function listComments(Post $post)
    {
        // PHP#8 In real life project actions should be as thin as possible
        // thus this query should be moved to concrete entity repository
        return $this->getDoctrine()
            ->getRepository(Comment::class)
            ->findBy(
                ['post' => $post]
            );
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
