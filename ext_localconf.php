<?php
if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

$GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['backend'] = serialize([
    'loginLogo' => 'EXT:fluxtemplate/Resources/Public/Backend/Images/logo.png',
    'loginHighlightColor' => '#17385E',
    'loginBackgroundImage' => 'EXT:fluxtemplate/Resources/Public/Backend/Images/background.png',
]);