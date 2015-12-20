<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Fluid: Website Template');

//# Add Constants and setup TSConfig
if ('BE' === TYPO3_MODE) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript($_EXTKEY, 'constants', '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:fluxtemplate/Configuration/TypoScript/constants.txt">');
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript($_EXTKEY, 'setup', '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:fluxtemplate/Configuration/TypoScript/setup.txt">');
}

//# Add page TSConfig
$pageTsConfig = \TYPO3\CMS\Core\Utility\GeneralUtility::getUrl(
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/TsConfig/Page/config.ts');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig($pageTsConfig);

# Add user TSConfig
$userTsConfig = \TYPO3\CMS\Core\Utility\GeneralUtility::getUrl(
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/TsConfig/User/config.ts');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig($userTsConfig);

\FluidTYPO3\Flux\Core::registerProviderExtensionKey($_EXTKEY, 'Content');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey($_EXTKEY, 'Page');


// New icons for the BE
if (TYPO3_MODE == 'BE') {

    $icons = array('category', 'comment', 'storage', 'tesseract', 'people', 'mail', 'form');
    foreach ($icons as $icon) {

        \TYPO3\CMS\Backend\Sprite\SpriteManager::addTcaTypeIcon('pages', 'contains-' . $icon, \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Backend/Icons/' . $icon . '.png');

        $TCA['pages']['columns']['module']['config']['items'][] = array(ucfirst($icon), $icon, \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Backend/Icons/' . $icon . '.png');
    }
}
