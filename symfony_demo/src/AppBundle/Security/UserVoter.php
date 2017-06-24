<?php

namespace AppBundle\Security;

use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

/**
 * It grants or denies permissions for actions related to user (such as editing, changing roles).
 */
class UserVoter extends Voter
{
    const EDIT_ROLES = 'edit-roles';

    /**
     * {@inheritdoc}
     */
    protected function supports($attribute, $subject): bool
    {
        // this voter is only executed for three specific permissions on Post objects
        return $subject instanceof User
            && in_array($attribute, [ static::EDIT_ROLES ]);
    }

    /**
     * {@inheritdoc}
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token): bool
    {
        /** @var User $subject */

        $currentUser = $token->getUser();

        // the user must be logged in; if not, deny permission
        if (!$currentUser instanceof User) {
            return false;
        }

        return $currentUser === $subject;
    } // end voteOnAttribute()
}
