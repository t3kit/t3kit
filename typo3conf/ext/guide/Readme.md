# Guided tours for TYPO3
The guided tour extension ([EXT:guide](https://typo3.org/extensions/repository/view/guide)) for TYPO3 provides you the ability for creating guided tours through the TYPO3 backend. These
tours should give editors an introduction of different areas and features, so that he easily finds out who to use TYPO3.

The different guided tours are configured by page TypoScript (tsconfig). Translation values are provided as usually by 
XLIFF files.

Developers of third party extensions have the ability to provide own guided tours for their backend modules.

## Backend module
The guided tour extension comes with an own backend module, which you will find in the *help menu* in the *topbar* of
the TYPO3 backend. It will list you all (for your current user accessible) guided tours. You're able to start each tour
or resume tours which you have started once. Additionally you're able to reactivate tours, that you had marked as *Don't 
show again*.


Let's take a look at how the guided tours work in detail and how you're able to modify existing tours or
create your own.

## Definition of a guided tour

All tours must defined in the page TypoScript node `mod.guide.tours`. A definition of a tour for the *View* module would
be like this:

```
mod.guide.tours.ViewModule {
	# here comes your guided tour configuration
}
```

>	The main node of a tour is the internal name as well.
>	This name should be a simple upper-camel-cased string.

Within this tour node we need some required nodes, which can be defined like this:

```
mod.guide.tours.ViewModule {
	# The title of the tour. This title will be displayed in the backend module.
	# Enter simply some text or use a LLL identifier.
	title = LLL:EXT:guide/Resources/Private/Language/locallang_TourViewModule.xlf:tx_guide_tour.title
	# Description of the tour. This description will be displayed in the backend module.
	# Enter simply some text or use a LLL identifier.
	description = LLL:EXT:guide/Resources/Private/Language/locallang_TourViewModule.xlf:tx_guide_tour.description
	# Internal name of the module.
	# This is the same identifier like the module key (M parameter in backend links)
	# The moduleName core is used for tours, which are execute in top frame.
	# Examples:
	# - Page module: web_layout (a tour which is executed in page module)
	# - View module: web_ViewpageView (a tour which is executed in view module)
	moduleName = core
	# Icon identifier for the icon in backend module.
	# The icon identifier has to be registered in the icon registry.
	iconIdentifier = module-guide-tour-core
	# In the steps node you have insert a node for each popover you want to display.
	steps {
		# The key of the steps must be numeric and defines the order of displaying the popover
		10 {
			# ...
		}
		20 {
			# ...
		}
	}
```

### Step configuration
Each *step* node can be configured like this:

```
# The selector is passed to jQuery for selecting the HTML-Element, on which the popover should be placed.
# This selector must be unique in DOM. A selector can also be a unique data attribute/value.
# Examples:
# selector = #some-id
# selector = .some-unique-class
# selector = .some-multiple-used-class:first
# selector = select[name=\'WebFuncJumpMenu\']:first
# selector = [data-identifier='apps-toolbar-menu-shortcut']
selector = .typo3-aboutmodules-inner-docbody
# This is the title of the popover.
# Enter simply some text or a LLL identifier like:
# title = LLL:EXT:guide/Resources/Private/Language/BootstrapTourPageModule.xlf:tx_guide_tour.0.title
title = Welcome to TYPO3 backend
# This is the content of the popover.
# Enter simply some text or a LLL identifier like:
# title = LLL:EXT:guide/Resources/Private/Language/BootstrapTourPageModule.xlf:tx_guide_tour.0.content
# You're also be able to use HTML tags like i, u, b, br or p. All other tags are disallowed.
content (
 This tour will show you the first steps within TYPO3.<br />
 You're starting here in the <i>about</i> module, which shows you your available modules. 
 This modules are related on the giving user authorisation.<br />
 <br />
 Click on <i>Next</i> for an introduction of the topbar of TYPO3.<br />
 <br />
 <i>(You can restart each tour by the guided tours module.)</i>
)
# Defines the position of the popover.
# Possible values are: top, bottom, left, right
placement = top
# Disables the arrow on popover.
# The arrow is displayed by default.
showArrow = false
#
# The following nodes can be used for executing some actions during the tour. 
#
# The next node contains actions, which are triggered by clicking the next button
next {
	# More information below...
}
# The show node contains actions, which are triggered by starting to show this step
show {
	# More information below...
}
# The shown node contains actions, which are triggered by finishing to show this step
shown {
	# More information below...
}
# The hide node contains actions, which are triggered by hiding a step
hide {
	# More information below...
}
```

### The next node
The *next* node contains actions, which are triggered by clicking the next button. So you're able to trigger another tour
in the last popover, just by clicking the next button.

```
# By clicking on next, the tour Topbar is triggered
tour = Topbar
# The number/id of the step, which should be displayed of the called tour
step = 0

```

### The show node
The *show* node contains actions, which are triggered by starting to show this step. This means in detail, the action is
executed **before** the tour starts the displaying process.
With help of this node you're able to execute actions, like adding or removing a CSS class to an element or open select 
boxes in order to show specific values.
```
# Renames the label of the next button of the popover.
# This is useful, when you're starting another tour by clicking the next button.
renameNextButton = Start next tour
# Add a class on an element. This is useful, when you want to highlight a special element.
addClass {
	# jQuery selector for identifying elements, which should get the class. 
	selector = #typo3-cms-backend-backend-toolbaritems-usertoolbaritem
	# Class to be added
	# Attention: Because of an focus issue, opening a dropdown 
	# by adding the class open is only working with event shown.
	class = open
}
# Removes a class from an element.
removeClass {
	# jQuery selector for identifying elements, which should lose the class
	selector = #typo3-cms-backend-backend-toolbaritems-usertoolbaritem
	# Class to be remove
	class = open
}
# Opens a select box by jQuery selector
openSelectBox {
	selector = select[name=\'WebFuncJumpMenu\']:first
}
```

### The shown node
The *shown* node contains actions, which are triggered by finishing to show this step. This means in detail, the action is
executed **after** the popover is completely visible. The available actions in this nodes are equal to the *show* node.

### The hide node
The *hide* node contains actions, which are triggered by hiding a step. The available actions in this nodes are equal to 
the *show* node.


## Modify existing tours or create your own
Since guided tours are defined by simple page TypoScript (tsconfig), the modifying of an existing tour or creating a new
tour can be done in different ways.

*	If you want to provide a tour with your own extension or extension-theme, just create a page TypoScript file in your favorite location,
	for example in `EXT:your_ext/Configuration/PageTS/GuidedTour.pagets`. This file needs to be included by your
	`ext_localconf.php`:
	
	```
	<?php
	if (!defined('TYPO3_MODE')) {
		die('Access denied.');
	}
	if (TYPO3_MODE === 'BE') {
		// Add page typoscript tours
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
			'<INCLUDE_TYPOSCRIPT: source="FILE:EXT:' . $_EXTKEY . '/Configuration/PageTS/GuidedTour.pagets">'
		);
	}
	```
	
	These configuration file contains all your modifications of a existing tour or a definition of a new guided tour.
*	If you don't have an own extension, you are able to modify a tour by user TypoScript. You can do this by adding the
	changes directly within the respective user or, if you want to change tours for multiple users, within a backend
	user group - so you're able to assign the same tours/tour modifications to multiple users.

### Modification example
For example, if you want the second popover of the *ViewModule* tour append on the *right* instead of the *bottom*,
you would insert a TypoScript like that:

```
mod.guide.tours.ViewModule {
	steps.20.placement = right
}
```

In the same way you're able to provide new definedguided tours.	