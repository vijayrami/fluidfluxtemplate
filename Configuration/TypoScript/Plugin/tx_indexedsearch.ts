###################################################
# Plugin Index Search
###################################################
config.index_enable = 1
config.index_externals = 1
config.index_metatags = 1
plugin.tx_indexedsearch {
	_CSS_DEFAULT_STYLE >
	_DEFAULT_PI_VARS.results = 10
	forwardSearchWordsInResultLink = 1
	blind {
		type=-1
		defOp=0
		sections=0
		media=1
		order=-1
		group=-1
		extResume=-1
		lang=-1
		desc=-1
		results=0
	}
	show {
		rules=0
		parsetimes=1
		L2sections=1
		L1sections=1
		LxALLtypes=0
		clearSearchBox = 0
		clearSearchBox.enableSubSearchCheckBox=0
		advancedSearchLink = 0
	}
	search {
		rootPidList =
	}
	

  templateFile = typo3conf/ext/fluxtemplate/Resources/Private/Templates/Extensions/IndexedSearch/Templates/template.html

}