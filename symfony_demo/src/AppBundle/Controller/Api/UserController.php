<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as FOS;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

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
     *
     * @FOS\RequestParam(name="roles")
     *
     * PHP#7: Fixed by Security annotation. In real-life project ApiUserVoter can be done in order to
     * check current user id against actual {id} parameter value from any route prefixed by '/users'
     * (assuming we have RESTful api and all user-related resources are built under such prefix)
     *
     * @Security("user.getId() == subjectUser.getId()")
     *
     * @return \AppBundle\Entity\User
     */
    public function setRolesAction(User $subjectUser, array $roles)
    {
        $subjectUser->setRoles($roles);

        $manager = $this->getDoctrine()->getManagerForClass(User::class);

        $manager->flush();

        return $subjectUser;
    }
}
