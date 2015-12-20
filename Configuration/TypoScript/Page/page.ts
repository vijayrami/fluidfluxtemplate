################
# page
################


# body tag
page.bodyTagCObject = COA
page.bodyTagCObject {
  
  10 = TEXT
  10.value = {$cssClass}
  10.noTrimWrap = |<body class="|" |

  20 = TEXT
  20.field = uid
  20.noTrimWrap = | id="page_|">|
}

# remove class bodytext
lib.parseFunc_RTE.nonTypoTagStdWrap.encapsLines.addAttributes.P.class >



[globalVar = GP:L = ]
page.bodyTagCObject.10.value := appendString( {$languageIsoCodeStandardLang})
[global]

[globalVar = GP:L = {$firstForeignLanguage}]
page.bodyTagCObject.10.value := appendString( {$languageIsoCodeFirstLang})
[global]

[globalVar = GP:L = {$secondForeignLanguage}]
page.bodyTagCObject.10.value := appendString( {$languageIsoCodeSecondLang})
[global]

[globalVar = GP:L = {$thirdForeignLanguage}]
page.bodyTagCObject.10.value := appendString( {$languageIsoCodeThirdLang})
[global]

[globalVar = GP:L = {$fourthForeignLanguage}]
page.bodyTagCObject.10.value := appendString( {$languageIsoCodeFourthLang})
[global]

[globalVar = GP:L = {$fifthForeignLanguage}]
page.bodyTagCObject.10.value := appendString( {$languageIsoCodeFifthLang})
[global]

[globalVar = GP:L = {$sixthForeignLanguage}]
page.bodyTagCObject.10.value := appendString( {$languageIsoCodeSixthLang})
[global]