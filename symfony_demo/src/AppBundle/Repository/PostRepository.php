<?php

namespace AppBundle\Repository;

use AppBundle\Entity\Post;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;

/**
 * Class PostRepository
 * @package AppBundle\Repository
 */
class PostRepository extends EntityRepository
{
    public function queryLatest(): QueryBuilder
    {
        return $this
            ->createQueryBuilder('p')
            ->where('p.publishedAt <= :now')
            ->orderBy('p.publishedAt', 'DESC')
            ->setParameter('now', new \DateTime());
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return Post[]
     */
    public function findPosts(int $limit = 30, int $offset = 0): array
    {
        return $this->createQueryBuilder('p')
            ->leftJoin('p.author', 'a')
            ->addSelect('a')
            ->setMaxResults($limit)
            ->setFirstResult($offset)
            ->orderBy('p.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findLatest(int $page = 1): Pagerfanta
    {
        $paginator = new Pagerfanta(new DoctrineORMAdapter($this->queryLatest(), false));

        return $paginator
            ->setMaxPerPage(Post::NUM_ITEMS)
            ->setCurrentPage($page);
    }
}
