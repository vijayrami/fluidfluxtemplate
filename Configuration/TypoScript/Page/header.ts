###################################################
# Page header
###################################################



page = PAGE
page {

	headerData {
		
		20 = TEXT
		20.value (
<meta name="viewport" content="width=device-width, initial-scale=1.0">
)


	}
}

[globalString = LIT:{$jsMobify}=/.+/]
page.headTag = <head><script>!function(a,b,c,d,e){function g(a,c,d,e){var f=b.getElementsByTagName("script")[0];a.src=e,a.id=c,a.setAttribute("class",d),f.parentNode.insertBefore(a,f)}a.Mobify={points:[+new Date]};var f=/((; )|#|&|^)mobify=(\d)/.exec(location.hash+"; "+b.cookie);if(f&&f[3]){if(!+f[3])return}else if(!c())return;b.write('<plaintext style="display:none">'),setTimeout(function(){var c=a.Mobify=a.Mobify||{};c.capturing=!0;var f=b.createElement("script"),h="mobify",i=function(){var c=new Date;c.setTime(c.getTime()+3e5),b.cookie="mobify=0; expires="+c.toGMTString()+"; path=/",a.location=a.location.href};f.onload=function(){if(e)if("string"==typeof e){var c=b.createElement("script");c.onerror=i,g(c,"main-executable",h,mainUrl)}else a.Mobify.mainExecutable=e.toString(),e()},f.onerror=i,g(f,"mobify-js",h,d)})}(window,document,function(){a=/webkit|(firefox)[\/\s](\d+)|(opera)[\s\S]*version[\/\s](\d+)|(trident)[\/\s](\d+)|3ds/i.exec(navigator.userAgent);return!a||a[1]&&4>+a[2]||a[3]&&11>+a[4]||a[5]&&6>+a[6]?!1:!0},"{$jsMobify}",function() {var capturing = window.Mobify && window.Mobify.capturing || false;if (capturing) { console.log("Executing main during capturing phase!");Mobify.Capture.init(function(capture){var capturedDoc = capture.capturedDoc;capture.renderCapturedDoc();});}});</script>
[global]


# Favicon
[globalString = LIT:{$favicon}=/.+/]
page.shortcutIcon = {$favicon}
[global]

# Apple Touch Icons
page.headerData.870 = IMG_RESOURCE
page.headerData.870.file = {$appleTouchIcon57}
page.headerData.870.stdWrap {
  wrap = <link href="|" rel="apple-touch-icon-precomposed" />
  required = 1
}
page.headerData.871 = IMG_RESOURCE
page.headerData.871.file = {$appleTouchIcon72}
page.headerData.871.stdWrap {
  wrap = <link href="|" rel="apple-touch-icon-precomposed" sizes="72x72" />
  required = 1
}
page.headerData.872 = IMG_RESOURCE
page.headerData.872.file = {$appleTouchIcon114}
page.headerData.872.stdWrap {
  wrap = <link href="|" rel="apple-touch-icon-precomposed" sizes="114x114" />
  required = 1
}
page.headerData.873 = IMG_RESOURCE
page.headerData.873.file = {$appleTouchIcon144}
page.headerData.873.stdWrap {
  wrap = <link href="|" rel="apple-touch-icon-precomposed" sizes="144x144" />
  required = 1
}