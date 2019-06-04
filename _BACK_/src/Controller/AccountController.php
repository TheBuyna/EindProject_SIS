<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserFormType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @IsGranted("ROLE_USER")
 */
class AccountController extends BaseController
{
    /**
     * @Route("/admin/account", name="app_account")
     */
    public function index(LoggerInterface $logger)
    {

        $logger->debug('Checking account page for '.$this->getUser()->getEmail());
        return $this->render('account/index.html.twig', [

        ]);
    }

    /**
     * @Route("/account/api", name="api_account")
     */
    public function accountApi()
    {
        $user = $this->getUser();

        return $this->json($user,200, [], [
            'groups' => ['main']
        ]);
    }

    /**
     * @Route("/admin/allUsers", name="app_form_users")
     */
    public function show(UserRepository $repository, Request $request, PaginatorInterface $paginator)
    {
        $q = $request->query->get('q');
        $queryBuilder = $repository->getWithSearchQueryBuilder($q);

        $pagination = $paginator->paginate(
            $queryBuilder, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            10 /*limit per page*/
        );


        return $this->render('account/list.html.twig', [
            'pagination' => $pagination,
        ]);
    }

    /**
     * @Route("/admin/user/delete/{id}", name="admin_delete_user")
     */
    public function removeUser(EntityManagerInterface $em, UserRepository $userRepository, $id)
    {
        $user = $userRepository->findOneBy(['id' => $id]);
        $em->remove($user);
        $em->flush();

        return $this->redirectToRoute('app_form_users');
    }

    /**
     * @Route("/admin/user/new", name="admin_user_new")
     */
    public function addUser(EntityManagerInterface $em, Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $form = $this->createForm(UserFormType::class);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $email = $data["email"];
            $firstName = $data["firstName"];
            $lastName = $data["lastName"];
            $streetName = $data["streetName"];
            $houseNumber = $data["houseNumber"];
            $city = $data["city"];
            $postalCode = $data["postalCode"];
            $plainPassword = $data['password'];
            $roles = $data['roles'];

            $user = new User();
            $user
                ->setEmail($email)
                ->setRoles($roles)
                ->setFirstName($firstName)
                ->setLastName($lastName)
                ->setStreetName($streetName)
                ->setHouseNumber($houseNumber)
                ->setCity($city)
                ->setPostalCode($postalCode)
                ->setPassword($passwordEncoder->encodePassword(
                    $user,
                    $plainPassword
                ));
            $em->persist($user);
            $em->flush();
            $this->addFlash('success', 'User Created!');
            return $this->redirectToRoute('app_form_users');
        }
        return $this->render('account/new.html.twig', [
            'userForm' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/user/edit/{id}", name="admin_user_edit")
     */
    public function editUser(UserRepository $userRepository, Request $request, EntityManagerInterface $em, $id)
    {
        $user = $userRepository->findOneBy(['id' => $id]);
        $form = $this->createForm(UserFormType::class, $user);
        $form->remove('email');
//        $form->remove('roles');
        $form->remove('password');

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($user);
            $em->flush();
            $this->addFlash('success', 'User Updated!');
            return $this->redirectToRoute('admin_user_edit', [
                'id' => $user->getId(),
            ]);
        }
        return $this->render('account/edit.html.twig', [
            'userForm' => $form->createView()
        ]);
    }
}
