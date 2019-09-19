#
# Table structure for table 'pages'
#
CREATE TABLE pages (
	nav_icon int(11) unsigned DEFAULT '0' NOT NULL,
	nav_image int(11) unsigned DEFAULT '0' NOT NULL,
);


#
# Table structure for table 'tt_content'
#
CREATE TABLE tt_content (
	custom_header varchar(255) DEFAULT '' NOT NULL,
	custom_subheader varchar(255) DEFAULT '' NOT NULL,
	add_background tinyint(3) unsigned DEFAULT '0' NOT NULL,
	background_color_class varchar(60) DEFAULT '' NOT NULL,
	background_color varchar(255) DEFAULT '' NOT NULL,
	background int(11) unsigned DEFAULT '0' NOT NULL,
	background_parallax tinyint(3) unsigned DEFAULT '0' NOT NULL,
	full_width_background tinyint(3) unsigned DEFAULT '0' NOT NULL,
	content_alignment varchar(6) DEFAULT '' NOT NULL,
	content_alignment_center varchar(6) DEFAULT '' NOT NULL,
	link_title varchar(255) DEFAULT '' NOT NULL,
	link varchar(1024) DEFAULT '' NOT NULL,

	skipLinks_mainNavigation varchar(255) DEFAULT '' NOT NULL,
	skipLinks_mainContent varchar(255) DEFAULT '' NOT NULL,

	headerTop int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopContacts int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopLangMenu int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopSearch int(11) unsigned DEFAULT '0' NOT NULL,
	headerTopNavigation int(11) unsigned DEFAULT '0' NOT NULL,

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

	mainNavigation int(11) unsigned DEFAULT '0' NOT NULL,
	nav_height varchar(255) DEFAULT '' NOT NULL,
	nav_type varchar(255) DEFAULT '' NOT NULL,
	nav_dropdownColumns int(11) unsigned DEFAULT '0' NOT NULL,
	nav_dropdownLevel varchar(255) DEFAULT '' NOT NULL,
	nav_logo int(11) unsigned DEFAULT '0' NOT NULL,
	nav_langMenu int(11) unsigned DEFAULT '0' NOT NULL,
	nav_position varchar(255) DEFAULT '' NOT NULL,

	logo_width varchar(255) DEFAULT '' NOT NULL,
);
