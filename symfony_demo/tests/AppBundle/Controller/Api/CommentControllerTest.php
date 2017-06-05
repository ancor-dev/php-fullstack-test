<?php

namespace Tests\AppBundle\Controller\Api;

use Draw\Bundle\DrawTestHelperBundle\Helper\WebTestCaseTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CommentControllerTest extends WebTestCase
{
    use WebTestCaseTrait;

    public function testListByPostAction()
    {
        $this->requestHelper()
            ->get('/api/comments/1')
            ->jsonHelper()
                ->propertyHelper('')->assertCount(5)->end()
                ->propertyHelper('[0].id')->assertInternalType('integer')->end()
                ->propertyHelper('[0].content')->assertInternalType('string')->end()
                ->propertyHelper('[0].author.id')->assertInternalType('integer')->end()
                ->propertyHelper('[0].author.username')->assertSame('john_user')->end()
                ->propertyHelper('[0].author.email')->assertSame('john_user@symfony.com')->end()
                ->executeAndJsonDecode();
    }
}