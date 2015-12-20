
[globalString = LIT:{$jsBootstrap}=/.+/]
page.includeJSFooter {
  bootstrap = {$jsBootstrap}
}
[global]


[globalString = LIT:{$jsHtml5shim}=/.+/]
page.includeJS {
  html5shim = {$jsHtml5shim}
  html5shim {   
    allWrap = <!--[if lt IE 9]>|<![endif]-->
  }

}
[global]

[globalString = LIT:{$jsModernizr}=/.+/]
page.includeJS {
  modernizr = {$jsModernizr}
}
[global]



[globalString = LIT:{$jquerycore}=/.+/]
page.includeJSFooterlibs {
  jquery = {$jquerycore}
  jquery.forceOnTop = 1
}
[global]

[globalString = LIT:{$jquerymigrate}=/.+/]
page.includeJSFooterlibs {
	jquery_migrate = {$jquerymigrate}
}
[global]


## other javascripts
page.includeJSFooter {
  main = {$plugin.tx_fluxtemplate.filepaths.javascript}main.js

  plugins = {$plugin.tx_fluxtemplate.filepaths.javascript}plugins.js

  #video = {$plugin.tx_fluxtemplate.filepaths.javascript}video.js
}



[globalString = LIT:{$jqueryui}=/.+/]
page.includeJSFooterlibs {
	jqueryui = {$jqueryui}
}
page.includeCSS {
	jqueryui = {$plugin.tx_fluxtemplate.filepaths.css}jquery-ui/jquery-ui.min.css
}
[global]


[globalString = LIT:{$respondjs}=/.+/]
page.includeJSlibs {
	respondjs = {$respondjs}
}
[global]

# CSS/SCSS Files

page.includeCSS {

    bootstrap = {$plugin.tx_fluxtemplate.filepaths.scss}bootstrap_scss/_bootstrap.scss
    bootstrap.outputfile = {$plugin.tx_fluxtemplate.filepaths.css}bootstrap.min
    bootstrap.formatter = Leafo\ScssPhp\Formatter\Compressed

    font-awesome = {$plugin.tx_fluxtemplate.filepaths.scss}font-awesome/font-awesome.scss
    font-awesome.outputfile = {$plugin.tx_fluxtemplate.filepaths.css}font-awesome.min
    font-awesome.formatter = Leafo\ScssPhp\Formatter\Compressed

}

# Video JS

page.headerData.70 = TEXT 
page.headerData.70.value (

<script>
videojs.options.flash.swf = "{$plugin.tx_fluxtemplate.filepaths.javascript}video-js/video-js.swf"
</script>
)


page.includeJS {
	video-js = {$plugin.tx_fluxtemplate.filepaths.javascript}video-js/video.min.js
	mail = {$plugin.tx_fluxtemplate.filepaths.javascript}mail.js
}
