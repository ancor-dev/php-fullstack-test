<?php

namespace Tests\AppBundle\Controller\Api;

use Draw\Bundle\DrawTestHelperBundle\Helper\WebTestCaseTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class CommentControllerTest extends WebTestCase
{
    use WebTestCaseTrait;

    public function testPostCommentListAction()
    {
        $this->requestHelper()
            ->get('/api/comment/1')
            ->jsonHelper()
                ->propertyHelper('')->assertCount(5)->end()
                ->executeAndJsonDecode();
    }
}