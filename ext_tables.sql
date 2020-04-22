#
# Table structure for table 'pages'
#
CREATE TABLE pages (
	nav_icon_source varchar(255) DEFAULT '' NOT NULL,
	nav_icon_class varchar(255) DEFAULT '' NOT NULL,
	nav_icon varchar(255) DEFAULT '' NOT NULL,
	nav_image int(11) unsigned DEFAULT '0' NOT NULL,
);


#
# Table structure for table 'tt_content'
#
CREATE TABLE tt_content (
	content_position varchar(60) DEFAULT '' NOT NULL,
	content_position_center varchar(60) DEFAULT '' NOT NULL,
	section_container_width varchar(60) DEFAULT '' NOT NULL,
	simple_image int(11) unsigned DEFAULT '0' NOT NULL,
	height mediumint(8) unsigned DEFAULT '0' NOT NULL,
	icon_source varchar(60) DEFAULT '' NOT NULL,
	icon_class varchar(60) DEFAULT '' NOT NULL,
	icon varchar(255) DEFAULT '' NOT NULL,
	link_title varchar(255) DEFAULT '' NOT NULL,
	link varchar(1024) DEFAULT '' NOT NULL,
	link_position varchar(60) DEFAULT '' NOT NULL,
	header_text text,
	subheader_text text,
	link_as_button tinyint(1) unsigned DEFAULT '0' NOT NULL,
	button_size varchar(60) DEFAULT '' NOT NULL,
	button_style varchar(60) DEFAULT '' NOT NULL,
	button_full_width tinyint(1) unsigned DEFAULT '0' NOT NULL,
	button_no_bg tinyint(1) unsigned DEFAULT '0' NOT NULL,


	add_background tinyint(3) unsigned DEFAULT '0' NOT NULL,
	background_color_class varchar(60) DEFAULT '' NOT NULL,
	background_color varchar(255) DEFAULT '' NOT NULL,
	background int(11) unsigned DEFAULT '0' NOT NULL,
	background_parallax tinyint(3) unsigned DEFAULT '0' NOT NULL,
	full_width_background tinyint(3) unsigned DEFAULT '0' NOT NULL,

	table_class varchar(255) DEFAULT '' NOT NULL,




	skipLinks_mainNavigation varchar(255) DEFAULT '' NOT NULL,
	skipLinks_mainContent varchar(255) DEFAULT '' NOT NULL,

	headerTop int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopContacts int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopLangMenu int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopSearch int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopNavigation int(11) unsigned DEFAULT '0' NOT NULL,

	footerTop int(11) unsigned DEFAULT '0' NOT NULL,
	footerMiddle int(11) unsigned DEFAULT '0' NOT NULL,
	footerMiddleFirstHeader varchar (255) DEFAULT '' NOT NULL,
	footerMiddleFirstLogo int(11) unsigned DEFAULT '0' NOT NULL,
	footerMiddleFirstText varchar (1024) DEFAULT '' NOT NULL,
	footerMiddleSecondHeader varchar (255) DEFAULT '' NOT NULL,
	footerMiddleSecondLinks text,
	footerMiddleThirdHeader varchar (255) DEFAULT '' NOT NULL,
	footerMiddleThirdLinks text,
	footerMiddleFourthHeader varchar (255) DEFAULT '' NOT NULL,
	footerMiddleFourthForm int(11) unsigned DEFAULT '0' NOT NULL,
	footerBottom int(11) unsigned DEFAULT '0' NOT NULL,
	footerBottomCopyright varchar (255) DEFAULT '' NOT NULL,
	footerBottomLinks varchar (255) DEFAULT '' NOT NULL,

	footerMiddleText varchar(255) DEFAULT '' NOT NULL,

	email_address varchar(255) DEFAULT '' NOT NULL,
	email_title varchar(255) DEFAULT '' NOT NULL,
	email_icon int(11) unsigned DEFAULT '0' NOT NULL,
	email_show_title int(11) unsigned DEFAULT '0' NOT NULL,

	phone_link varchar(255) DEFAULT '' NOT NULL,
	phone_text varchar(50) DEFAULT '' NOT NULL,
	phone_title varchar(255) DEFAULT '' NOT NULL,
	phone_icon int(11) unsigned DEFAULT '0' NOT NULL,
	phone_show_title int(11) unsigned DEFAULT '0' NOT NULL,


	headerMiddle int(11) unsigned DEFAULT '0' NOT NULL,
	headerMiddleLangMenu int(11) unsigned DEFAULT '0' NOT NULL,
	headerMiddleLogo int(11) unsigned DEFAULT '0' NOT NULL,
	headerMiddleSearch int(11) unsigned DEFAULT '0' NOT NULL,

	mainNavigation int(11) unsigned DEFAULT '0' NOT NULL,
	mainNavigationLangMenu int(11) unsigned DEFAULT '0' NOT NULL,
	mainNavigationLogo int(11) unsigned DEFAULT '0' NOT NULL,
	mainNavigationSearch int(11) unsigned DEFAULT '0' NOT NULL,
);


#
# Table structure for table 'sys_file_reference'
#
CREATE TABLE sys_file_reference (
	description_position varchar(60) DEFAULT '' NOT NULL,
	picture_width varchar(60) DEFAULT '' NOT NULL,
	picture_border_radius varchar(60) DEFAULT '' NOT NULL,
	aspect_ratio varchar(60) DEFAULT '' NOT NULL,
	img_thumbnail tinyint(3) unsigned DEFAULT '0' NOT NULL,
);
