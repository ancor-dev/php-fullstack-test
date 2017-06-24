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

use AppBundle\Entity\Comment;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;

class CommentRepository extends EntityRepository
{
    /**
     * @param int $postId
     *
     * @return QueryBuilder
     */
    public function queryLatestByPostId(int $postId): QueryBuilder
    {
        return $this
            ->createQueryBuilder('c')
            ->where('c.publishedAt <= :now')
            ->andWhere('c.post = :postId')
            ->orderBy('c.publishedAt', 'DESC')
            ->setParameters([
                'now'    => new \DateTime(),
                'postId' => $postId,
            ])
        ;
    }

    /**
     * @param QueryBuilder $query
     * @param int          $page
     * @param int          $perPage
     *
     * @return Pagerfanta
     */
    public function queryToPager(QueryBuilder $query, int $page = 1, int $perPage = Comment::NUM_ITEMS): Pagerfanta
    {
        $perPage = $perPage < 0 ? 0 : (
                   $perPage > Comment::MAX_NUM_TIMES ? Comment::MAX_NUM_TIMES :
                              $perPage);

        $paginator = new Pagerfanta(new DoctrineORMAdapter($query, false));

        return $paginator
            ->setMaxPerPage($perPage)
            ->setCurrentPage($page)
        ;
    }
}
