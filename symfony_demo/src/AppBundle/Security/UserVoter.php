<?php

namespace AppBundle\Security;

use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class UserVoter extends Voter
{
    const EDIT = 'edit';

    protected function supports($attribute, $subject)
    {

        return $subject instanceof User && in_array($attribute, [self::EDIT]);
    }

    protected function voteOnAttribute($attribute, $user, TokenInterface $token)
    {
        $currentUser = $token->getUser();

        if (!$currentUser instanceof User) {
            return false;
        }

        return $currentUser === $user;
    }
}
