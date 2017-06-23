<?php

namespace Tests\AppBundle\Controller\Api;

use Draw\Bundle\DrawTestHelperBundle\Helper\WebTestCaseTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PostControllerTest extends WebTestCase
{
    use WebTestCaseTrait;

    public function testListAction()
    {
        $this->requestHelper()
            ->get('/api/v1/posts')
            ->jsonHelper()
                ->propertyHelper('total_items')->assertSame(30)->end()
                ->propertyHelper('total_pages')->assertSame(3)->end()
                ->propertyHelper('items')->assertCount(10)->end()

                ->propertyHelper('items[0].id')->assertInternalType('integer')->end()
                ->propertyHelper('items[0].content')->assertInternalType('string')->end()
                ->propertyHelper('items[0].published_at')->assertSame('2017-01-11T22:20:12+0000')->end()
                ->propertyHelper('items[0].author.id')->assertInternalType('integer')->end()
                ->propertyHelper('items[0].author.username')->assertSame('anna_admin')->end()
                ->propertyHelper('items[0].author.email')->assertSame('anna_admin@symfony.com')->end()
                ->executeAndJsonDecode();
    }

    public function testListActionOptimization()
    {
        $this->requestHelper()
            ->get('/api/v1/posts')
            // This request can be optimized to 2 or 1 sql request, if we will not use PagerFanta
            ->sqlHelper(3)->end()
            ->jsonHelper()
                ->propertyHelper('items')->assertCount(10)->end()
                ->executeAndJsonDecode();
    }
}