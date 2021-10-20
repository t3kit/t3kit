#
# Table structure for table 'pages'
#
CREATE TABLE pages (
	nav_icon_source varchar(255) DEFAULT '' NOT NULL,
	nav_icon varchar(255) DEFAULT '' NOT NULL,
	nav_image int(11) unsigned DEFAULT '0' NOT NULL,
	hide_subpages_in_menu tinyint(1) unsigned DEFAULT '0' NOT NULL,
);


#
# Table structure for table 'tt_content'
#
CREATE TABLE tt_content (
	header_text text,
	header_style varchar(60) DEFAULT '0' NOT NULL,
	subheader_text text,
	subheader_style varchar(60) DEFAULT '0' NOT NULL,
	content_position varchar(60) DEFAULT '' NOT NULL,
	link_title varchar(255) DEFAULT '' NOT NULL,
	link varchar(1024) DEFAULT '' NOT NULL,
	link_position varchar(60) DEFAULT '' NOT NULL,
	accessible_link_label varchar(255) DEFAULT '' NOT NULL,
	link_as_button tinyint(1) unsigned DEFAULT '0' NOT NULL,
	button_size varchar(60) DEFAULT '' NOT NULL,
	button_style varchar(60) DEFAULT '' NOT NULL,
	button_full_width tinyint(1) unsigned DEFAULT '0' NOT NULL,
	button_no_bg tinyint(1) unsigned DEFAULT '0' NOT NULL,
	simple_image int(11) unsigned DEFAULT '0' NOT NULL,
	svg_image int(11) unsigned DEFAULT '0' NOT NULL,
	picture int(11) unsigned DEFAULT '0' NOT NULL,
	advanced_image int(11) unsigned DEFAULT '0' NOT NULL,
	advanced_media int(11) unsigned DEFAULT '0' NOT NULL,
	section_container_width varchar(60) DEFAULT '' NOT NULL,
	image_zoom_width varchar(60) DEFAULT '' NOT NULL,
	textorient varchar(60) DEFAULT '' NOT NULL,
	icon_source varchar(255) DEFAULT '' NOT NULL,
	icon varchar(255) DEFAULT '' NOT NULL,
	color_class varchar(60) DEFAULT '0' NOT NULL,
	background_color_class varchar(60) DEFAULT '0' NOT NULL,
	page_links_1 text,
	page_links_2 text,
	page_links_3 text,
	table_class varchar(255) DEFAULT '' NOT NULL,
	tx_t3kit_slider_item int(11) unsigned DEFAULT '0',
	tx_t3kit_accordion_item int(11) unsigned DEFAULT '0',
);

#
# Table structure for table 'tx_t3kit_slider_item'
#
CREATE TABLE tx_t3kit_slider_item (
	uid int(11) unsigned NOT NULL auto_increment,
	pid int(11) DEFAULT '0' NOT NULL,

	tt_content int(11) unsigned DEFAULT '0',
	header_text text,
	header_layout varchar(30) DEFAULT '0' NOT NULL,
	header_style varchar(60) DEFAULT '0' NOT NULL,
	header_position varchar(255) DEFAULT '' NOT NULL,
	header_link varchar(1024) DEFAULT '' NOT NULL,
	subheader_text text,
	subheader_style varchar(60) DEFAULT '0' NOT NULL,
	bodytext mediumtext,
	content_position varchar(60) DEFAULT '' NOT NULL,
	link_title varchar(255) DEFAULT '' NOT NULL,
	link varchar(1024) DEFAULT '' NOT NULL,
	link_position varchar(60) DEFAULT '' NOT NULL,
	accessible_link_label varchar(255) DEFAULT '' NOT NULL,
	link_as_button tinyint(1) unsigned DEFAULT '0' NOT NULL,
	button_size varchar(60) DEFAULT '' NOT NULL,
	button_style varchar(60) DEFAULT '' NOT NULL,
	button_full_width tinyint(1) unsigned DEFAULT '0' NOT NULL,
	button_no_bg tinyint(1) unsigned DEFAULT '0' NOT NULL,
	picture int(11) unsigned DEFAULT '0' NOT NULL,
	overlay varchar(60) DEFAULT '' NOT NULL,
	caption_alignment varchar(60) DEFAULT '' NOT NULL,

	sys_language_uid int(11) DEFAULT '0' NOT NULL,
	l10n_parent int(11) unsigned DEFAULT '0' NOT NULL,
	l10n_diffsource mediumblob NULL,

	PRIMARY KEY (uid),
	KEY parent (pid,sorting),
	KEY t3ver_oid (t3ver_oid,t3ver_wsid),
	KEY language (l10n_parent,sys_language_uid)
);

#
# Table structure for table 'tx_t3kit_accordion_item'
#
CREATE TABLE tx_t3kit_accordion_item (
	uid int(11) unsigned NOT NULL auto_increment,
	pid int(11) DEFAULT '0' NOT NULL,

	tt_content int(11) unsigned DEFAULT '0',
	header_text text,
	header_layout varchar(30) DEFAULT '0' NOT NULL,
	bodytext mediumtext,
	picture int(11) unsigned DEFAULT '0' NOT NULL,
	media int(11) unsigned DEFAULT '0' NOT NULL,
	file_collections text,
	filelink_size tinyint(3) unsigned DEFAULT '0' NOT NULL,
	filelink_sorting varchar(64) DEFAULT '' NOT NULL,
	filelink_sorting_direction varchar(4) DEFAULT '' NOT NULL,
	target varchar(30) DEFAULT '' NOT NULL,
	uploads_description tinyint(1) unsigned DEFAULT '0' NOT NULL,
	uploads_type tinyint(3) unsigned DEFAULT '0' NOT NULL,

	sys_language_uid int(11) DEFAULT '0' NOT NULL,
	l10n_parent int(11) unsigned DEFAULT '0' NOT NULL,
	l10n_diffsource mediumblob NULL,

	PRIMARY KEY (uid),
	KEY parent (pid,sorting),
	KEY t3ver_oid (t3ver_oid,t3ver_wsid),
	KEY language (l10n_parent,sys_language_uid)
);

#
# Table structure for table 'sys_file_reference'
#
CREATE TABLE sys_file_reference (
	description_position varchar(60) DEFAULT '' NOT NULL,
	picture_width varchar(60) DEFAULT '' NOT NULL,
	picture_border_radius varchar(60) DEFAULT '' NOT NULL,
	aspect_ratio varchar(60) DEFAULT '' NOT NULL,
	svg_width mediumint(8) unsigned DEFAULT '0' NOT NULL,
);
