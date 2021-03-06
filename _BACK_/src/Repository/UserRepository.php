<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findAdminUser($email)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.roles LIKE :admin')
            ->andWhere('a.email = :email')
            ->setParameter('email', $email)
            ->setParameter('admin', "%ROLE_ADMIN%")
            ->getQuery()
            ->getOneOrNullResult()
            ;
    }

    /**
     * @param string|null $term
     */
    public function getWithSearchQueryBuilder(?string $term): QueryBuilder
    {
        $qb = $this->createQueryBuilder('u');

        if ($term) {
            $qb->andWhere('u.email LIKE :term OR u.roles LIKE UPPER(:term) OR u.firstName LIKE :term')
                ->setParameter('term', '%'.$term.'%')
            ;
        }

        return $qb
            ->orderBy('u.id', 'ASC');
    }

//    public function updateUser($id)
//    {
//
//        return $this->createQueryBuilder('u')
//            ->update()
//            ->andWhere('i.id LIKE :id')
//            ->setParameter('id', $id)
//            ->getQuery()
//            ->execute()
//            ;
//    }

    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
