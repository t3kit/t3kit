/**
 * TYPO3 Guided tour controller
 */
define(['jquery', 'TYPO3/CMS/Guide/BootstrapTourParser', 'TYPO3/CMS/Guide/Logger',  'TYPO3/CMS/Lang/Lang'], function (jQuery, BootstrapTourParser, Logger) {

	// Init the Guide Container
	top.TYPO3.Guide = top.TYPO3.Guide || {};
	top.TYPO3.Guide.Tours = top.TYPO3.Guide.Tours || {};
	top.TYPO3.Guide.callStepNo = top.TYPO3.Guide.callStepNo || null;

	/**
	 * Default template for each steps
	 * @type {string}
	 */
	top.TYPO3.Guide.getTemplate = function() {
		return '<div class="popover tour">'
			+ '<div class="arrow"></div>'
			+ '<h3 class="popover-title"></h3>'
			+ '<div class="popover-content"></div>'
			+ '<div class="popover-navigation">'
			+ '<button class="btn btn-default btn-sm" data-role="prev" id="popover-button-prev">« ' + TYPO3.lang['tx_guide_tour.previous'] + '</button>'
			+ '<span data-role="separator" class="separator"></span>'
			+ '<button class="btn btn-default btn-sm btn-success" data-role="next" id="popover-button-next">' + TYPO3.lang['tx_guide_tour.next'] + ' »</button>'
			+ '<button class="btn btn-default btn-sm btn-danger" data-role="end" id="popover-button-end-tour">' + TYPO3.lang['tx_guide_tour.end_tour'] + '</button>'
			+ '<span data-role="separator" class="separator separator-right"></span>'
			+ '<button class="btn btn-default btn-sm" data-role="tour-overview" id="popover-button-tour-overview" onclick="top.TYPO3.Guide.openGuideModule();return false">' + TYPO3.lang['tx_guide_tour.tour_overview'] + '</button>'
			+ '<p class="dont-show-again"><label for="popover-dont-show-again"><input type="checkbox" data-role="show-again" id="popover-dont-show-again"> ' + TYPO3.lang['tx_guide_tour.show_again'] + '</label></p>'
			+ '</div>'
			+ '</div>';
	};

	top.TYPO3.Guide.enableTour = function (tourName) {
		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'enableTour',
				tour: tourName
			},
			success: function (result) {
				if(typeof(result.cmd.enableTour) != 'undefined') {
					// Switch buttons in backend module
					var guideTourItem = jQuery('#' + result.tour.id);
					jQuery('.guide-tour-enable', guideTourItem).addClass('hidden');
					jQuery('.guide-tour-disable', guideTourItem).removeClass('hidden');
				}
			}
		});
	};
	top.TYPO3.Guide.disableTour = function (tourName) {
		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'disableTour',
				tour: tourName
			},
			success: function (result) {
				if(typeof(result.cmd.disableTour) != 'undefined') {
					// Switch buttons in backend module
					var guideTourItem = jQuery('#' + result.tour.id);
					jQuery('.guide-tour-enable', guideTourItem).removeClass('hidden');
					jQuery('.guide-tour-disable', guideTourItem).addClass('hidden');

				}
			}
		});
	};
	top.TYPO3.Guide.getTour = function (tourName) {
		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'getTour',
				tour: tourName
			},
			success: function (result) {
				Logger.log(result);
			}
		});
	};

	/**
	 * Starts the given tour
	 * @param tourName
	 * @param jumpToPage
	 */
	top.TYPO3.Guide.startTour = function (tourName) {
		if(!top.TYPO3.Guide.TourData[tourName].disabled) {
			if(top.TYPO3.Guide.jumpToModuleIfRequired(top.TYPO3.Guide.TourData[tourName].moduleName)) {
				return;
			}
			Logger.log('startTour: ', tourName);
			if(typeof(top.TYPO3.Guide.Tours[tourName]) !== 'undefined') {
				var tempTour = top.TYPO3.Guide.Tours[tourName];
				tempTour.start(true);
				top.TYPO3.Guide.currentTourName = tourName;
				if(tempTour.getCurrentStep()>0) {
					tempTour.goTo(0);
				}
			}
			else {
				Logger.error('startTour: ', tourName, ' tour not found');
			}
		}
		else {
			Logger.error('cant startTour ', tourName, ' because it may be disabled');
		}
	};

	top.TYPO3.Guide.startTourWithStep = function(tourName, stepId) {
		if(!top.TYPO3.Guide.TourData[tourName].disabled) {
			top.TYPO3.Guide.callStepNo = stepId;
			if(top.TYPO3.Guide.jumpToModuleIfRequired(top.TYPO3.Guide.TourData[tourName].moduleName)) {
				return;
			}
			Logger.log('startTourWithStep: ', tourName, 'at step ', stepId);
			if(typeof(top.TYPO3.Guide.Tours[tourName]) !== 'undefined') {
				top.TYPO3.Guide.Tours[tourName].start(true);
				top.TYPO3.Guide.callStepNo = null;
				top.TYPO3.Guide.currentTourName = tourName;
				if(stepId>0) {
					top.TYPO3.Guide.Tours[tourName].goTo(stepId);
				}
			}
			else {
				Logger.error('startTourWithStep: ', tourName, ' tour not found');
			}
		}
		else {
			Logger.error('cant startTourWithStep ', tourName, ' because it may be disabled');
		}
	};

	/**
	 * Loads a module in content frame if required
	 * @param moduleName
	 */
	top.TYPO3.Guide.jumpToModuleIfRequired = function (moduleName) {
		// Executed within a frame?
		if(window.top !== window.self && moduleName !== 'core') {

			var currentModuleId = top.TYPO3.Guide.getUrlParameterByName('M', window.location.href);
			if(moduleName !== currentModuleId) {
				top.goToModule(moduleName);
				return true;
			}
		}
		return false;
	};

	/**
	 * Get an url parameter by name
	 * @param name
	 * @param url
	 * @returns {*}
	 */
	top.TYPO3.Guide.getUrlParameterByName = function(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	top.TYPO3.Guide.openGuideModule = function () {
		top.TYPO3.Guide.Tours[top.TYPO3.Guide.currentTourName].end();
		top.goToModule('help_GuideGuide');
	};

	top.TYPO3.Guide.loadTour = function(tourName, startTourAfterLoading) {
		return jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'getTour',
				startTourAfterLoading: startTourAfterLoading,
				tour: tourName
			},
			success: function (result) {
				/**
				 * @todo Always initialize tours because of a bug
				 */
				if(typeof result.tour !== "undefined") {// && typeof top.TYPO3.Guide.Tours[tourName] === "undefined") {

					// Parse and init!
					top.TYPO3.Guide.Tours[result.tour.name] = new BootstrapTourParser().parseTour(result.tour);
					top.TYPO3.Guide.Tours[result.tour.name].init();
					
					Logger.log('loadTour success: ', result);
					// Start tour after loading
					if(result.cmd.getTour.startTourAfterLoading === 'true') {
						Logger.log('loadTour success: start -> ', result.tour.name);
						var stepNo = top.TYPO3.Guide.callStepNo;
						top.TYPO3.Guide.callStepNo = null;
						if(stepNo !== null) {
							top.TYPO3.Guide.startTourWithStep(result.tour.name, stepNo);
						} else {
							top.TYPO3.Guide.startTour(result.tour.name);
						}

					}
				}
			},
			error: function (result) {

			}
		});
	};


	top.TYPO3.Guide.getTourNameByModuleName = function() {
		jQuery.each(top.TYPO3.Guide.TourData, function(tourName, tour) {
			if(tour.moduleName == top.TYPO3.Guide.currentModule) {
				top.TYPO3.Guide.currentTourName = tourName;
			}
		});
	};
	
	return function() {
		Logger.log("Start up guided tour");
		// Bind button events
		var onclickEnableTour = jQuery('a[data-onclick=\'enableTour\']');
		if(onclickEnableTour.length>0) {
			onclickEnableTour.on('click', function() {
				top.TYPO3.Guide.enableTour(jQuery(this).data('tour'));
				return false;
			});
		}
		var onclickDisableTour = jQuery('a[data-onclick=\'disableTour\']');
		if(onclickDisableTour.length>0) {
			onclickDisableTour.on('click', function() {
				top.TYPO3.Guide.disableTour(jQuery(this).data('tour'));
				return false;
			});
		}
		var onclickStartTour = jQuery('a[data-onclick=\'startTour\']');
		if(onclickStartTour.length>0) {
			onclickStartTour.on('click', function() {
				var stepNo = parseInt(jQuery(this).data('step-no'), 10);
				var tour = jQuery(this).data('tour');
				if(stepNo>0) {
					top.TYPO3.Guide.startTourWithStep(tour, stepNo);
				}
				else {
					top.TYPO3.Guide.startTour(tour);
				}
				return false;
			});
		}
		// Executed within a frame?
		var inFrame = false;
		if(window.top !== window.self) {
			inFrame = true;
		}
		// Get module identifier
		var currentModuleId = top.TYPO3.Guide.getUrlParameterByName('M', window.location.href);
		var isLoggedIn =  top.TYPO3.Guide.getUrlParameterByName('token', window.location.href) !== null || currentModuleId !== null;
		// Logged in and in top frame
		if(isLoggedIn && !inFrame) {
			// Get all tours
			jQuery.ajax({
				dataType: 'json',
				url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
				data:  {
					cmd: 'getTours'
				},
				success: function (result) {
					// Get tours
					top.TYPO3.Guide.TourData = result.tours;
					// Init core tours
					if(typeof(top.TYPO3.Guide.TourData['Tree']) !== 'undefined') {
						top.TYPO3.Guide.loadTour('Tree', false);
					}
					if(typeof(top.TYPO3.Guide.TourData['Menu']) !== 'undefined') {
						top.TYPO3.Guide.loadTour('Menu', false);
					}
					if(typeof(top.TYPO3.Guide.TourData['Topbar']) !== 'undefined') {
						top.TYPO3.Guide.loadTour('Topbar', false);
					}
				}
			});
		}
		// Init frame tours
		if(inFrame) {
			// Current identifier
			top.TYPO3.Guide.currentModule = currentModuleId;
			top.TYPO3.Guide.currentTourName = '';
			if(typeof(top.TYPO3.Guide.TourData) !== 'undefined') {
				Logger.log('frame: tourdata is available', top.TYPO3.Guide.TourData);
				top.TYPO3.Guide.getTourNameByModuleName();
				Logger.log('currentModule: ', top.TYPO3.Guide.currentModule);
				Logger.log('currentTourName: ', top.TYPO3.Guide.currentTourName);
				/**
				 * @todo Always initialize tours because of a bug
				 */
				top.TYPO3.Guide.loadTour(top.TYPO3.Guide.currentTourName, true);
				if(typeof(top.TYPO3.Guide.Tours[top.TYPO3.Guide.currentTourName]) === 'undefined') {
					Logger.log('frame: tour ' + top.TYPO3.Guide.currentTourName + ' is not available -> load');
				//	top.TYPO3.Guide.loadTour(top.TYPO3.Guide.currentTourName, true);
				}
				else {
					Logger.log('frame: tour ' + top.TYPO3.Guide.currentTourName + ' is available -> start');
				//	top.TYPO3.Guide.startTour(top.TYPO3.Guide.currentTourName);
				}
			}
			else {
				Logger.error('frame: tourdata is not available');
			}
		}
	}();

});