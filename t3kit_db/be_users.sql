-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: t3kit
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `be_users`
--

DROP TABLE IF EXISTS `be_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `be_users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) unsigned NOT NULL DEFAULT '0',
  `tstamp` int(11) unsigned NOT NULL DEFAULT '0',
  `username` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(2000) NOT NULL DEFAULT '',
  `avatar` int(11) unsigned NOT NULL DEFAULT '0',
  `password` varchar(100) NOT NULL DEFAULT '',
  `admin` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `usergroup` varchar(255) NOT NULL DEFAULT '',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `starttime` int(11) unsigned NOT NULL DEFAULT '0',
  `endtime` int(11) unsigned NOT NULL DEFAULT '0',
  `lang` char(2) NOT NULL DEFAULT '',
  `email` varchar(80) NOT NULL DEFAULT '',
  `db_mountpoints` text,
  `options` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `crdate` int(11) unsigned NOT NULL DEFAULT '0',
  `cruser_id` int(11) unsigned NOT NULL DEFAULT '0',
  `realName` varchar(80) NOT NULL DEFAULT '',
  `userMods` text,
  `allowed_languages` varchar(255) NOT NULL DEFAULT '',
  `uc` mediumtext,
  `file_mountpoints` text,
  `file_permissions` text,
  `workspace_perms` tinyint(3) NOT NULL DEFAULT '1',
  `lockToDomain` varchar(50) NOT NULL DEFAULT '',
  `disableIPlock` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `TSconfig` text,
  `lastlogin` int(10) unsigned NOT NULL DEFAULT '0',
  `createdByAction` int(11) NOT NULL DEFAULT '0',
  `usergroup_cached_list` text,
  `workspace_id` int(11) NOT NULL DEFAULT '0',
  `workspace_preview` tinyint(3) NOT NULL DEFAULT '1',
  `category_perms` varchar(255) NOT NULL DEFAULT '',
  `tx_news_categorymounts` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`uid`),
  KEY `parent` (`pid`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `be_users`
--

LOCK TABLES `be_users` WRITE;
/*!40000 ALTER TABLE `be_users` DISABLE KEYS */;
INSERT INTO `be_users` VALUES (1,0,1458736388,'admin','',0,'$P$CKPoY3K1oAHXAVeqe7JGBxesL/hXg11',1,'',0,0,0,'','',NULL,0,1441877779,0,'Admin',NULL,'','a:24:{s:14:\"interfaceSetup\";s:7:\"backend\";s:10:\"moduleData\";a:16:{s:10:\"web_layout\";a:3:{s:8:\"function\";s:1:\"1\";s:8:\"language\";s:1:\"0\";s:25:\"tx_news_domain_model_news\";s:1:\"0\";}s:10:\"FormEngine\";a:2:{i:0;a:0:{}i:1;s:32:\"00c3bac5286b66a474abe8c51ecb1aa0\";}s:57:\"TYPO3\\CMS\\Backend\\Utility\\BackendUtility::getUpdateSignal\";a:0:{}s:16:\"opendocs::recent\";a:8:{s:32:\"00c3bac5286b66a474abe8c51ecb1aa0\";a:4:{i:0;s:6:\"editor\";i:1;a:7:{s:4:\"edit\";a:1:{s:8:\"be_users\";a:1:{i:3;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:104:\"&edit[be_users][3]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:8:\"be_users\";s:3:\"uid\";s:1:\"3\";s:3:\"pid\";s:1:\"0\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";b:1;}}s:32:\"3107b94272a0c3194e2479999dc9d94b\";a:4:{i:0;s:5:\"admin\";i:1;a:7:{s:4:\"edit\";a:1:{s:8:\"be_users\";a:1:{i:1;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:104:\"&edit[be_users][1]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:8:\"be_users\";s:3:\"uid\";s:1:\"1\";s:3:\"pid\";s:1:\"0\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";b:1;}}s:32:\"7fa185643ef43a93f08fc77f7bd7cbcb\";a:4:{i:0;s:22:\"Content Element Slider\";i:1;a:7:{s:4:\"edit\";a:1:{s:10:\"tt_content\";a:1:{i:5;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:106:\"&edit[tt_content][5]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:10:\"tt_content\";s:3:\"uid\";s:1:\"5\";s:3:\"pid\";s:1:\"2\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";b:1;}}s:32:\"0eaa25358e9ceeb3d00af423a49c8b8a\";a:4:{i:0;s:7:\"corenew\";i:1;a:7:{s:4:\"edit\";a:1:{s:12:\"sys_template\";a:1:{i:1;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:108:\"&edit[sys_template][1]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:12:\"sys_template\";s:3:\"uid\";s:1:\"1\";s:3:\"pid\";s:1:\"1\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";i:1;}}s:32:\"cbf9fcb9646172755056b7c156c1c7ac\";a:4:{i:0;s:4:\"Home\";i:1;a:7:{s:4:\"edit\";a:1:{s:5:\"pages\";a:1:{i:1;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:101:\"&edit[pages][1]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:5:\"pages\";s:3:\"uid\";s:1:\"1\";s:3:\"pid\";s:1:\"0\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";i:1;}}s:32:\"0ae77006b38a301698db4d936f7f77bb\";a:4:{i:0;s:26:\"Lorem ipsum dolor sit amet\";i:1;a:7:{s:4:\"edit\";a:1:{s:10:\"tt_content\";a:1:{i:7;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:106:\"&edit[tt_content][7]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:10:\"tt_content\";s:3:\"uid\";s:1:\"7\";s:3:\"pid\";s:1:\"2\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";b:1;}}s:32:\"d120708e4d3db10ed7f359a0ed448c31\";a:4:{i:0;s:278:\"<span title=\"Content element 1\r\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut e...\">Content element 1\r\n            Lorem ipsum dolor s...</span>\";i:1;a:7:{s:4:\"edit\";a:1:{s:10:\"tt_content\";a:1:{i:2;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:106:\"&edit[tt_content][2]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:10:\"tt_content\";s:3:\"uid\";s:1:\"2\";s:3:\"pid\";s:1:\"2\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";i:1;}}s:32:\"81193a7dd1375566c38146aee8667087\";a:4:{i:0;s:278:\"<span title=\"Lorem ipsum\r\n              Dolor sit amet\r\n              Vivamus luctus urna sed urna ultricies ac doltempor dui sagittis. In condimentum. Vivamus luctus urna sed urna ultricies ac doltempor dui sagit...\">Lorem ipsum\r\n              Dolor sit amet\r\n       ...</span>\";i:1;a:7:{s:4:\"edit\";a:1:{s:10:\"tt_content\";a:1:{i:1;s:4:\"edit\";}}s:7:\"defVals\";N;s:12:\"overrideVals\";N;s:11:\"columnsOnly\";N;s:6:\"noView\";N;s:24:\"editRegularContentFromId\";N;s:9:\"workspace\";N;}i:2;s:106:\"&edit[tt_content][1]=edit&defVals=&overrideVals=&columnsOnly=&noView=&editRegularContentFromId=&workspace=\";i:3;a:5:{s:5:\"table\";s:10:\"tt_content\";s:3:\"uid\";s:1:\"1\";s:3:\"pid\";s:1:\"2\";s:3:\"cmd\";s:4:\"edit\";s:12:\"deleteAccess\";i:1;}}}s:8:\"web_list\";a:0:{}s:45:\"mod-web_ThemesMod1/Categories/Filter/Settings\";a:4:{s:11:\"searchScope\";s:3:\"all\";s:9:\"showBasic\";s:1:\"1\";s:12:\"showAdvanced\";s:1:\"1\";s:10:\"showExpert\";s:1:\"1\";}s:6:\"web_ts\";a:2:{s:8:\"function\";s:85:\"TYPO3\\CMS\\Tstemplate\\Controller\\TypoScriptTemplateInformationModuleFunctionController\";s:19:\"constant_editor_cat\";s:5:\"basic\";}s:8:\"web_func\";a:1:{s:8:\"function\";s:76:\"TYPO3\\CMS\\WizardCrpages\\Controller\\CreatePagesWizardModuleFunctionController\";}s:8:\"web_info\";a:4:{s:8:\"function\";s:72:\"TYPO3\\CMS\\InfoPagetsconfig\\Controller\\InfoPageTyposcriptConfigController\";s:5:\"pages\";s:1:\"0\";s:5:\"depth\";s:1:\"0\";s:12:\"tsconf_parts\";s:1:\"5\";}s:16:\"browse_links.php\";a:1:{s:12:\"expandFolder\";s:15:\"1:/user_upload/\";}s:9:\"file_list\";a:1:{s:15:\"bigControlPanel\";s:1:\"1\";}s:13:\"xMOD_tximpexp\";a:1:{s:8:\"function\";s:0:\"\";}s:9:\"tx_beuser\";s:530:\"O:40:\"TYPO3\\CMS\\Beuser\\Domain\\Model\\ModuleData\":2:{s:9:\"\0*\0demand\";O:36:\"TYPO3\\CMS\\Beuser\\Domain\\Model\\Demand\":12:{s:11:\"\0*\0userName\";s:0:\"\";s:11:\"\0*\0userType\";i:0;s:9:\"\0*\0status\";i:0;s:9:\"\0*\0logins\";i:0;s:19:\"\0*\0backendUserGroup\";N;s:6:\"\0*\0uid\";N;s:16:\"\0*\0_localizedUid\";N;s:15:\"\0*\0_languageUid\";N;s:16:\"\0*\0_versionedUid\";N;s:6:\"\0*\0pid\";N;s:61:\"\0TYPO3\\CMS\\Extbase\\DomainObject\\AbstractDomainObject\0_isClone\";b:0;s:69:\"\0TYPO3\\CMS\\Extbase\\DomainObject\\AbstractDomainObject\0_cleanProperties\";a:0:{}}s:18:\"\0*\0compareUserList\";a:0:{}}\";s:13:\"system_config\";a:2:{s:8:\"function\";s:1:\"1\";s:6:\"node_1\";a:8:{s:10:\"tt_content\";i:1;s:16:\"tt_content.types\";i:1;s:34:\"tt_content.types.bigIconTextButton\";i:1;s:37:\"tt_content.types.contentElementSlider\";i:1;s:18:\"tt_content.columns\";i:1;s:30:\"tt_content.columns.pi_flexform\";i:1;s:37:\"tt_content.columns.pi_flexform.config\";i:1;s:40:\"tt_content.columns.pi_flexform.config.ds\";i:1;}}s:20:\"system_txschedulerM1\";a:1:{s:8:\"function\";s:5:\"check\";}s:12:\"system_dbint\";a:3:{s:8:\"function\";s:8:\"refindex\";s:6:\"search\";s:3:\"raw\";s:22:\"search_query_makeQuery\";s:3:\"all\";}}s:19:\"thumbnailsByDefault\";i:1;s:14:\"emailMeAtLogin\";i:0;s:11:\"startModule\";s:29:\"help_AboutmodulesAboutmodules\";s:18:\"hideSubmoduleIcons\";i:0;s:8:\"titleLen\";i:50;s:8:\"edit_RTE\";s:1:\"1\";s:20:\"edit_docModuleUpload\";s:1:\"1\";s:17:\"navFrameResizable\";i:0;s:15:\"resizeTextareas\";i:1;s:25:\"resizeTextareas_MaxHeight\";i:500;s:24:\"resizeTextareas_Flexible\";i:0;s:4:\"lang\";s:0:\"\";s:19:\"firstLoginTimeStamp\";i:1441877795;s:15:\"moduleSessionID\";a:16:{s:10:\"web_layout\";s:32:\"1827477d55b88ff96e37a7bd2425b57d\";s:10:\"FormEngine\";s:32:\"e01cae8af4ba794dd9c67a0456b31f9e\";s:57:\"TYPO3\\CMS\\Backend\\Utility\\BackendUtility::getUpdateSignal\";s:32:\"e01cae8af4ba794dd9c67a0456b31f9e\";s:16:\"opendocs::recent\";s:32:\"e01cae8af4ba794dd9c67a0456b31f9e\";s:8:\"web_list\";s:32:\"360f3c2631f403f64a8b2739109e2e44\";s:45:\"mod-web_ThemesMod1/Categories/Filter/Settings\";s:32:\"490abcb6dec63ba56393975a54be41bf\";s:6:\"web_ts\";s:32:\"82f91be3f7f81eea7a4e2e7d60c68ec4\";s:8:\"web_func\";s:32:\"1f113f2efcf6e6e693d999e2441e0b98\";s:8:\"web_info\";s:32:\"d4f4f1f7a0763dbecd554d72204f6c60\";s:16:\"browse_links.php\";s:32:\"7ca094d971e6da6e170f212824cb9ca1\";s:9:\"file_list\";s:32:\"e51d6a60c9e3bf2dbfb6e46200590859\";s:13:\"xMOD_tximpexp\";s:32:\"288a17fdde62de56b45a6e2f4a2ee4b4\";s:9:\"tx_beuser\";s:32:\"e01cae8af4ba794dd9c67a0456b31f9e\";s:13:\"system_config\";s:32:\"82f91be3f7f81eea7a4e2e7d60c68ec4\";s:20:\"system_txschedulerM1\";s:32:\"449d3382ad370979e31151b58d9f5f4f\";s:12:\"system_dbint\";s:32:\"5f3cee6eb2fb5fd129e7eea81436433f\";}s:17:\"BackendComponents\";a:1:{s:6:\"States\";a:3:{s:8:\"Pagetree\";O:8:\"stdClass\":1:{s:9:\"stateHash\";O:8:\"stdClass\":13:{s:1:\"0\";i:1;s:1:\"1\";i:1;s:1:\"4\";i:1;s:1:\"6\";i:1;s:1:\"7\";i:1;s:1:\"8\";i:1;s:1:\"9\";i:1;s:4:\"root\";i:1;s:16:\"lastSelectedNode\";s:2:\"p0\";s:1:\"a\";i:1;s:1:\"b\";i:1;s:1:\"c\";i:1;s:1:\"d\";i:1;}}s:25:\"typo3-navigationContainer\";O:8:\"stdClass\":1:{s:9:\"collapsed\";b:1;}s:17:\"typo3-module-menu\";O:8:\"stdClass\":1:{s:5:\"width\";i:190;}}}s:8:\"tcaTrees\";a:3:{s:32:\"fc5490915273e8f87906abaacb8eff12\";s:1:\"0\";s:32:\"d2e1133f7858a3957716afd25af53d72\";s:1:\"0\";s:32:\"722d8f90c5297900cb859798411220ce\";s:1:\"0\";}s:18:\"disablePMKTextarea\";i:1;s:10:\"modulemenu\";s:2:\"{}\";s:10:\"inlineView\";s:322:\"a:2:{i:0;b:0;s:10:\"tt_content\";a:4:{s:26:\"NEW55f19095698875.50851985\";a:1:{s:18:\"sys_file_reference\";a:1:{i:0;i:1;}}i:4;a:1:{s:18:\"sys_file_reference\";a:1:{i:0;s:1:\"1\";}}s:26:\"NEW55f9645c945247.46710162\";a:1:{s:18:\"sys_file_reference\";a:3:{i:0;i:2;i:1;i:3;i:2;i:4;}}i:5;a:1:{s:18:\"sys_file_reference\";a:1:{i:11;s:0:\"\";}}}}\";s:17:\"systeminformation\";s:45:\"{\"system_BelogLog\":{\"lastAccess\":1442216303}}\";s:11:\"browseTrees\";a:1:{s:6:\"folder\";s:35:\"a:1:{i:25218;a:1:{i:62822724;i:1;}}\";}s:7:\"reports\";a:1:{s:9:\"selection\";a:2:{s:9:\"extension\";s:2:\"sv\";s:6:\"report\";s:8:\"services\";}}}',NULL,NULL,1,'',0,0,NULL,1458737137,0,NULL,0,1,'',''),(2,0,1447225260,'_cli_scheduler','',0,'$P$CVn2QfPQkpejZ8jL5uOsHvktAcNgSP.',0,'',0,0,0,'','',NULL,3,1447225260,1,'',NULL,'',NULL,NULL,'readFolder,writeFolder,addFolder,renameFolder,moveFolder,deleteFolder,readFile,writeFile,addFile,renameFile,replaceFile,moveFile,files_copy,deleteFile',1,'',0,0,NULL,0,0,NULL,0,1,'',''),(3,0,1458737156,'editor','',0,'$P$C98fGIhZibo/BzSPJFvch3LaOsNGtB0',0,'3',0,0,0,'','','',3,1458736375,1,'Editor','','','a:17:{s:14:\"interfaceSetup\";s:7:\"backend\";s:10:\"moduleData\";a:3:{s:10:\"web_layout\";a:3:{s:8:\"function\";s:1:\"1\";s:8:\"language\";s:1:\"0\";s:25:\"tx_news_domain_model_news\";s:1:\"0\";}s:8:\"web_list\";a:0:{}s:8:\"web_info\";a:3:{s:8:\"function\";s:55:\"TYPO3\\CMS\\Frontend\\Controller\\PageInformationController\";s:5:\"pages\";s:1:\"0\";s:5:\"depth\";s:1:\"0\";}}s:19:\"thumbnailsByDefault\";i:1;s:14:\"emailMeAtLogin\";i:0;s:11:\"startModule\";s:29:\"help_AboutmodulesAboutmodules\";s:18:\"hideSubmoduleIcons\";i:0;s:8:\"titleLen\";i:50;s:8:\"edit_RTE\";s:1:\"1\";s:20:\"edit_docModuleUpload\";s:1:\"1\";s:17:\"navFrameResizable\";i:0;s:15:\"resizeTextareas\";i:1;s:25:\"resizeTextareas_MaxHeight\";i:500;s:24:\"resizeTextareas_Flexible\";i:0;s:4:\"lang\";s:0:\"\";s:19:\"firstLoginTimeStamp\";i:1458736424;s:15:\"moduleSessionID\";a:3:{s:10:\"web_layout\";s:32:\"e1dcc85aad989d7a88cd55649c4cdfbd\";s:8:\"web_list\";s:32:\"437388ad1f35a2415c9788eb881cb250\";s:8:\"web_info\";s:32:\"437388ad1f35a2415c9788eb881cb250\";}s:17:\"BackendComponents\";a:1:{s:6:\"States\";a:1:{s:8:\"Pagetree\";O:8:\"stdClass\":1:{s:9:\"stateHash\";O:8:\"stdClass\":10:{s:1:\"0\";i:1;s:4:\"root\";i:1;s:3:\"1-1\";i:1;s:16:\"lastSelectedNode\";s:4:\"p1-1\";s:4:\"16-1\";i:1;s:4:\"17-1\";i:1;s:4:\"46-1\";i:1;s:4:\"29-1\";i:1;s:4:\"1a-1\";i:1;s:4:\"34-1\";i:1;}}}}}','','readFolder,writeFolder,addFolder,renameFolder,moveFolder,deleteFolder,readFile,writeFile,addFile,renameFile,replaceFile,moveFile,deleteFile',1,'',0,0,'',1458737130,0,'1,2,3',0,1,'','');
/*!40000 ALTER TABLE `be_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-29  9:06:42
