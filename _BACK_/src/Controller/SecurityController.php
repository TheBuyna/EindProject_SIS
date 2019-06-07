<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserFormType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    private $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    /**
     * @Route("/", name="app_homepage")\
     */
    public function index()
    {
//        return $this->render('base.html.twig', [
//            'message' => 'TODO HOMEPAGE',
//        ]);
        return new RedirectResponse($this->router->generate('app_login'));
    }

    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils)
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();
        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername,
            'error'         => $error,
        ]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('Will be intercepted before getting here');
    }

    /**
     * @Route("api/register", name="api_auth_register", methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param EntityManagerInterface $em
     * @return JsonResponse
     * @throws \Doctrine\DBAL\ConnectionException
     */
    public function apiRegister(Request $request, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(),true);

        $email = $data["email"];
        $firstName = $data["first_name"];
        $lastName = $data["last_name"];
        $streetName = $data["street_name"];
        $houseNumber = $data["house_number"];
        $city = $data["city"];
        $postalCode = $data["postal_code"];
        $plainPassword = $data["password"];

        $contains_uppercase = preg_match('@[A-Z]@', $plainPassword);
        $contains_lowercase = preg_match('@[a-z]@', $plainPassword);
        $contains_number    = preg_match('@[0-9]@', $plainPassword);

        //Password validation
        if (strlen($plainPassword) < 6) {
            return new JsonResponse([
                "error" => 'Password must be at least 6 characters long'
            ], 500);
        }
        if (!$contains_uppercase) {
            return new JsonResponse([
                "error" => 'Password must contain at least one uppercase!'
            ], 500);
        }
        if (!$contains_lowercase) {
            return new JsonResponse([
                "error" => 'Password must contain at least one lowercase!'
            ], 500);
        }
        if (!$contains_number) {
            return new JsonResponse([
                "error" => 'Password must contain at least one number!'
            ], 500);
        }

        //Email validation
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse([
                "error" => 'Invalid email address!'
            ], 500);
        }
        try{
            $user = new User();

            $user
                ->setEmail($email)
                ->setFirstName($firstName)
                ->setLastName($lastName)
                ->setStreetName($streetName)
                ->setHouseNumber($houseNumber)
                ->setCity($city)
                ->setPostalCode($postalCode)
                ->setTheme('light')
                ->setPassword($passwordEncoder->encodePassword($user, $plainPassword));
            if (isset($data["mailbox_number"])) {
                $user->setMailboxNumber($data["mailbox_number"]);
            }
            if (isset($data["telephone"])) {
                $user->setTelephone($data["telephone"]);
            }
            $em->persist($user);
            $em->flush();
        } catch (\Exception $exception) {
            return new JsonResponse([
                "error" => $exception->getMessage()
            ], 500);
        }
        return new JsonResponse([
           "success" => $user->getFirstName(). " has been registered!"
        ], 200);
    }


    /**
     * @Route("/api/resetPassword", name="password_reset_api", methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    public function apiResetPassword(Request $request,UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $em)
    {
//        dd($this->getUser());
        $user = $this->getUser();
        $data = json_decode($request->getContent(),true);
        $oldPassword = $data["oldPassword"];
        $newPlainPassword = $data["plainNewPassword"];

        $contains_uppercase = preg_match('@[A-Z]@', $newPlainPassword);
        $contains_lowercase = preg_match('@[a-z]@', $newPlainPassword);
        $contains_number    = preg_match('@[0-9]@', $newPlainPassword);
        //Password validation
        if (strlen($newPlainPassword) < 6) {
            return new JsonResponse([
                "error" => 'Password must be at least 6 characters long'
            ], 500);
        }
        if (!$contains_uppercase) {
            return new JsonResponse([
                "error" => 'Password must contain at least one uppercase!'
            ], 500);
        }
        if (!$contains_lowercase) {
            return new JsonResponse([
                "error" => 'Password must contain at least one lowercase!'
            ], 500);
        }
        if (!$contains_number) {
            return new JsonResponse([
                "error" => 'Password must contain at least one number!'
            ], 500);
        }

        if ($passwordEncoder->isPasswordValid($user, $oldPassword)) {
            $newEncodedPassword = $passwordEncoder->encodePassword($user, $newPlainPassword);
            if ($oldPassword !== $newPlainPassword) {
                $user->setPassword($newEncodedPassword);

                $em->persist($user);
                $em->flush();

                return new JsonResponse([
                    "success" => "You changed your password successfully!"
                ], 200);
            } else {
                return new JsonResponse([
                    "error" => 'New password cant be the same as old one!'
                ], 500);
            }

        } else {
            return new JsonResponse([
                "error" => 'Old password is incorrect!'
            ], 500);
        }
//        return new Response(sprintf('Logged in as %s',$this->getUser()->getFirstName()));
    }

    /**
     * @Route("/api/updateuser", methods={"PUT"})
     * @param Request $request
     * @param UserRepository $userRepository
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    public function apiUpdateUser(UserRepository $userRepository, Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(),true);
        $email = $data["email"];
        $firstName = $data["first_Name"];
        $lastName = $data["last_Name"];
        $streetName = $data["street_Name"];
        $houseNumber = $data["house_Number"];
        $city = $data["city"];

        $user = $userRepository->findOneBy(['id' => $this->getUser()->getId()]);
        $user
            ->setEmail($email)
            ->setFirstName($firstName)
            ->setLastName($lastName)
            ->setStreetName($streetName)
            ->setHouseNumber($houseNumber)
            ->setCity($city);
            if (isset($data["mailBox_Number"])) {
                $user->setMailboxNumber($data["mailBox_Number"]);
            }
            if (isset($data["telephone"])) {
                $user->setTelephone($data["telephone"]);
            }
        $em->persist($user);
        $em->flush();

        return new JsonResponse([
            "success" => $user->getFirstName(). " has been updated!"
        ], 200);
    }

    /**
     * @Route("/apiCheck")
     * @return Response
     */
    public function apiVerify(Request $request)
    {
        return new JsonResponse([
            "user" => $this->getUser()->getAllInfo()
        ], 200);
    }

    private function passwordValidation($plainPassword) {

        $contains_uppercase = preg_match('@[A-Z]@', $plainPassword);
        $contains_lowercase = preg_match('@[a-z]@', $plainPassword);
        $contains_number    = preg_match('@[0-9]@', $plainPassword);

        //Password validation
        if (strlen($plainPassword) < 6) {
            return new JsonResponse([
                "error" => 'Password must be at least 6 characters long'
            ], 500);
        }
        if (!$contains_uppercase) {
            return new JsonResponse([
                "error" => 'Password must contain at least one uppercase!'
            ], 500);
        }
        if (!$contains_lowercase) {
            return new JsonResponse([
                "error" => 'Password must contain at least one lowercase!'
            ], 500);
        }
        if (!$contains_number) {
            return new JsonResponse([
                "error" => 'Password must contain at least one number!'
            ], 500);
        }
    }

    /**
     * @Route("/api/setTheme", methods={"PUT"})
     * @param Request $request
     * @param UserRepository $userRepository
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    public function setTheme(UserRepository $userRepository, Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(),true);
        $user = $userRepository->findOneBy(['id' => $this->getUser()->getId()]);

        $theme = $data['theme'];
        $user->setTheme($theme);
        $em->persist($user);
        $em->flush();

        return new JsonResponse([
            "success" => "Theme has been set to ". $theme ."!"
        ], 200);
    }
}
