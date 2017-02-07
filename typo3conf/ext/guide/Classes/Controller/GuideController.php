<?php
namespace Tx\Guide\Controller;

/***************************************************************
 *
 *  Copyright notice
 *
 *  (c) 2014 TYPO3 CMS Team
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
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

use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * GuideController
 *
 * @author Thomas Deuling <typo3@coding.ms>
 * @package TYPO3
 * @subpackage tx_guide
 */
class GuideController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController {

	/**
	 * @var \Tx\Guide\Utility\GuideUtility
	 * @inject
	 */
	protected $guideUtility;
	
	/**
	 * List available tours in backend module
	 *
	 * @return void
	 */
	public function listAction() {
		$this->view->assign('userConfiguration', $this->guideUtility->getUserConfiguration());
		$this->view->assign('tours', $this->guideUtility->getRegisteredGuideTours());
	}
	
	/**
	 * Renders the menu so that it can be returned as response to an AJAX call
	 *
	 * @param array $params Array of parameters from the AJAX interface, currently unused
	 * @param \TYPO3\CMS\Core\Http\AjaxRequestHandler $ajaxObj Object of type AjaxRequestHandler
	 * @return void
	 */
	public function ajaxRequest($params = array(), \TYPO3\CMS\Core\Http\AjaxRequestHandler &$ajaxObj = NULL) {
		$stepNo = (int)GeneralUtility::_GP('stepNo');
		$tour = GeneralUtility::_GP('tour');
		$cmd = GeneralUtility::_GP('cmd');
		$startTourAfterLoading = (GeneralUtility::_GP('startTourAfterLoading')=='true') ? 'true' : 'false';
		// Be sure the utility is available
		if(!($this->guideUtility instanceof \Tx\Guide\Utility\GuideUtility)) {
			$this->guideUtility = GeneralUtility::makeInstance('Tx\Guide\Utility\GuideUtility');
		}
		// Process command
		$result = array();
		switch ($cmd) {
			case 'disableTour':
				if($this->guideUtility->tourExists($tour)) {
					$result['uc'] = $this->guideUtility->setTourDisabled($tour);
					$result['cmd'][$cmd]['tour'] = $tour;
					$result['tour'] = $this->guideUtility->getRegisteredGuideTour($tour);
				}
				break;
			case 'enableTour':
				if($this->guideUtility->tourExists($tour)) {
					$result['uc'] = $this->guideUtility->setTourDisabled($tour, FALSE);
					$result['cmd'][$cmd]['tour'] = $tour;
					$result['tour'] = $this->guideUtility->getRegisteredGuideTour($tour);
				}
				break;
			case 'setStepNo':
				if($this->guideUtility->tourExists($tour)) {
					$result['uc'] = $this->guideUtility->setTourStepNo($tour, $stepNo);
					$result['cmd'][$cmd]['tour'] = $tour;
					$result['cmd'][$cmd]['stepNo'] = $stepNo;
					$result['tour'] = $this->guideUtility->getRegisteredGuideTour($tour);
				}
				break;
			case 'getTour':
				if($this->guideUtility->tourExists($tour)) {
					$result['cmd'][$cmd]['tour'] = $tour;
					$result['cmd'][$cmd]['startTourAfterLoading'] = $startTourAfterLoading;
					$result['tour'] = $this->guideUtility->getRegisteredGuideTour($tour);
				}
				break;
			case 'getTours':
				$result['cmd'][$cmd] = array();
				$result['tours'] = $this->guideUtility->getRegisteredGuideTours();
				break;
		}
		$ajaxObj->addContent('result', json_encode($result));
	}
	
}