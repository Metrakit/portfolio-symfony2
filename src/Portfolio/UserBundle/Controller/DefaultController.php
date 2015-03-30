<?php

namespace Portfolio\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('PortfolioUserBundle:Default:index.html.twig');
    }

    public function testAction()
    {
    	$users = array(
			array('name' => 'bob'),
			array('name' => 'chuck'),
    	);

        return $this->render('PortfolioUserBundle:Default:test.html.twig', 
        	array(
        		'users' => $users
        	)
        );
    }

}
