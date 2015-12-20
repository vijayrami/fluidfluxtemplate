###################################################
# Menu
###################################################

lib.menu {
	homePageUID = {$homePageUID}

	main {
		entryLevel = {$navigationOneEntryLevel}
	}
	sub {
		entryLevel = {$navigationTwoEntryLevel}
	}
	user {
		pageUid = {$navigationUserEntryId}
	}
	footer {
		pageUid = {$navigationFooterEntryId}
	}
}