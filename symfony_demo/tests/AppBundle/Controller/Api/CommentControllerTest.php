<?php

namespace Tests\AppBundle\Controller\Api;

use Draw\Bundle\DrawTestHelperBundle\Helper\WebTestCaseTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CommentControllerTest extends WebTestCase
{
    const BASE_URL = '/api/v1/';
    use WebTestCaseTrait;

    public function testListAction()
    {
        $this->requestHelper()
            ->get(static::BASE_URL . 'posts/1/comments')
            ->jsonHelper()
                ->propertyHelper('total_items')->assertSame(6)->end()
                ->propertyHelper('total_pages')->assertSame(1)->end()
                ->propertyHelper('items')->assertCount(6)->end()

                ->propertyHelper('items[0].id')->assertInternalType('integer')->end()
                ->propertyHelper('items[0].content')->assertInternalType('string')->end()
                ->propertyHelper('items[0].published_at')->assertSame('2017-01-12T23:08:50+0000')->end()
                ->propertyHelper('items[0].author.id')->assertInternalType('integer')->end()
                ->executeAndJsonDecode();
    }

    public function testListActionOptimization()
    {
        $this->requestHelper()
            ->get(static::BASE_URL . 'posts/1/comments')
            // @todo: optimization query count
            ->sqlHelper(4)->end()
            ->jsonHelper()
                ->propertyHelper('items')->assertCount(6)->end()
                ->executeAndJsonDecode();
    }
}