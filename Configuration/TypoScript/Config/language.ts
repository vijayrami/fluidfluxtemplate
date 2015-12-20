###################################################
# language handling
###################################################


# Language-specific settings first foreign language:
[globalVar = GP:L = {$firstForeignLanguage}]
	config {
		sys_language_uid = {$firstForeignLanguage}
		language = {$languageIsoCodeFirstLang}
		htmlTag_dir = {$htmlTagDirFirstLang}
		htmlTag_langKey = {$htmlTagLangKeyFirstLang}
		locale_all = {$languageLocaleFirstLang}
	}
[global]

# Language-specific settings second foreign language:
[globalVar = GP:L = {$secondForeignLanguage}]
	config {
		sys_language_uid = {$secondForeignLanguage}
		language = {$languageIsoCodeSecondLang}
		htmlTag_dir = {$htmlTagDirSecondLang}
		htmlTag_langKey = {$htmlTagLangKeySecondLang}
		locale_all = {$languageLocaleSecondLang}
		language = {$languageIsoCodeSecondLang}
	}
[global]

# Language-specific settings third foreign language:
[globalVar = GP:L = {$thirdForeignLanguage}]
	config {
		sys_language_uid = {$thirdForeignLanguage}
		language = {$languageIsoCodeThirdLang}
		htmlTag_dir = {$htmlTagDirThirdLang}
		htmlTag_langKey = {$htmlTagLangKeyThirdLang}
		locale_all = {$languageLocaleThirdLang}
		language = {$languageIsoCodeThirdLang}
	}
[global]

# Language-specific settings fourth foreign language:
[globalVar = GP:L = {$fourthForeignLanguage}]
	config {
		sys_language_uid = {$fourthForeignLanguage}
		language = {$languageIsoCodeFourthLang}
		htmlTag_dir = {$htmlTagDirFourthLang}
		htmlTag_langKey = {$htmlTagLangKeyFourthLang}
		locale_all = {$languageLocaleFourthLang}
		language = {$languageIsoCodeFourthLang}
	}
[global]

# Language-specific settings fifth foreign language:
[globalVar = GP:L = {$fifthForeignLanguage}]
	config {
		sys_language_uid = {$fifthForeignLanguage}
		language = {$languageIsoCodeFifthLang}
		htmlTag_dir = {$htmlTagDirFifthLang}
		htmlTag_langKey = {$htmlTagLangKeyFifthLang}
		locale_all = {$languageLocaleFifthLang}
		language = {$languageIsoCodeFifthLang}
	}
[global]

# Language-specific settings sixth foreign language:
[globalVar = GP:L = {$sixthForeignLanguage}]
	config {
		sys_language_uid = {$sixthForeignLanguage}
		language = {$languageIsoCodeSixthLang}
		htmlTag_dir = {$htmlTagDirSixthLang}
		htmlTag_langKey = {$htmlTagLangKeyFirstLang}
		locale_all = {$htmlTagLangKeySixthLang}
		language = {$languageIsoCodeSixthLang}
	}
[global]


