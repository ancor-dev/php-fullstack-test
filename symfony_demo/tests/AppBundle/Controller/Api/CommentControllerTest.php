<?php

namespace Tests\AppBundle\Controller\Api;

use Draw\Bundle\DrawTestHelperBundle\Helper\WebTestCaseTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CommentControllerTest extends WebTestCase
{
    use WebTestCaseTrait;

    public function testGetComments()
    {
        $this->requestHelper()
            ->get('/api/posts/1/comments')
            ->jsonHelper()
            ->propertyHelper('[0].id')->assertInternalType('integer')->end()
            ->propertyHelper('[0].content')->assertInternalType('string')->end()
            ->propertyHelper('[0].published_at')->assertSame('2017-01-12T22:20:14+00:00')->end()
            ->propertyHelper('[0].author.id')->assertInternalType('integer')->end()
            ->propertyHelper('[0].author.username')->assertSame('john_user')->end()
            ->propertyHelper('[0].author.email')->assertSame('john_user@symfony.com')->end()
            ->executeAndJsonDecode();
    }
}