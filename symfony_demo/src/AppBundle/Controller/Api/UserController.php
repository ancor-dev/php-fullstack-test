<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class UserController extends Controller
{
    /**
     * @FOS\Get("/api/users/{id}")
     *
     * @return \AppBundle\Entity\User
     */
    public function getAction(User $user)
    {
        return $user;
    }

    /**
     * @FOS\Get("/api/users")
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
     * @FOS\Put("/api/users/{id}/roles")
     *
     * @FOS\RequestParam(name="roles")
     *
     * @return \AppBundle\Entity\User
     */
    public function setRolesAction(User $theUser, array $roles)
    {
        if ($this->getUser() != $theUser) {
            throw new AccessDeniedException;
        }

        $theUser->setRoles($roles);

        $manager = $this->getDoctrine()->getManagerForClass(User::class);

        $manager->flush();

        return $theUser;
    }
}