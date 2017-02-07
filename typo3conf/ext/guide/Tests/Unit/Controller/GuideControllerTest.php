<?php
namespace Tx\Guide\Tests\Unit\Controller;
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2014 TYPO3 CMS Team 
 *  			
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 * Test case for class Tx\Guide\Controller\GuideController.
 *
 * @author TYPO3 CMS Team 
 */
class GuideControllerTest extends \TYPO3\CMS\Core\Tests\UnitTestCase {

	/**
	 * @var \Tx\Guide\Controller\GuideController
	 */
	protected $subject = NULL;

	protected function setUp() {
		$this->subject = $this->getMock('Tx\\Guide\\Controller\\GuideController', array('redirect', 'forward', 'addFlashMessage'), array(), '', FALSE);
	}

	protected function tearDown() {
		unset($this->subject);
	}

	/**
	 * @test
	 */
	public function listActionFetchesAllGuidesFromRepositoryAndAssignsThemToView() {

		$allGuides = $this->getMock('TYPO3\\CMS\\Extbase\\Persistence\\ObjectStorage', array(), array(), '', FALSE);

		$guideRepository = $this->getMock('Tx\\Guide\\Domain\\Repository\\GuideRepository', array('findAll'), array(), '', FALSE);
		$guideRepository->expects($this->once())->method('findAll')->will($this->returnValue($allGuides));
		$this->inject($this->subject, 'guideRepository', $guideRepository);

		$view = $this->getMock('TYPO3\\CMS\\Extbase\\Mvc\\View\\ViewInterface');
		$view->expects($this->once())->method('assign')->with('guides', $allGuides);
		$this->inject($this->subject, 'view', $view);

		$this->subject->listAction();
	}
}
