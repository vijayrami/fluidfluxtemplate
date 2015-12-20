mod.SHARED {
	defaultLanguageFlag = de
	defaultLanguageLabel = Deutsch
}
mod.web_layout {
		disableBigButtons = 1		
}

# Classes. Do not forget to define them in the CSS class
RTE.classes {

	# lists
	checklist {
		name = Checkliste
	}

	# tables
	table {
		name = Normale Tabelle
	}
	table-condensed {
		name = Verkürzte Tabelle
	}
	table-bordered {
		name = Tabelle mit Rahmen
	}
	table-styled {
		name = Tabelle mit anderem Design
	}
	table-striped {
		name = Tabelle mit Streifen
	}
	table-hover {
		name = Tabelle mit Hover-Effekt
	}

	# aligns
	align-justify {
		name = LLL:EXT:rtehtmlarea/htmlarea/locallang_tooltips.xml:justifyfull
	}
	align-left {
		name = LLL:EXT:rtehtmlarea/htmlarea/locallang_tooltips.xml:justifyleft
		value = text-align: left;
	}
	align-center {
		name = LLL:EXT:rtehtmlarea/htmlarea/locallang_tooltips.xml:justifycenter
		value = text-align: center;
	}
	align-right {
		name = LLL:EXT:rtehtmlarea/htmlarea/locallang_tooltips.xml:justifyright
		value = text-align: right;
	}
	csc-frame-frame1 {
		name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:frame-frame1
		value = background-color: #EDEBF1; border: 1px solid #333333;
    }
    csc-frame-frame2 {
		name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:frame-frame2
        value = background-color: #F5FFAA; border: 1px solid #333333;
    }
    important {
        name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:important
        value = color: #8A0020;
    }
    name-of-person {
        name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:name-of-person
        value = color: #10007B;
    }
    detail {
        name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:detail
        value = color: #186900;
    }
    component-items {
        name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:component-items
        value = color: #186900;
    }
    action-items {
        name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:action-items
        value = color: #8A0020;
    }
    component-items-ordered {
        name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:component-items
        value = color: #186900;
    }
    action-items-ordered {
        name = LLL:EXT:rtehtmlarea/res/contentcss/locallang.xml:action-items
        value = color: #8A0020;
    }

	style1 {
		name = Stil 1
	}

	htmlCode {
		name = HTML Code
	}
	phpCode {
		name = PHP Code
	}
	
}

RTE.classesAnchor {
	
	externalLink {
        class = external-link
        type = url
        titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:external_link_titleText
    }
    externalLinkInNewWindow {
        class = external-link-new-window
        type = url
        titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:external_link_new_window_titleText
    }
    internalLink {
        class = internal-link
        type = page
        titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:internal_link_titleText
    }
	internalLinkInNewWindow {
		class = internal-link-new-window
		type = page
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:internal_link_new_window_titleText
	}
	download {
		class = download
		type = file
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:download_titleText
	}
	mail {
		class = mail
		type = mail
		titleText = LLL:EXT:rtehtmlarea/res/accessibilityicons/locallang.xml:mail_titleText
	}


	more-link {
		class = more-link
		type = page
		titleText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:more_link_titleText
		altText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:more_link_altText
	}
	button-link {
		class = btn
		type = page
		titleText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:more_link_titleText
		altText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:more_link_altText
	}
	next-link {
		class = ym-button ym-next
		type = page
		titleText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:next_link_titleText
		altText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:next_link_altText
	}
	back-link {
		class = back-link
		type = page
		titleText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:back_link_titleText
		altText = LLL:EXT:fluxtemplate/Resources/Private/Language/locallang.xml:back_link_altText
	}
}

RTE.default {

	showButtons = *
	## Enable the image button
    showButtons := addToList(image)
	
	defaultContentLanguage = de

	
	// Make possible to read classes from the contentCSS CSS file
	buttons.textstyle.tags.span.allowedClasses >
	
	buttons.textstyle.tags.REInlineTags >
	buttons.textstyle.REInlineTags >
	buttons.blockstyle.tags.table.allowedClasses >
	buttons.blockstyle.tags.p.allowedClasses >
	
	buttons.blockstyle.tags.div.allowedClasses = align-left, align-center, align-right
	buttons.blockstyle.tags.div.allowedClasses := addToList(csc-frame-frame1, csc-frame-frame2)
	buttons.blockstyle.tags.table.allowedClasses = csc-frame-frame1, csc-frame-frame2
	buttons.blockstyle.tags.td.allowedClasses = align-left, align-center, align-right
	buttons.textstyle.tags.span.allowedClasses = important, name-of-person, detail
	
	
	contentCSS = typo3conf/ext/fluxtemplate/Resources/Public/CSS/rte.css

	buttons.formatblock.prefixLabelWithTag = 1
	buttons.link.relAttribute.enabled = 1
	buttons.link.queryParametersSelector.enabled = 1
	buttons.link.properties.class.allowedClasses = external-link, external-link-new-window, internal-link, internal-link-new-window, download, mail	
	buttons.link.page.properties.class.default = internal-link
	buttons.link.url.properties.class.default = external-link-new-window
	buttons.link.file.properties.class.default = download
	buttons.link.mail.properties.class.default = mail
	buttons.image.properties.class.allowedClasses = img-responsive
	// Disable contextual menu
	contextMenu.disabled = 1

	// Display status bar
	showStatusBar = 1
	
	//More toolbar options
	keepButtonGroupTogether = 1

	// Use CSS formatting when possible
	useCSS = 1

	// Make rtehtmlarea resizable
	rteResize = 1
	
	proc {
		
		allowedClasses = external-link, external-link-new-window, internal-link, internal-link-new-window, download, mail
		allowedClasses := addToList(detail,align-left, align-center, align-right, align-justify, csc-frame-frame1, csc-frame-frame2, component-items, action-items, component-items-ordered, action-items-ordered, important, name-of-person, indent, img-responsive)	
		
		allowedClasses  < RTE.default.classesCharacter
		# auskommentieren, damit klassen eingelesen werden k�nnen
		#allowedClasses := addToList( dimmed,highlight,box,info,success,warning,error,float-left,float-right,center,align-left,align-center,align-right,align-justify,style1 )

		## TAGS ALLOWED OUTSIDE P & DIV
		allowTagsOutside := addToList( pre, img )

		allowTags := addToList( pre )		
	  
		// Tags allowed in Typolists
		allowTagsInTypolists = br,font,b,i,u,a,img,span

		// Keep unknown tags
		dontRemoveUnknownTags_db = 1

		// Allow tables
		preserveTables = 1

		entryHTMLparser_db = 1
		entryHTMLparser_db {

			// Tags allowed
			allowTags < RTE.default.proc.allowTags

			// Tags denied
			denyTags >

			// HTML special characters
			htmlSpecialChars = 0

			// Allow IMG tags
			tags.img >

			// Additionnal attributes for P & DIV
			tags.div.allowedAttribs = class,style,align
			tags.p.allowedAttribs = class,style,align

			// Tags to remove
			removeTags = center, font, o:p, sdfield, strike, u

			// Keep non matched tags
			keepNonMatchedTags = protect
		}

		// HTML parser
		HTMLparser_db {

			// Strip attributes
			noAttrib = br

			// XHTML compliance
			xhtml_cleaning = 1
		}

		// Exit HTML parser
		exitHTMLparser_db = 1
		exitHTMLparser_db {

			// Remap bold and italic
			tags.b.remap = strong
			tags.i.remap = em

			// Keep non matched tags
			keepNonMatchedTags = 1

			// HTML special character
			htmlSpecialChars = 0
		}


	}

}


RTE.default.FE < RTE.default
RTE.default.FE.showButtons < RTE.default.showButtons
RTE.default.FE.proc.allowTagsOutside < RTE.default.proc.allowTagsOutside
RTE.default.FE.proc.entryHTMLparser_db.tags.img >

// PageTSConfig
TCEFORM.tt_content.header_layout.altLabels  {
 	0 = H1 (Default)
 	1 = H1
 	2 = H2
 	3 = H3
 	4 = H4
 	5 = H5
 	6 = H6
}