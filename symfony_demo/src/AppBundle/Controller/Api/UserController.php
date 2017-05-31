<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class UserController extends Controller
{
    /**
     * @FOS\Get("/users/{id}")
     *
     * @return \AppBundle\Entity\User
     */
    public function getAction(User $user)
    {
        return $user;
    }

    /**
     * @FOS\Get("/users")
     *
     * @return \AppBundle\Entity\User[]
     */
    public function listAction()
    {
        return $this->getDoctrine()
            ->getRepository(User::class)
            ->findAll();
    }

    /**
     * @FOS\Put("/users/{id}/roles")
     * @FOS\RequestParam(name="roles")
     *
     * @param User $theUser
     * @param array $roles
     * @return User
     */
    public function setRolesAction(User $theUser, array $roles): User
    {
        $current = $this->getUser();
        if ($current instanceof User && $theUser->getId() === $current->getId()) {
            $theUser->setRoles($roles);
            $manager = $this->getDoctrine()->getManagerForClass(User::class);
            $manager->flush();

            return $theUser;
        }
        throw new AccessDeniedHttpException('Access denied');
    }
}
