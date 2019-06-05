<?php

namespace App\Repository;

use App\Entity\ReadLaterArticle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ReadLaterArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReadLaterArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReadLaterArticle[]    findAll()
 * @method ReadLaterArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReadLaterArticleRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ReadLaterArticle::class);
    }

    public function findArticleById($user)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.user = :val')
            ->setParameter('val', $user)
            ->getQuery()
            ->getResult()
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
