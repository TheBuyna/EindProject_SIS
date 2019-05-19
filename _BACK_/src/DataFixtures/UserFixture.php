<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixture extends BaseFixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(10, 'main_user', function ($i) {
            $user = new User();
            $user->setEmail(sprintf('news_gebruiker%d@exaple.com', $i));
            $user->setFirstName($this->faker->firstName);
            $user->setLastName($this->faker->lastName);
            $user->setStreetName($this->faker->streetName);
            $user->setHouseNumber($this->faker->buildingNumber);
            $user->setCity($this->faker->city);
            $user->setPostalCode($this->faker->postcode);

            $user->setPassword($this->passwordEncoder->encodePassword(
               $user,
               'engage'
            ));

            return $user;
        });

        $manager->flush();
    }
}
