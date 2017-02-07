<?php
namespace Tx\Guide\Utility;

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

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Backend\Domain\Repository\Module\BackendModuleRepository;
use TYPO3\CMS\Core\Utility\ArrayUtility;
use TYPO3\CMS\Extbase\Service\TypoScriptService;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * GuideUtility
 *
 * @author Thomas Deuling <typo3@coding.ms>
 * @package TYPO3
 * @subpackage tx_guide
 */
class GuideUtility {

	/**
	 * @var \TYPO3\CMS\Extbase\Service\TypoScriptService
	 * @inject
	 */
	protected $typoScriptService;

	/**
	 * @var \TYPO3\CMS\Backend\Domain\Repository\Module\BackendModuleRepository
	 * @inject
	 */
	protected $backendModuleRepository;

	/**
	 * Get a list with available tours
	 * @return array
	 */
	public function getRegisteredGuideTours() {
		$backendUser = $this->getBackendUserAuthentication();
		$tours = $this->getBackendUserAuthentication()->getTSConfig(
			'mod.guide.tours', BackendUtility::getPagesTSconfig(0)
		);
		$toursUser = $this->getBackendUserAuthentication()->getTSConfig(
			'mod.guide.tours'
		);
		ArrayUtility::mergeRecursiveWithOverrule($tours, $toursUser);
		if(isset($tours['properties']) && !empty($tours['properties'])) {
			// Be sure the TypoScript service is available
			if (!($this->typoScriptService instanceof TypoScriptService)) {
				$this->typoScriptService = GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\Service\\TypoScriptService');
			}
			$tours = $this->typoScriptService->convertTypoScriptArrayToPlainArray($tours['properties']);
			// Translation handling
			if(!empty($tours)) {
				foreach($tours as $tourKey=>$tour) {
					if($tourKey=='ConfigurationExample') {
						unset($tours[$tourKey]);
						continue;
					}
					$tour['name'] = $tourKey;
					// Merge user configuration
					if(isset($backendUser->uc['moduleData']['guide'][$tour['name']])) {
						$tours[$tour['name']] = array_merge($tour, $backendUser->uc['moduleData']['guide'][$tour['name']]);
					}
					else {
						$tours[$tour['name']] = $tour;
					}
					// Be sure disabled is available
					if(!isset($tours[$tourKey]['disabled'])) {
						$tours[$tourKey]['disabled'] = FALSE;
					}
					// Translate title and description
					if(substr($tours[$tourKey]['title'], 0, 4) == 'LLL:') {
						$tours[$tourKey]['title'] = $this->getLanguageService()->sL($tours[$tourKey]['title']);
					}
					if(substr($tours[$tourKey]['description'], 0, 4) == 'LLL:') {
						$tours[$tourKey]['description'] = $this->getLanguageService()->sL($tours[$tourKey]['description']);
					}
					// Generate an id
					$tours[$tourKey]['id'] = GeneralUtility::camelCaseToLowerCaseUnderscored($tour['name']);
					$tours[$tourKey]['id'] = 'guide-tour-' . str_replace('_', '-', $tours[$tourKey]['id']);
					// Remove steps
					if(!isset($tours[$tourKey]['currentStepNo'])) {
						$tours[$tourKey]['currentStepNo'] = 0;
					}
					$tours[$tourKey]['stepsCount'] = count($tours[$tourKey]['steps']);
					unset($tours[$tourKey]['steps']);
					// Tour is enabled for current user
					$tours[$tourKey]['enabled'] = $this->moduleEnabled($tour['moduleName']);
					if(!$tours[$tourKey]['enabled']) {
						unset($tours[$tourKey]);
					}
				}
			}
		}
		else {
			$tours = array();
		}
		return $tours;
	}

	/**
	 * Passed module is enabled for current backend user?
	 * @param $moduleName
	 * @return bool
	 */
	public function moduleEnabled($moduleName) {
		$enabled = FALSE;
		$backendUser = $this->getBackendUserAuthentication();
		if($backendUser->isAdmin()) {
			$enabled = TRUE;
		}
		else if ($moduleName === 'core') {
			$enabled = TRUE;
		}
		else {
			if(!($this->backendModuleRepository instanceof BackendModuleRepository)) {
				$this->backendModuleRepository = GeneralUtility::makeInstance('TYPO3\\CMS\\Backend\\Domain\\Repository\\Module\\BackendModuleRepository');
			}
			$modules = $this->backendModuleRepository->loadAllowedModules();
			/** @var \TYPO3\CMS\Backend\Domain\Model\Module\BackendModule $module */
			foreach($modules as $module) {
				$children = $module->getChildren();
				if(!empty($children)) {
					/** @var \TYPO3\CMS\Backend\Domain\Model\Module\BackendModule $child */
					foreach($children as $child) {
						if($moduleName === $child->getName()) {
							$enabled = TRUE;
							break(2);
						}
					}
				}
			}
		}
		return $enabled;
	}
	
	/**
	 * Get a tour by name
	 * @param $tour
	 * @return array
	 */
	public function getRegisteredGuideTour($tour) {
		// Get all tours
		$tours = $this->getRegisteredGuideTours();
		// Get steps
		$tours[$tour]['steps'] = array();
		$steps = $this->getBackendUserAuthentication()->getTSConfig(
			'mod.guide.tours.' . $tour . '.steps', BackendUtility::getPagesTSconfig(0)
		);
		$stepsUser = $this->getBackendUserAuthentication()->getTSConfig(
			'mod.guide.tours.' . $tour . '.steps'
		);
		ArrayUtility::mergeRecursiveWithOverrule($steps, $stepsUser);
		if(isset($steps['properties']) && !empty($steps['properties'])) {
			// Be sure the TypoScript service is available
			if(!($this->typoScriptService instanceof TypoScriptService)) {
				$this->typoScriptService = GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\Service\\TypoScriptService');
			}
			$tours[$tour]['steps'] = $this->typoScriptService->convertTypoScriptArrayToPlainArray($steps['properties']);
			// Translation handling
			if(!empty($tours[$tour]['steps'])) {
				foreach($tours[$tour]['steps'] as $stepKey=>$step) {
					if(substr($tours[$tour]['steps'][$stepKey]['title'], 0, 4) == 'LLL:') {
						$tours[$tour]['steps'][$stepKey]['title'] = $this->getLanguageService()->sL($tours[$tour]['steps'][$stepKey]['title']);
					}
					if(substr($tours[$tour]['steps'][$stepKey]['content'], 0, 4) == 'LLL:') {
						$tours[$tour]['steps'][$stepKey]['content'] = $this->getLanguageService()->sL($tours[$tour]['steps'][$stepKey]['content']);
					}
					// Strip disallowed tags
					$allowedTags = '<p><i><u><b><br>';
					$tours[$tour]['steps'][$stepKey]['title'] = strip_tags($tours[$tour]['steps'][$stepKey]['title']);
					$tours[$tour]['steps'][$stepKey]['content'] = strip_tags($tours[$tour]['steps'][$stepKey]['content'], $allowedTags);
				}
			}
		}
		return $tours[$tour];
	}

	/**
	 * @todo: don't include anything, in case of the user confirmed that he won't restart the guide
	 */
	public function isGuidedTourActivated() {
		return TRUE;
	}

	/**
	 * Set a tour as disabled
	 * @param string $tourName Name of the guided tour
	 * @param bool $disabled Disabled true/false
	 * @return array
	 */
	public function setTourDisabled($tourName, $disabled=TRUE) {
		$backendUser = $this->getBackendUserAuthentication();
		if(!isset($backendUser->uc['moduleData']['guide'][$tourName])) {
			$backendUser->uc['moduleData']['guide'][$tourName] = array();
		}
		$backendUser->uc['moduleData']['guide'][$tourName]['disabled'] = $disabled;
		// Write back into user configuration
		$backendUser->writeUC($backendUser->uc);
		return $backendUser->uc['moduleData']['guide'][$tourName];
	}

	/**
	 * Write current step no of a tour
	 * @param string $tourName Name of the guided tour
	 * @param int $stepNo Number of the current step
	 * @return array
	 */
	public function setTourStepNo($tourName, $stepNo) {
		$backendUser = $this->getBackendUserAuthentication();
		if(!isset($backendUser->uc['moduleData']['guide'][$tourName])) {
			$backendUser->uc['moduleData']['guide'][$tourName] = array();
		}
		$backendUser->uc['moduleData']['guide'][$tourName]['currentStepNo'] = $stepNo;
		// Set already viewed
		$backendUser->uc['moduleData']['guide'][$tourName]['alreadyViewed'] = FALSE;
		$tour = $this->getRegisteredGuideTour($tourName);
		// Set step count
		if($tour['stepsCount'] == ($stepNo+1)) {
			$backendUser->uc['moduleData']['guide'][$tourName]['alreadyViewed'] = TRUE;
		}
		// Write back into user configuration
		$backendUser->writeUC($backendUser->uc);
		return $backendUser->uc['moduleData']['guide'][$tourName];
	}

	/**
	 * Check if a tour is registered
	 * @param string $tour Name of the guided tour
	 * @return bool
	 */
	public function tourExists($tour) {
		$tours = $this->getRegisteredGuideTours();
		return isset($tours[$tour]);
	}

	/**
	 * Get user configuration for guides
	 * @return array
	 */
	public function getUserConfiguration() {
		$backendUser = $this->getBackendUserAuthentication();
		return $backendUser->uc['moduleData']['guide'];
	}
	
	/**
	 * @return BackendUserAuthentication
	 */
	protected function getBackendUserAuthentication() {
		return $GLOBALS['BE_USER'];
	}

	/**
	 * @return \TYPO3\CMS\Lang\LanguageService
	 */
	protected function getLanguageService() {
		return $GLOBALS['LANG'];
	}
	
}