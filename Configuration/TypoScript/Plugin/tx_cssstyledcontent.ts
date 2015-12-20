###################################################
# Plugin CSS Styled Content
###################################################

# Remove default CSS of css_styled_content
#plugin.tx_cssstyledcontent._CSS_DEFAULT_STYLE >

# Configure table
lib.parseFunc_RTE {
	externalBlocks {
		table.stdWrap.HTMLparser.tags.table.fixAttrib.class {
			default = table table-striped table-hover table-condensed
			always = 1
			list >
		}
	}
}

# This will place an anchor link besides the h1 menu
lib.stdheader {

	# Reset config
	10 >

	# This CASE cObject renders the header content:
	# currentValue is set to the header data, possibly wrapped in link-tags.
	10 = CASE
	10.setCurrent {
		field = header
		htmlSpecialChars = 1
		typolink.parameter.field = header_link
	}
	10.key.field = header_layout
	10.key.ifEmpty = {$content.defaultHeaderType}
	10.key.ifEmpty.override.data = register: defaultHeaderType

	10.1 = COA
	#10.1.wrap = <h1>|</h1>
	10.1 {
		1 = TEXT
		1.current = 1
		1.dataWrap = <h1{register:headerClass}>|</h1>
	}

	10.2 = TEXT
	10.2.current = 1
	10.2.dataWrap = <h2{register:headerClass}>|</h2>

	10.3 < .10.2
	10.3.dataWrap = <h3{register:headerClass}>|</h3>

	10.4 < .10.2
	10.4.dataWrap = <h4{register:headerClass}>|</h4>

	10.5 < .10.2
	10.5.dataWrap = <h5{register:headerClass}>|</h5>
}



lib.stdheader {
  # remove the DIV-tag around headlines
  #stdWrap.dataWrap =



  stdWrap {
    dataWrap = <div class="csc-header csc-header-n{cObj:parentRecordNumber} {cObj:headerClass}">|</div>
  }
}
# transform header tag to div tag
lib.stdheader.stdWrap.dataWrap.override >


tt_content.stdWrap {
  innerWrap2 = | <p class="csc-linkToTop"><a href="#content">{LLL:EXT:css_styled_content/pi1/locallang.xml:label.toTop}</a></p>

  # remove a tag with element id in other languages
  prepend >

}


# image figure
tt_content.image.20 {
  1.params = class="img-responsive"
  1 {
    sourceCollection {
      small {
        width = 600
      }
    }
    # Korrektur des source-Tags: srcset anstatt src
    layout.picture.source = <source srcset="###SRC###" media="###MEDIAQUERY###"###SELFCLOSINGTAGSLASH###>
  }
}

tt_content.textpic.20 {
  1.params = class="img-responsive"
  1 {
  	sourceCollection < tt_content.image.20.1.sourceCollection
  }
}


tt_content.stdWrap.innerWrap.cObject {
  40 =< tt_content.stdWrap.innerWrap.cObject.default
  40.20.10.value = csc-default csc-frame-style1

  # Marketing style
  41 =< tt_content.stdWrap.innerWrap.cObject.default
  41.20.10.value = csc-default csc-marketing

  # margin style
  45 =< tt_content.stdWrap.innerWrap.cObject.default
  45.20.10.value = csc-default csc-margin-after

  # visible-phone
  60 =< tt_content.stdWrap.innerWrap.cObject.default
  60.20.10.value = csc-default visible-xs

  # visible-tablet
  61 =< tt_content.stdWrap.innerWrap.cObject.default
  61.20.10.value = csc-default visible-sm

  # visible-desktop
  62 =< tt_content.stdWrap.innerWrap.cObject.default
  62.20.10.value = csc-default visible-md

  # hidden-phone
  63 =< tt_content.stdWrap.innerWrap.cObject.default
  63.20.10.value = csc-default hidden-xs

  # hidden-tablet
  64 =< tt_content.stdWrap.innerWrap.cObject.default
  64.20.10.value = csc-default hidden-sm

  # hidden-desktop
  65 =< tt_content.stdWrap.innerWrap.cObject.default
  65.20.10.value = csc-default hidden-md

  # thumbnail
  70 =< tt_content.stdWrap.innerWrap.cObject.default
  70.20.10.value = csc-default thumbnail


}


# add subheadline class
lib.stdheader.20 {
  2.wrap = <h3 class="subheadline">|</h3>
  3.wrap = <h4 class="subheadline">|</h4>
  4.wrap = <h5 class="subheadline">|</h5>
  5.wrap = <h6 class="subheadline">|</h6>
}






