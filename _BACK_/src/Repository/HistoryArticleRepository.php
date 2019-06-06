<?php

namespace App\Repository;

use App\Entity\HistoryArticle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method HistoryArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method HistoryArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method HistoryArticle[]    findAll()
 * @method HistoryArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HistoryArticleRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, HistoryArticle::class);
    }

    public function findArticleById($user)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.user = :val')
            ->setParameter('val', $user)
            ->getQuery()
//            ->getResult()
            ->getArrayResult()
            ;
    }
    // /**
    //  * @return HistoryArticle[] Returns an array of HistoryArticle objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?HistoryArticle
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
