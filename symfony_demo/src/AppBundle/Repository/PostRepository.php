<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace AppBundle\Repository;

use AppBundle\Entity\Post;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;

/**
 * @package AppBundle\Repository
 */
class PostRepository extends EntityRepository
{
    /**
     * @return QueryBuilder
     */
    public function queryLatest(): QueryBuilder
    {
        return $this
            ->createQueryBuilder('p')
            ->where('p.publishedAt <= :now')
            ->orderBy('p.publishedAt', 'DESC')
            ->setParameter('now', new \DateTime())
        ;
    }

    /**
     * @param int $page
     * @param int $perPage
     *
     * @return Pagerfanta
     */
    public function findLatest(int $page = 1, int $perPage = Post::NUM_ITEMS): Pagerfanta
    {
        $perPage = $perPage < 0 ? 0 : (
                   $perPage > Post::MAX_NUM_TIMES ? Post::MAX_NUM_TIMES :
                              $perPage);

        $paginator = new Pagerfanta(new DoctrineORMAdapter($this->queryLatest(), false));

        return $paginator
            ->setMaxPerPage($perPage)
            ->setCurrentPage($page)
        ;
    }
}
