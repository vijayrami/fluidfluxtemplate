/*
 * Parallax Classic v1.4
 *
 * Copyright 2012-2013, LambertGroup
 * 
*/


(function($) {

	function animate_singular_text(elem,current_obj,options) {
		  var ver_ie=getInternetExplorerVersion();
		  //elem.stop();
		  if (options.responsive) {
			  newCss='';
			  if (elem.css('font-size').lastIndexOf('px')!=-1) {
				  fontSize=elem.css('font-size').substr(0,elem.css('font-size').lastIndexOf('px'));
				  //alert (fontSize+'  -   '+fontSize/(options.origWidth/options.width));
				  newCss+='font-size:'+fontSize/(options.origWidth/options.width)+'px;';
				  
			  } else if (elem.css('font-size').lastIndexOf('em')!=-1) {
				  fontSize=elem.css('font-size').substr(0,elem.css('font-size').lastIndexOf('em'));
				  newCss+='font-size:'+fontSize/(options.origWidth/options.width)+'em;';
			  }
			  
			  if (elem.css('line-height').lastIndexOf('px')!=-1) {
				  lineHeight=elem.css('line-height').substr(0,elem.css('line-height').lastIndexOf('px'));
				  newCss+='line-height:'+lineHeight/(options.origWidth/options.width)+'px;';
			  } else if (elem.css('line-height').lastIndexOf('em')!=-1) {
				  lineHeight=elem.css('line-height').substr(0,elem.css('line-height').lastIndexOf('em'));
				  newCss+='line-height:'+lineHeight/(options.origWidth/options.width)+'em;';
			  }
			  
			  elem.wrapInner('<div class="newFS" style="'+newCss+'" />');
			  
		  }
  
		  var leftPos;
		  var topPos;
		  var opacity_aux;
  
		  leftPos=elem.attr('data-final-left');
		  topPos=elem.attr('data-final-top');
		  if (options.responsive) {
			  leftPos=parseInt(leftPos/(options.origWidth/options.width),10);
			  topPos=parseInt(topPos/(options.origWidth/options.width),10);
		  }		
		  //elem.css({'display':'block'});
		  if (elem.attr('data-preanimate')!='true') {
			  var easing_aux=options.defaultEasing;
			  if (elem.attr('data-easing')!='' && elem.attr('data-easing')!=undefined) {
				  easing_aux=elem.attr('data-easing');
			  }
			  
			  opacity_aux=1;
			  if (current_obj.isVideoPlaying==true)
				 opacity_aux=0;
				 
			  if (ver_ie!=-1 && ver_ie<9) {
				  elem.css({'opacity':1 });
			  }
			  	 
			  elem.
			  stop()
			  .animate({
					  opacity: opacity_aux,
					  left:leftPos+'px',
					  top: topPos+'px'
					}, elem.attr('data-duration')*1000, easing_aux ,function() {

					  if (current_obj.isVideoPlaying==true) {
						 var alltexts = $(current_obj.currentImg.attr('data-text-id')).children();
						 alltexts.css("opacity",0);
					  }
					});		
		  } else {
				//alert ("aa: "+elem.attr('data-final-left'));
				/*opacity_aux=0;
				if (elem.attr('data-preshow')=='true')
				  opacity_aux=1;*/
				elem.css({
					'left':leftPos+'px',
					'top': topPos+'px',
					'opacity':1
				});
				/*if (i>=noOfText)
					  current_obj.slideIsRunning=false;	*/		  
		  }
	};
    
    
    
    
	function animate_texts(current_obj,curImg,options,parallax_classic_the,parallax_classic_container,bannerControls,isPrevious) {
		//jQuery.fx.off = false;
		/*if (!isPrevious)
			$(curImg.attr('data-text-id')).css("display","block");*/
		var thetexts = $(curImg.attr('data-text-id')).children();
		var theLeft;
		var theTop;


		var i=0;
		currentText_arr=Array();
		
		if (isPrevious) {
			$('.newFS', parallax_classic_container ).contents().unwrap();
		}
		thetexts.each(function() {
			currentText_arr[i] = $(this);
			var currentText=currentText_arr[i];
			//currentText.css({'display':'block'});
			
			
			if (isPrevious && currentText.attr('data-preanimate')=='true') {
				//alert (currentText.attr('data-final-left'))
				currentText.css({'display':'block'});
			 	theLeft=currentText.attr('data-final-left');
			  	theTop=currentText.attr('data-final-top');
			  	if (options.responsive) {
					theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
					theTop=parseInt(theTop/(options.origWidth/options.width),10);
			  	}					
				currentText.css({
					"left":theLeft+"px",
					"top":theTop+"px",					
					"opacity":1,
					"display":"block"
			  });	
			} else if (isPrevious) {
				currentText.css({
					"display":"none",
					"opacity":0
			  	});					
			} else {
				currentText.css({'display':'block'});
			}
			
			
			if (currentText.attr('data-preanimate')!='true') {
			  theLeft=currentText.attr('data-initial-left');
			  theTop=currentText.attr('data-initial-top');
			  if (options.responsive) {
					theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
					theTop=parseInt(theTop/(options.origWidth/options.width),10);
			  }		  
	
			  currentText.css({
					"left":theLeft+"px",
					"top":theTop+"px",
					"opacity":parseInt(currentText.attr('data-fade-start'),10)/100
			  });
			}
					
			if (!isPrevious) {			
					current_obj.timeouts_arr[current_obj.timeouts_arr.length]=setTimeout(function() { animate_singular_text(currentText,current_obj,options);}, (currentText.attr('data-delay')*1000));
					//setTimeout(function() { animate_singular_text(currentText,current_obj,options);}, (currentText.attr('data-delay')*1000));
			}
			
			i++;
		});
	};
	
	
	
	function animate_exit_texts(current_obj,options,parallax_classic_the,bannerControls) {
		//jQuery.fx.off = false;
		var thetexts = $(current_obj.currentImg.attr('data-text-id')).children();

		var i=0;
		currentText_arr=Array();
		thetexts.each(function() {
			currentText_arr[i] = $(this);
			var currentText=currentText_arr[i];
			//alert ('ss  --  '+currentText.attr('data-exit-left')+'   ---   '+currentText_arr[i]);
			//exit left
			var cur_exit_left=options.defaultExitLeft;
			if (currentText.attr('data-exit-left')!=undefined && currentText.attr('data-exit-left')!=''){
				cur_exit_left=parseInt(currentText.attr('data-exit-left')/(options.origWidth/options.width),10);
			}
			//exit top
			var cur_exit_top=options.defaultExitTop;
			if (currentText.attr('data-exit-top')!=undefined && currentText.attr('data-exit-top')!=''){
				cur_exit_top=parseInt(currentText.attr('data-exit-top')/(options.origWidth/options.width),10);
			}
			//exit duration
			var cur_exit_duration=options.defaultExitDuration;
			if (currentText.attr('data-exit-duration')!=undefined && currentText.attr('data-exit-duration')!=''){
				cur_exit_duration=parseFloat(currentText.attr('data-exit-duration'));
			}
			//exit delay
			var cur_exit_delay=options.defaultExitDelay;
			if (currentText.attr('data-exit-delay')!=undefined && currentText.attr('data-exit-delay')!=''){
				cur_exit_delay=parseFloat(currentText.attr('data-exit-delay'));
			}
			/*//exit fade
			var cur_exit_fade=options.defaultExitFade;
			if (currentText.attr('data-exit-fade')!=undefined && currentText.attr('data-exit-fade')!=''){
				cur_exit_fade=parseFloat(currentText.attr('data-exit-fade'));
			}*/
			//exit easing
			var cur_exit_easing=options.defaultExitEasing;
			if (currentText.attr('data-exit-easing')!=undefined && currentText.attr('data-exit-easing')!=''){
				cur_exit_easing=currentText.attr('data-exit-easing');
			}
			
			var cur_exit_off=options.defaultExitOFF.toString();
			if (currentText.attr('data-exit-off')!=undefined && currentText.attr('data-exit-off')!=''){
				cur_exit_off=currentText.attr('data-exit-off');
			}
			if (cur_exit_off=='true') {
				cur_exit_duration=0;
			}
			
			//alert ('cur_exit_left: '+cur_exit_left+'  ---  cur_exit_top: '+cur_exit_top+'  ---  cur_exit_fade: '+cur_exit_fade+'  ---  cur_exit_duration: '+cur_exit_duration+'  ---  cur_exit_easing: '+cur_exit_easing+'  ---  cur_exit_delay: '+cur_exit_delay);
			//alert (parseInt(currentText.attr('data-final-top')/(options.origWidth/options.width),10)+' == '+parseInt(currentText.css('top').substr(0,currentText.css('top').lastIndexOf('px')),10));
			if (cur_exit_duration>0 && parseInt(currentText.attr('data-final-top')/(options.origWidth/options.width),10)==parseInt(currentText.css('top').substr(0,currentText.css('top').lastIndexOf('px')),10)) {
				current_obj.timeouts_arr[current_obj.timeouts_arr.length]=setTimeout(function() { 
					//alert (cur_exit_duration+'  --  '+currentText);
					currentText
					.stop()
					.animate({
						left:cur_exit_left+'px',
						top: cur_exit_top+'px'/*,
						opacity: cur_exit_fade*/
					  }, cur_exit_duration*1000, cur_exit_easing ,function() {
						  //currentText.css({'display':'none'});
						  if (currentText.attr('data-preanimate')!='true' && cur_exit_off=='false'){
						    currentText.css({'display':'none'});
						  } else {
								theLeft=currentText.attr('data-final-left');
								theTop=currentText.attr('data-final-top');
								if (options.responsive) {
									theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
									theTop=parseInt(theTop/(options.origWidth/options.width),10);
								}					
								currentText.css({
									"left":theLeft+"px",
									"top":theTop+"px",					
									"opacity":1
							  });										  
						  }
					  });			
				
				}, (cur_exit_delay*1000));    
			} else {
				if (currentText.attr('data-preanimate')!='true' && cur_exit_off=='false'){
					currentText.css({'display':'none'});
				}
			}
            	
            i++;
        });		
	};	
	
	
	function preanimate_texts(imgs,options,parallax_classic_the,total_images) {
		var cur_Slide;
		for (k=0;k<total_images;k++) {
			cur_Slide = $(imgs[k]);
			//$(cur_Slide.attr('data-text-id')).css("display","block");
			var thetexts = $(cur_Slide.attr('data-text-id')).children();
	
			var i=0;
			currentText_arr=Array();
			thetexts.each(function() {
				  currentText_arr[i] = $(this);
				  var currentText=currentText_arr[i];
				  
				  if (currentText.attr('data-preanimate')=='true'){
					  currentText.css({'display':'block'});
					  var theLeft=currentText.attr('data-final-left');
					  var theTop=currentText.attr('data-final-top');
					  if (options.responsive) {
							theLeft=parseInt(theLeft/(options.origWidth/options.width),10);
							theTop=parseInt(theTop/(options.origWidth/options.width),10);
					  }		  
						/*opacity_aux=0;
						if (currentText.attr('data-preshow')=='true'){
							opacity_aux=parseFloat(currentText.attr('data-preshow'));
						}
						currentText.css({
								"opacity":opacity_aux
							});*/
					
						currentText.css({
							"left":theLeft+"px",
							"top":theTop+"px",
							"opacity":1
						});
					} else {
						currentText.css({'display':'none'});
					}
	
			});		
		}
	};	
	
	
	function clear_all_timeouts(timeoutsArr) {
		  if (timeoutsArr) for (var i in timeoutsArr) if (timeoutsArr[i]) clearTimeout(timeoutsArr[i]);
		  //timeoutsArr = [];
		  timeoutsArr.length = 0;
	}	
	
	//circ
	function the_arc(current_obj,options) {
			nowx = (new Date).getTime();
			if (!current_obj.mouseOverBanner && !current_obj.effectIsRunning && options.showCircleTimer && !current_obj.slideIsRunning) {	 
				current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
  	            
                current_obj.ctx.beginPath();
                current_obj.ctx.globalAlpha=options.behindCircleAlpha/100;
                current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 2 * Math.PI, false);
                current_obj.ctx.lineWidth = options.circleLineWidth+2;
                current_obj.ctx.strokeStyle = options.behindCircleColor;
                current_obj.ctx.stroke();
                

                current_obj.ctx.beginPath();
                current_obj.ctx.globalAlpha=options.circleAlpha/100;
                current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, ((current_obj.timeElapsed+nowx)-current_obj.arcInitialTime)/1000*2/options.autoPlay*Math.PI,  false);
                current_obj.ctx.lineWidth = options.circleLineWidth;
                current_obj.ctx.strokeStyle = options.circleColor;
                current_obj.ctx.stroke();
             }
    }	
	
    // navigation
	function parallax_classic_navigation(direction,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav){
		var navigateAllowed=true;
		var bgPrevNo;
		if ((!options.loop && current_obj.current_img_no+direction>=total_images) || (!options.loop && current_obj.current_img_no+direction<0))
			navigateAllowed=false;				
		
		if (navigateAllowed && !current_obj.slideIsRunning && current_obj.firstLoadingComplete) {
			current_obj.slideIsRunning=true;
			clear_all_timeouts(current_obj.timeouts_arr);
			bgPrevNo=current_obj.previous_current_img_no;
			//jQuery.fx.off = true;
			//alert ((current_obj.currentImg.attr('data-text-id')));
			//$(current_obj.currentImg.attr('data-text-id')).children().css({'opacity':0.5});
			$(current_obj.currentImg.attr('data-text-id')).children().clearQueue();

			animate_exit_texts(current_obj,options,parallax_classic_the,bannerControls);
			
			//$('.newFS', parallax_classic_container ).contents().unwrap();
			/*current_obj.arcInitialTime=(new Date).getTime();
			current_obj.timeElapsed=0;*/
			
				if (options.showCircleTimer) {
						//clearInterval(current_obj.intervalID);
	
						current_obj.ctx.clearRect(0,0,current_obj.canvas.width,current_obj.canvas.height);
						current_obj.ctx.beginPath();
						current_obj.ctx.globalAlpha=options.behindCircleAlpha/100;
						current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 2 * Math.PI, false);
						current_obj.ctx.lineWidth = options.circleLineWidth+2;
						current_obj.ctx.strokeStyle = options.behindCircleColor;
						current_obj.ctx.stroke();            
						
						
						current_obj.ctx.beginPath();
						current_obj.ctx.globalAlpha=options.circleAlpha/100;
						current_obj.ctx.arc(options.circleRadius+2*options.circleLineWidth, options.circleRadius+2*options.circleLineWidth, options.circleRadius, 0, 0,  false);
						current_obj.ctx.lineWidth = options.circleLineWidth;
						current_obj.ctx.strokeStyle = options.circleColor;
						current_obj.ctx.stroke();	
								
						//current_obj.intervalID=setInterval(function(){the_arc(current_obj,options)}, 125);
				}			
			
			
			
			//current_obj.previous_current_img_no=current_obj.current_img_no;
			/*//hide previous texts
			if (options.hideElementsOnPreviousSlide) {
				$(current_obj.currentImg.attr('data-text-id')).css("display","none");
			}*/
			
			
			//deactivate previous
			if (options.skin=="bullets") {
				$(bottomNavButs[current_obj.current_img_no]).removeClass('bottomNavButtonON');
			} else {
				 $(thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
			}
			

			parallax_classic_playOver.css('display','none');				
			
			//set current img
			if (current_obj.current_img_no+direction>=total_images) {
				current_obj.current_img_no=0;
			} else if (current_obj.current_img_no+direction<0) {
				current_obj.current_img_no=total_images-1;
			} else {
				current_obj.current_img_no+=direction;
			}
			
			//alert (direction+' -- '+current_obj.current_img_no+' -- '+total_images)

			
			
			
			
			//activate current
			if (options.showBottomNav) {
				if (options.skin=="bullets") {
					if (!options.autoHideBottomNav)
						parallax_classic_bottomNav.css("display","block");				
					$(bottomNavButs[current_obj.current_img_no]).addClass('bottomNavButtonON');				
				} else {
				   	if (!options.autoHideBottomNav)	
						parallax_classic_thumbsHolderWrapper.css("display","block");
	
				   $(thumbsHolder_Thumbs[current_obj.current_img_no]).addClass('thumbsHolder_ThumbON');
				   //auto scroll carousel if needed
				   currentCarouselLeft=parallax_classic_thumbsHolder.css('left').substr(0,parallax_classic_thumbsHolder.css('left').lastIndexOf('px'));
				   if (current_obj.current_img_no===0 || current_obj.current_img_no===total_images-1) {
					  carouselScroll(0,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				   } else {
					 carouselScroll(1001,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				  }
				}	
			}
			
			current_obj.currentImg = $(imgs[current_obj.current_img_no]);		


			parallax_classic_contentHolder.animate({
			    left:(-1)*current_obj.current_img_no*options.width+'px'
			  }, options.scrollSlideDuration*1000, options.scrollSlideEasing, function() {
			    // Animation complete.
				  current_obj.slideIsRunning=false;
				  
				  current_obj.arcInitialTime=(new Date).getTime();
				  current_obj.timeElapsed=0;	
				  
				  //jQuery.fx.off = true;
				  
				  if ($(imgs[current_obj.current_img_no]).attr('data-video')=='true')
					parallax_classic_playOver.css('display','block');

				  //reinit content to stop videos
				  if ($(imgs[current_obj.previous_current_img_no]).attr('data-video')=='true') {
				  		$('#contentHolderUnit_'+current_obj.previous_current_img_no, parallax_classic_container).html($(imgs[current_obj.previous_current_img_no]).html());
						resizeRepositionUnitContent(current_obj.previous_current_img_no,current_obj,options,imgs,parallax_classic_container,parallax_classic_the,bannerControls);					
				  }
				 
				  clear_all_timeouts(current_obj.timeouts_arr);
				  //reposition previous texts
			      animate_texts(current_obj,$(imgs[bgPrevNo]),options,parallax_classic_the,parallax_classic_container,bannerControls,true);
				  //position current texts				  
				  animate_texts(current_obj,current_obj.currentImg,options,parallax_classic_the,parallax_classic_container,bannerControls,false);

				  //show current text
				  /*if (options.hideElementsOnPreviousSlide) {
						$(current_obj.currentImg.attr('data-text-id')).css("display","block");
				  }*/
				  
				  if (options.autoPlay>0 && total_images>1 && !current_obj.mouseOverBanner) {
					  clearTimeout(current_obj.timeoutID);
					  current_obj.timeoutID=setTimeout(function(){current_obj.previous_current_img_no=current_obj.current_img_no; parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav)},options.autoPlay*1000);
				  }						  
			});					
			//alert (current_obj.current_img_no)

			
		} // if navigateAllowed
		
	};
	
		
		
		
		function resizeImg(imageToResize,arrayID,current_obj,options,isBg) {
			var origDim=current_obj.origImgsDimensions[arrayID].split(";");
			if (options.responsive) {	
				origDim[0]=origDim[0]/(options.origWidth/options.width);
				origDim[1]=origDim[1]/(options.origWidth/options.width);
			}
			
			imageToResize.width(origDim[0]);
			imageToResize.height(origDim[1]);
			
			//center bg image for w&H 100%
			if (isBg && options.width100Proc && options.height100Proc) {				
				//alert (imageToResize.attr('src'));
				imageToResize.css({
					'position':'relative',
					'left':parseInt(options.width-imageToResize.width(),10)+"px",
					'top':parseInt(options.height-imageToResize.height(),10)+"px"
				});
				//alert (imageToResize.height()+'  --  '+options.height+'    /    '+imageToResize.width()+'  --   '+options.width);
			}
		}
		
		
		function resizeRepositionUnitContent(arrayID,current_obj,options,imgs,parallax_classic_container,parallax_classic_the,bannerControls) {
			if (options.responsive) {
				imgInside = $('#contentHolderUnit_'+arrayID, parallax_classic_container).find('img:first');
				if (imgInside.width()!=null) {
					resizeImg(imgInside,arrayID,current_obj,options,true);
				}
				
				textIdChildren = $($(imgs[arrayID]).attr('data-text-id')).children();
				k=-1;
				textIdChildren.each(function() {
					k++;
					//alert ( $(this).attr('id') );
					imgInside = $(this).find('img:first');
					if (imgInside.width()!=null) {
						resizeImg(imgInside,($(imgs[arrayID]).attr('data-text-id')+'-'+k),current_obj,options,false);
					}
				});
				
				//reposition text
				$($(imgs[arrayID]).attr('data-text-id')).css({
					'width':options.width+'px',
					'left':parseInt(arrayID*options.width,10),
					'top':bannerControls.css('top')
				});
			}
		}
		
		
		
    function carouselScroll(direction,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj) {
		currentCarouselLeft=parallax_classic_thumbsHolder.css('left').substr(0,parallax_classic_thumbsHolder.css('left').lastIndexOf('px'));
		if (direction===1 || direction===-1) {
			current_obj.isCarouselScrolling=true;
			parallax_classic_thumbsHolder.css('opacity','0.5');
			parallax_classic_thumbsHolder.animate({
			    opacity: 1,
			    left: '+='+direction*current_obj.carouselStep
			  }, 500, 'easeOutCubic', function() {
			      // Animation complete.
				  disableCarouselNav(current_obj,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb);						  
				  current_obj.isCarouselScrolling=false;
			});				
		} else {
				if ( currentCarouselLeft != (-1) * Math.floor( current_obj.current_img_no/options.numberOfThumbsPerScreen )*current_obj.carouselStep) {
					current_obj.isCarouselScrolling=true;
					parallax_classic_thumbsHolder.css('opacity','0.5');
					parallax_classic_thumbsHolder.animate({
					    opacity: 1,
					    left: (-1) * Math.floor( current_obj.current_img_no/options.numberOfThumbsPerScreen )*current_obj.carouselStep
					  }, 500, 'easeOutCubic', function() {
					      // Animation complete.
						  disableCarouselNav(current_obj,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb);						  
						  current_obj.isCarouselScrolling=false;
					});
				}
		}
	
		
	};
	
	function disableCarouselNav(current_obj,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb) {
		currentCarouselLeft=parallax_classic_thumbsHolder.css('left').substr(0,parallax_classic_thumbsHolder.css('left').lastIndexOf('px'));
		if (currentCarouselLeft <0 ) {
			if (parallax_classic_carouselLeftNav.hasClass('carouselLeftNavDisabled'))
				parallax_classic_carouselLeftNav.removeClass('carouselLeftNavDisabled');
		} else {
			parallax_classic_carouselLeftNav.addClass('carouselLeftNavDisabled');
		}		
		
		if (Math.abs(currentCarouselLeft-current_obj.carouselStep)<(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images) {
			if (parallax_classic_carouselRightNav.hasClass('carouselRightNavDisabled'))
				parallax_classic_carouselRightNav.removeClass('carouselRightNavDisabled');
		} else {
			parallax_classic_carouselRightNav.addClass('carouselRightNavDisabled');
		}				
	};




			function rearangethumbs(current_obj,options,total_images,parallax_classic_container,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderVisibleWrapper,parallax_classic_thumbsHolderWrapper) {
						//thumbs
						
						if (options.skin=="thumbs") {
							parallax_classic_thumbsHolderWrapper.css({
								"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", 
								"top":"auto", 
								"height":parseInt(options.origthumbsHolderWrapperH/(options.origWidth/options.width),10)+"px"
							});

							bgTopCorrection=0;

							parallax_classic_carouselLeftNav.css('background-position','0px '+((parallax_classic_thumbsHolderWrapper.height()-options.origthumbsHolderWrapperH)/2+bgTopCorrection)+'px');
							parallax_classic_carouselRightNav.css('background-position','0px '+((parallax_classic_thumbsHolderWrapper.height()-options.origthumbsHolderWrapperH)/2+bgTopCorrection)+'px');
							
							parallax_classic_thumbsHolderVisibleWrapper.css('width',options.width-parallax_classic_carouselLeftNav.width()-parallax_classic_carouselRightNav.width());
							options.origWidthThumbsHolderVisibleWrapper=options.origWidth-parallax_classic_carouselLeftNav.width()-parallax_classic_carouselRightNav.width()	;				
							

							thumbsHolder_Thumbs.css({
								'width':parseInt(options.origThumbW/(options.origWidthThumbsHolderVisibleWrapper/parallax_classic_thumbsHolderVisibleWrapper.width()),10)+'px',
								'height':parseInt(options.origThumbH/(options.origWidthThumbsHolderVisibleWrapper/parallax_classic_thumbsHolderVisibleWrapper.width()),10)+'px'
	
							});
							
							
							if (options.numberOfThumbsPerScreen >= total_images) {
								parallax_classic_thumbsHolderVisibleWrapper.css('left',parseInt((parallax_classic_thumbsHolderWrapper.width() - (thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images)/2,10)+'px');
							}							
							
							
							var imageInside = $('.thumbsHolder_ThumbOFF', parallax_classic_container).find('img:first');

							imageInside.css({
								"width":thumbsHolder_Thumbs.width()+"px",
								"height":thumbsHolder_Thumbs.height()+"px",
								"margin-top":parseInt((parallax_classic_thumbsHolderWrapper.height()-thumbsHolder_Thumbs.height())/2,10)+"px"
							});
							
							
							
							current_obj.thumbMarginLeft=Math.floor( (parallax_classic_thumbsHolderWrapper.width()-parallax_classic_carouselLeftNav.width()-parallax_classic_carouselRightNav.width()-thumbsHolder_Thumb.width()*options.numberOfThumbsPerScreen)/(options.numberOfThumbsPerScreen-1) );
							thumb_i=-1;
							parallax_classic_thumbsHolder.children().each(function() {
								thumb_i++;
								theThumb = $(this);
								theThumb.css('background-position','center '+(options.thumbsOnMarginTop/(options.origWidth/options.width))+'px');
								if ( thumb_i<=0 ) {
									theThumb.css('margin-left',Math.floor( ( parallax_classic_thumbsHolderWrapper.width()-parallax_classic_carouselLeftNav.width()-parallax_classic_carouselRightNav.width()-(current_obj.thumbMarginLeft+theThumb.width())*(options.numberOfThumbsPerScreen-1) - theThumb.width() )/2 )+'px');
								} else {
									theThumb.css('margin-left',current_obj.thumbMarginLeft+'px');		
								}
							});

							current_obj.carouselStep=(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*options.numberOfThumbsPerScreen;

						}
			}		
		
	
	
		function doResize(current_obj,options,total_images,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolderVisibleWrapper,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,bottomNavButs,parallax_classic_leftNav,bottomNavBut,parallax_classic_bottomNav,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderVisibleWrapper,parallax_classic_thumbsHolderWrapper) {
					
					//var bodyOverflow_initial=$('body').css('overflow');
					//$('body').css('overflow','hidden');
					
					responsiveWidth=parallax_classic_the.parent().parent().width();
					responsiveHeight=parallax_classic_the.parent().parent().height();
					if (options.responsiveRelativeToBrowser) {
						responsiveWidth=$(window).width();
						responsiveHeight=$(window).height();
					}
					

					if (options.width100Proc) {
						options.width=responsiveWidth;
					}
					
					if (options.height100Proc) {
						options.height=responsiveHeight;
					}

					if (options.origWidth!=responsiveWidth || options.width100Proc) {
						if (options.origWidth>responsiveWidth || options.width100Proc) {
							options.width=responsiveWidth;
						} else if (!options.width100Proc) {
							options.width=options.origWidth;
						}
						if (!options.height100Proc)
							options.height=options.width/current_obj.bannerRatio;

						
						//set banner size
						parallax_classic_container.width(options.width);
						parallax_classic_container.height(options.height);
						
						parallax_classic_contentHolderVisibleWrapper.width(options.width);
						parallax_classic_contentHolderVisibleWrapper.height(options.height);
						
						parallax_classic_contentHolder.width(options.width);//initial width
						parallax_classic_contentHolder.height(options.height);
						
						//bannerControls.width('100%');
						//bannerControls.height('100%');
						bannerControls.css('margin-top',parseInt((options.height-parallax_classic_leftNav.height())/2,10)+'px');
						
						//if (options.preanimateElementsOverImage) {
							preanimate_texts(imgs,options,parallax_classic_the,total_images);		
						//}						

						
						contentHolderUnit = $('.contentHolderUnit', parallax_classic_container);
						contentHolderUnit.width(options.width);
						contentHolderUnit.height(options.height);

						holderWidth=options.width*total_images;
						for (i=0; i<total_images; i++) {
							resizeRepositionUnitContent(i,current_obj,options,imgs,parallax_classic_container,parallax_classic_the,bannerControls);													
						}

						
	
						parallax_classic_contentHolder.width(holderWidth);

						if (options.skin=="bullets") {
							if (options.thumbsWrapperMarginBottom>=0) {
								parallax_classic_bottomNav.css({
									"left": parseInt((parallax_classic_container.width()-parallax_classic_bottomNav.width())/2,10)+"px",
									"bottom": parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px",
									"top": "auto"
								});		
							} else {
								parallax_classic_bottomNav.css({
									"left": parseInt((parallax_classic_container.width()-parallax_classic_bottomNav.width())/2,10)+"px"
								});							}
						} else {
							rearangethumbs(current_obj,options,total_images,parallax_classic_container,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderVisibleWrapper,parallax_classic_thumbsHolderWrapper);
						}

						
							
		 
		 
					//playover
					parallax_classic_playOver.css({
						'left':parseInt((options.width-parallax_classic_playOver.width())/2,10)+'px',
						'top':parseInt((options.height-parallax_classic_playOver.height())/2,10)+'px'
					});

					
					clearTimeout(current_obj.timeoutID);
					
					parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav);
						
						
					}
					

					//$('body').css('overflow',bodyOverflow_initial);
			}	
			
			
			
			function getInternetExplorerVersion()
			// -1 - not IE
			// 7,8,9 etc
			{
			   var rv = -1; // Return value assumes failure.
			   if (navigator.appName == 'Microsoft Internet Explorer')
			   {
				  var ua = navigator.userAgent;
				  var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				  if (re.exec(ua) != null)
					 rv = parseFloat( RegExp.$1 );
			   }
			   return parseInt(rv,10);
			}						
	
	

	
	$.fn.parallax_classic = function(options) {

		var options = $.extend({},$.fn.parallax_classic.defaults, options);

		return this.each(function() {
			var parallax_classic_the = $(this);
					responsiveWidth=parallax_classic_the.parent().width();
					responsiveHeight=parallax_classic_the.parent().height();
					if (options.responsiveRelativeToBrowser) {
						responsiveWidth=$(window).width();
						responsiveHeight=$(window).height();
					}			
					options.origWidth=options.width;
					if (options.width100Proc)
						options.width=responsiveWidth;
					
					options.origHeight=options.height;
					if (options.height100Proc) {
						options.height=responsiveHeight;
					}
						
					if (options.responsive && (options.origWidth!=responsiveWidth || options.width100Proc)) {
						if (options.origWidth>responsiveWidth || options.width100Proc) {
							options.width=responsiveWidth;
						} else {
							options.width=options.origWidth;
						}
						if (!options.height100Proc)
							options.height=options.width/(options.origWidth/options.origHeight);	
					}			
			
			
			//the controllers
			var parallax_classic_wrap = $('<div></div>').addClass('parallax_classic').addClass(options.skin);
			var bannerControls = $('<div class="bannerControls">   <div class="leftNav"></div>   <div class="rightNav"></div>    </div>  <div class="contentHolderVisibleWrapper"><div class="contentHolder"></div></div>   <div class="playOver"></div>  <div class="thumbsHolderWrapper"><div class="thumbsHolderVisibleWrapper"><div class="thumbsHolder"></div></div></div>  <canvas class="mycanvas"></canvas>');
			parallax_classic_the.wrap(parallax_classic_wrap);
			parallax_classic_the.after(bannerControls);
			

			
			//the elements
			var parallax_classic_container = parallax_classic_the.parent('.parallax_classic');
			var bannerControls = $('.bannerControls', parallax_classic_container);
			
			
			var parallax_classic_contentHolderVisibleWrapper = $('.contentHolderVisibleWrapper', parallax_classic_container);
			var parallax_classic_contentHolder = $('.contentHolder', parallax_classic_container);			
			
			
			var bottomNavLeft_aux=$('<div class="bottomNavLeft"></div>');
			var bottomNav_aux=$('<div class="bottomNav"></div>');
			var bottomNavRight_aux=$('<div class="bottomNavRight"></div>');
			
			parallax_classic_the.after(bottomNavLeft_aux);
			parallax_classic_the.after(bottomNav_aux);
			parallax_classic_the.after(bottomNavRight_aux);
			 
			if (!options.showAllControllers)
				bannerControls.css("display","none");			
			
			
			var parallax_classic_leftNav = $('.leftNav', parallax_classic_container);
			var parallax_classic_rightNav = $('.rightNav', parallax_classic_container);
			parallax_classic_leftNav.css("display","none");
			parallax_classic_rightNav.css("display","none");			
			if (options.showNavArrows) {
				if (options.showOnInitNavArrows) {
					parallax_classic_leftNav.css("display","block");
					parallax_classic_rightNav.css("display","block");
				}
			}
			
			var parallax_classic_bottomNav = $('.bottomNav', parallax_classic_container);
			var parallax_classic_bottomNavLeft = $('.bottomNavLeft', parallax_classic_container);
			var parallax_classic_bottomNavRight = $('.bottomNavRight', parallax_classic_container);
			var parallax_classic_bottomOverThumb;
			parallax_classic_bottomNav.css("display","block");
			parallax_classic_bottomNavLeft.css("display","block");
			parallax_classic_bottomNavRight.css("display","block");

				parallax_classic_bottomNav.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});
				parallax_classic_bottomNavLeft.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});
				parallax_classic_bottomNavRight.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});			
			
			if (!options.showBottomNav) {
				parallax_classic_bottomNav.css("display","none");
				parallax_classic_bottomNavLeft.css("display","none");
				parallax_classic_bottomNavRight.css("display","none");
			}
			if (!options.showOnInitBottomNav) {
				parallax_classic_bottomNav.css("left","-5000px");
				parallax_classic_bottomNavLeft.css("left","-5000px");
				parallax_classic_bottomNavRight.css("left","-5000px");				
			}
			
			
			//thumbs
			var parallax_classic_thumbsHolderWrapper = $('.thumbsHolderWrapper', parallax_classic_container);
            var parallax_classic_thumbsHolderVisibleWrapper = $('.thumbsHolderVisibleWrapper', parallax_classic_container);
			var parallax_classic_thumbsHolder = $('.thumbsHolder', parallax_classic_container);
			
			var parallax_classic_carouselLeftNav;
			var parallax_classic_carouselRightNav;
			parallax_classic_carouselLeftNav=$('<div class="carouselLeftNav"></div>');
			parallax_classic_carouselRightNav=$('<div class="carouselRightNav"></div>');
			parallax_classic_thumbsHolderWrapper.append(parallax_classic_carouselLeftNav);
			parallax_classic_thumbsHolderWrapper.append(parallax_classic_carouselRightNav);
			parallax_classic_carouselRightNav.css('right','0');
			
			parallax_classic_thumbsHolder.css('width',parallax_classic_carouselLeftNav.width()+'px');
			
			if (!options.showBottomNav || !options.showOnInitBottomNav) {
				parallax_classic_thumbsHolderWrapper.css({
					"opacity":0,
					"display":"none"
				});
			}
				
				
			if (options.skin=="thumbs") {
					parallax_classic_thumbsHolderWrapper.css({"bottom":parseInt(options.thumbsWrapperMarginBottom/(options.origWidth/options.width),10)+"px", "top":"auto"});
			}			
			
			
			
			if (options.enableTouchScreen) {
				//parallax_classic_container.css('cursor','url(skins/hand.cur),url(skins/hand.cur),move');
				parallax_classic_contentHolder.css({
					'cursor':'url('+options.absUrl+'skins/hand.cur),url('+options.absUrl+'skins/hand.cur),move',
					'left':0+'px',
					'top':0+'px',
					'position':'absolute'
				});				
				
				parallax_classic_contentHolder.draggable({ 
					axis: 'x',
					distance:10,
					disabled: true,
					start: function(event, ui) {
						origLeft=parseInt($(this).css('left'),10);
						parallax_classic_playOver.css('display','none');
						current_obj.previous_current_img_no=current_obj.current_img_no;
					},
					stop: function(event, ui) {
						if (!current_obj.slideIsRunning) {
							finalLeft=parseInt($(this).css('left'),10);
							direction=1;
							//alert (origLeft+ ' < '+finalLeft);
							if (origLeft<finalLeft) {
								direction=-1;
							}	
							parallax_classic_navigation(direction,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav);
						}
					}
				});
		
			}
			
			
			
			
			//the vars
			
			var parallax_classic_playOver=$('.playOver', parallax_classic_container);
			parallax_classic_playOver.css({
				'left':parseInt((options.width-parallax_classic_playOver.width())/2,10)+'px',
				'top':parseInt((options.height-parallax_classic_playOver.height())/2,10)+'px'
			});
			
			$('.myloader', parallax_classic_container).css({
				'left':((options.width-$('.myloader', parallax_classic_container).width())/2)+'px',
				'top':((options.height-$('.myloader', parallax_classic_container).height())/2)+'px'
			});
			
			var total_images=0;
			var current_obj = {
					current_img_no:0,
					currentImg:0,
					previous_current_img_no:0,
					slideIsRunning:false,
					mouseOverBanner:false,
					isVideoPlaying:false,
					carouselStep:0,
					thumbMarginLeft:0,					
					timeoutID:'',
					intervalID:'',
					arcInitialTime:(new Date).getTime(),
					timeElapsed:0,
					windowWidth:0,
					origImgsDimensions:Array(),
					firstLoadingComplete:false,
					canvas:'',
					ctx:'',
					timeouts_arr:Array(),
					bannerRatio:options.origWidth/options.origHeight
				};				

			//var current_obj.timeoutID; // the autoplay timeout ID
			
			
			var previousBottomHovered=0;
			var i = 0;
			
			current_obj.canvas = $('.mycanvas', parallax_classic_container)[0];//here 3 out of if
			current_obj.canvas.width=2*options.circleRadius+4*options.circleLineWidth;
			current_obj.canvas.height=2*options.circleRadius+4*options.circleLineWidth;		
			
			var ver_ie=getInternetExplorerVersion();
			
			if (ver_ie!=-1 && ver_ie<9) {
			   options.showCircleTimer=false;
			}
			if (options.showCircleTimer) {				
				current_obj.ctx = current_obj.canvas.getContext('2d');
			}			

			
			//set banner size
			parallax_classic_container.width(options.width);
			parallax_classic_container.height(options.height);
			
			parallax_classic_contentHolderVisibleWrapper.width(options.width);
			parallax_classic_contentHolderVisibleWrapper.height(options.height);
			
			parallax_classic_contentHolder.width(options.width);//initial width
			parallax_classic_contentHolder.height(options.height);
			
			//bannerControls.width('100%');
			//bannerControls.height('100%');
			bannerControls.css('margin-top',parseInt((options.height-parallax_classic_leftNav.height())/2,10)+'px');
			
			//get images
			//var origImgsDimensions=new Array();
			/*var origSlidesImgsDimensions=new Array();
			var origTextsImgsDimensions=new Array();*/
			
			var theul=parallax_classic_the.find('ul:first');
			//alert (theul.attr("title"));
			
			var imgs = theul.children();
			var contentHolderUnit;
			var holderWidth=0;
			var bottomNavBut;
			var thumbsHolder_Thumb;
			var bottomNavWidth=0;
			var bottomNavMarginTop=0;
			var imgInside;		
			imgs.each(function() {
	            current_obj.currentImg = $(this);
	            if(!current_obj.currentImg.is('li')){
	            	current_obj.currentImg = current_obj.currentImg.find('li:first');
	            }
	            
	            //alert (current_obj.currentImg.attr('title'))
	            	
	            if(current_obj.currentImg.is('li')){
	            	total_images++;
	            	//'+current_obj.currentImg.html()+'
	            	contentHolderUnit = $('<div class="contentHolderUnit" rel="'+ (total_images-1) +'" id="contentHolderUnit_'+ (total_images-1) +'">'+current_obj.currentImg.html()+'</div>');
	            	contentHolderUnit.width(options.width);
	            	contentHolderUnit.height(options.height);
	            	parallax_classic_contentHolder.append(contentHolderUnit);
	            	holderWidth=holderWidth+options.width;
	            	//alert (holderWidth);
					
	            	imgInside = $('#contentHolderUnit_'+(total_images-1), parallax_classic_container).find('img:first');
	            	if (imgInside.width()!=null) {
						current_obj.origImgsDimensions[total_images-1]=imgInside.width()+';'+imgInside.height();
						if (options.responsive && options.origWidth!=responsiveWidth) {
							resizeImg(imgInside,(total_images-1),current_obj,options,true);
						}
					} else {
						current_obj.origImgsDimensions[total_images-1]=null;
					}
					//alert (current_obj.origImgsDimensions[total_images-1]);
	            	
					
					if (options.skin=="bullets") {
						//generate bottomNav
						bottomNavBut = $('<div class="bottomNavButtonOFF" rel="'+ (total_images-1) +'"></div>');
						parallax_classic_bottomNav.append(bottomNavBut);
						
						
						bottomNavWidth+=parseInt(bottomNavBut.css('padding-left').substring(0, bottomNavBut.css('padding-left').length-2),10)+bottomNavBut.width();
						bottomNavMarginTop=parseInt((parallax_classic_bottomNav.height()-parseInt(bottomNavBut.css('height').substring(0, bottomNavBut.css('height').length-2)))/2,10);
						//alert (bottomNavMarginTop);
						bottomNavBut.css('margin-top',bottomNavMarginTop+'px');					
					} else { //thumbs generate thumbsHolder             
						image_name=$(imgs[total_images-1]).attr('data-bottom-thumb');
						thumbsHolder_Thumb = $('<div class="thumbsHolder_ThumbOFF" rel="'+ (total_images-1) +'"><img src="'+ image_name + '"></div>');
						parallax_classic_thumbsHolder.append(thumbsHolder_Thumb);
						if (options.origThumbW==0) {
	
							if (options.numberOfThumbsPerScreen==0) {
								options.numberOfThumbsPerScreen=Math.floor((options.origWidth-parallax_classic_carouselLeftNav.width()-parallax_classic_carouselRightNav.width())/thumbsHolder_Thumb.width());
							}
							options.origThumbW=thumbsHolder_Thumb.width();
							options.origThumbH=thumbsHolder_Thumb.height();
							options.origthumbsHolderWrapperH=parallax_classic_thumbsHolderWrapper.height();
							current_obj.thumbMarginLeft=Math.floor( (options.origWidth-parallax_classic_carouselLeftNav.width()-parallax_classic_carouselRightNav.width()-thumbsHolder_Thumb.width()*options.numberOfThumbsPerScreen)/(options.numberOfThumbsPerScreen-1) );
						}
	
	
						parallax_classic_thumbsHolder.css('width',parallax_classic_thumbsHolder.width()+current_obj.thumbMarginLeft+thumbsHolder_Thumb.width()+'px');
					
						thumbsHolder_MarginTop=parseInt((parallax_classic_thumbsHolderWrapper.height()-parseInt(thumbsHolder_Thumb.css('height').substring(0, thumbsHolder_Thumb.css('height').length-2)))/2,10);
						
						
                	}					
		            
		            parallax_classic_contentHolder.append($(current_obj.currentImg.attr('data-text-id')));
		    		$(current_obj.currentImg.attr('data-text-id')).css({
						'width':options.width+'px',
						/*'height':options.height+'px',
						'width':'100%',
						'border':'1px solid #FF0',*/
						'height':'100%',
						'overflow':'hidden',
						'left':parseInt((total_images-1)*options.width,10),
						'top':bannerControls.css('top')
					});
					
	            	
					
					var textIdChildren = $(current_obj.currentImg.attr('data-text-id')).children();
					var k=-1;
					textIdChildren.each(function() {
						k++;
						//alert ( $(this).attr('id') );
						imgInside = $(this).find('img:first');
						if (imgInside.width()!=null) {
							current_obj.origImgsDimensions[current_obj.currentImg.attr('data-text-id')+'-'+k]=imgInside.width()+';'+imgInside.height();
							if (options.responsive && options.origWidth!=responsiveWidth) {	
								resizeImg(imgInside,(current_obj.currentImg.attr('data-text-id')+'-'+k),current_obj,options,false);
							}
						} else {
							current_obj.origImgsDimensions[current_obj.currentImg.attr('data-text-id')+'-'+k]=null;
						}
					});

	            }	            

	        });		

			parallax_classic_contentHolder.width(holderWidth);
			
			
			if (options.skin=="bullets") {
				parallax_classic_bottomNav.width(bottomNavWidth);
				if (options.showOnInitBottomNav) {
					parallax_classic_bottomNav.css("left",parseInt((parallax_classic_container.width()-bottomNavWidth)/2,10)+'px');
					parallax_classic_bottomNavLeft.css("left",parseInt(parallax_classic_bottomNav.css('left').substring(0, parallax_classic_bottomNav.css('left').length-2),10)-parallax_classic_bottomNavLeft.width()+'px');
					parallax_classic_bottomNavRight.css("left",parseInt(parallax_classic_bottomNav.css('left').substring(0, parallax_classic_bottomNav.css('left').length-2),10)+parallax_classic_bottomNav.width()+parseInt(bottomNavBut.css('padding-left').substring(0, bottomNavBut.css('padding-left').length-2),10)+'px');
				}	
			} else {//thumbs
				parallax_classic_thumbsHolderVisibleWrapper.css({
					'width':(options.origWidth-parallax_classic_carouselLeftNav.width()-parallax_classic_carouselRightNav.width()),
					'left':parallax_classic_carouselLeftNav.width()+'px'
				});
				
				current_obj.carouselStep=(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*options.numberOfThumbsPerScreen;
				//disable left nav
				parallax_classic_carouselLeftNav.addClass('carouselLeftNavDisabled');
				
				//disable right nav and center thumbs
				if (options.numberOfThumbsPerScreen >= total_images) {
					parallax_classic_carouselRightNav.addClass('carouselRightNavDisabled');
					parallax_classic_carouselLeftNav.css('display','none');
					parallax_classic_carouselRightNav.css('display','none');
					parallax_classic_thumbsHolderVisibleWrapper.css('left',parseInt((parallax_classic_thumbsHolderWrapper.width() - (thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images)/2,10)+'px');
				}
				
				//parallax_classic_thumbsHolderWrapper.css("top",options.height+'px');
				
	
				var img_inside = $('.thumbsHolder_ThumbOFF', parallax_classic_container).find('img:first');
				img_inside.css("margin-top",thumbsHolder_MarginTop+"px");
				options.origthumbsHolder_MarginTop=thumbsHolder_MarginTop;
			}
			thumbsHolder_Thumbs=$('.thumbsHolder_ThumbOFF', parallax_classic_container);
			rearangethumbs(current_obj,options,total_images,parallax_classic_container,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderVisibleWrapper,parallax_classic_thumbsHolderWrapper);				
			
			//for youtube iframes
			$("iframe", parallax_classic_container).each(function(){
			      var ifr_source = $(this).attr('src');
				  var wmode = "?wmode=transparent";
				  if ( ifr_source.indexOf('?')!=-1 )
				  	wmode = "&wmode=transparent";
			      $(this).attr('src',ifr_source+wmode);
			});
			
			
	        //initialize first number image
			current_obj.current_img_no=0;			
	        
	        
			current_obj.currentImg = $(imgs[0]);
	        
	        
	        

			
/*
	        //Event when Animation finishes
			parallax_classic_container.bind('effectComplete', function(){
				current_obj.slideIsRunning=false;
				
				
				//alert (current_obj.currentImg.attr('data-text-id'));
				animate_texts(current_obj,options,parallax_classic_the,bannerControls);
				
				if (options.autoPlay>0 && total_images>1 && !current_obj.mouseOverBanner) {
					clearTimeout(current_obj.timeoutID);
					current_obj.timeoutID=setTimeout(function(){ parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav)},options.autoPlay*1000);
				}				
	        }); //bind
*/			
			

			
			//pause on hover
			parallax_classic_container.mouseenter(function() {
				if (options.pauseOnMouseOver && total_images>1 && current_obj.firstLoadingComplete) {
					current_obj.mouseOverBanner=true;
					clearTimeout(current_obj.timeoutID);
					nowx = (new Date).getTime();
					current_obj.timeElapsed=current_obj.timeElapsed+(nowx-current_obj.arcInitialTime);
				}
				
				
				if (options.autoHideNavArrows && options.showNavArrows) {
					parallax_classic_leftNav.css("display","block");
					parallax_classic_rightNav.css("display","block");
				}
				if (options.autoHideBottomNav && options.showBottomNav) {
					if (options.skin=="bullets") {
						parallax_classic_bottomNav.css({
							'display':'block',
							'left':parseInt((parallax_classic_container.width()-bottomNavWidth)/2,10)+'px'
						});
						
						parallax_classic_bottomNavLeft.css({
							'display':'block',
							'left':parseInt(parallax_classic_bottomNav.css('left').substring(0, parallax_classic_bottomNav.css('left').length-2),10)-parallax_classic_bottomNavLeft.width()+'px'
							
						});
						
						parallax_classic_bottomNavRight.css({
							'display':'block',
							'left':parseInt(parallax_classic_bottomNav.css('left').substring(0, parallax_classic_bottomNav.css('left').length-2),10)+parallax_classic_bottomNav.width()+parseInt(bottomNavBut.css('padding-left').substring(0, bottomNavBut.css('padding-left').length-2),10)+'px'
						});
					} else {
						
						 	if (options.thumbsWrapperMarginBottom<0 && current_obj.isVideoPlaying) {
                       			//nothing
							} else {
								if (options.showBottomNav) {
									parallax_classic_thumbsHolderWrapper.css({
										"display":"block"
									});
									parallax_classic_thumbsHolderWrapper
									.stop()
									.animate({
										opacity:1
									}, 500, 'swing', function() {
									 //complete
									});
								}								
							}
                     
					}
	
					
				}				
			});
			
			parallax_classic_container.mouseleave(function() {
				if (options.pauseOnMouseOver && total_images>1 && current_obj.firstLoadingComplete) {
					current_obj.mouseOverBanner=false;					
				}
				
				if (options.autoHideNavArrows && options.showNavArrows) {
					parallax_classic_leftNav.css("display","none");
					parallax_classic_rightNav.css("display","none");
				}
				if (options.autoHideBottomNav && options.showBottomNav) {
					if (options.skin=="bullets") {
						parallax_classic_bottomNav.css("display","none");
						parallax_classic_bottomNavLeft.css("display","none");
						parallax_classic_bottomNavRight.css("display","none");
					}	else {
							parallax_classic_thumbsHolderWrapper
										.stop()
										.animate({
											opacity:0
										}, 300, 'swing', function() {
										 //complete
										});
					  }					
				}
				if (options.autoPlay>0 && total_images>1 && !current_obj.isVideoPlaying && options.pauseOnMouseOver && current_obj.firstLoadingComplete) {
					clearTimeout(current_obj.timeoutID);
					nowx = (new Date).getTime();
					current_obj.arcInitialTime = (new Date).getTime();
					var new_delay = parseInt(options.autoPlay*1000-((current_obj.timeElapsed+nowx)-current_obj.arcInitialTime),10);
					current_obj.timeoutID=setTimeout(function(){ parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav)},new_delay);
				}
			});
			
			
			
			var contentHolderUnit=$('.contentHolderUnit', parallax_classic_contentHolder);
			contentHolderUnit.click(function() {
				var i=$(this).attr('rel');
                if ($(imgs[current_obj.current_img_no]).attr('data-video')=='true') {
					if (i!=current_obj.current_img_no) {
						current_obj.isVideoPlaying=false;
					} else {
						clearTimeout(current_obj.timeoutID);	
						imgInside = $(this).find('img:first');
						imgInside.css('display','none');
						parallax_classic_playOver.css('display','none');
						current_obj.isVideoPlaying=true;
						
						if (options.skin=="thumbs" && options.thumbsWrapperMarginBottom>(-1)*options.origthumbsHolderWrapperH) {
                       			parallax_classic_thumbsHolderWrapper.css("display","none");
						}
 						if (options.skin=="bullets" && options.thumbsWrapperMarginBottom>=0) {
					   			parallax_classic_bottomNav.css("display","none");								
						}					

					}
				} else {
					if ($(imgs[current_obj.current_img_no]).attr('data-link')!=undefined && i==current_obj.current_img_no && $(imgs[current_obj.current_img_no]).attr('data-link')!='') {
						
						var cur_target=options.target;
						if ($(imgs[current_obj.current_img_no]).attr('data-target')!=undefined && $(imgs[current_obj.current_img_no]).attr('data-target')!=''){
							cur_target=$(imgs[current_obj.current_img_no]).attr('data-target');
						}
						
						if (cur_target=="_blank")
							window.open($(imgs[current_obj.current_img_no]).attr('data-link'));
						else
							window.location = $(imgs[current_obj.current_img_no]).attr('data-link');
					}
				}
			});
			
			parallax_classic_playOver.click(function() {
				parallax_classic_playOver.css('display','none');						
				clearTimeout(current_obj.timeoutID);	
				imgInside = $('#contentHolderUnit_'+current_obj.current_img_no, parallax_classic_container).find('img:first');
				imgInside.css('display','none');
				current_obj.isVideoPlaying=true;	
				
				if (options.skin=="thumbs" && options.thumbsWrapperMarginBottom>(-1)*options.origthumbsHolderWrapperH) {
						parallax_classic_thumbsHolderWrapper.css("display","none");
				}
				if (options.skin=="bullets" && options.thumbsWrapperMarginBottom>=0) {
						parallax_classic_bottomNav.css("display","none");								
				}				
			});			
			
			
			var allTexts=$('.parallax_classic_texts', parallax_classic_container);
			allTexts.click(function() {
				  if ($(imgs[current_obj.current_img_no]).attr('data-link')!=undefined && $(imgs[current_obj.current_img_no]).attr('data-link')!='' && !current_obj.slideIsRunning) {
					  var cur_target=options.target;
					  if ($(imgs[current_obj.current_img_no]).attr('data-target')!=undefined && $(imgs[current_obj.current_img_no]).attr('data-target')!=''){
						  cur_target=$(imgs[current_obj.current_img_no]).attr('data-target');
					  }
					  
					  if (cur_target=="_blank")
						  window.open($(imgs[current_obj.current_img_no]).attr('data-link'));
					  else
						  window.location = $(imgs[current_obj.current_img_no]).attr('data-link');
				  }
			});	
			
			
			
			
			//controllers
			parallax_classic_leftNav.click(function() {
				if (!current_obj.slideIsRunning) {
					current_obj.isVideoPlaying=false;
					current_obj.previous_current_img_no=current_obj.current_img_no;
					clearTimeout(current_obj.timeoutID);
					parallax_classic_navigation(-1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav);
				}
			});
			parallax_classic_rightNav.click(function() {
				if (!current_obj.slideIsRunning) {
					current_obj.isVideoPlaying=false;
					current_obj.previous_current_img_no=current_obj.current_img_no;
					clearTimeout(current_obj.timeoutID);
					parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav);
				}
			});
			
			
			
			var TO = false;
			$(window).resize(function() {
				var ver_ie=getInternetExplorerVersion();
				doResizeNow=true;
				if (navigator.userAgent.indexOf('Android') != -1) {
					if (options.windowOrientationScreenSize0==0 && window.orientation==0)
						options.windowOrientationScreenSize0=$(window).width();
						
					if (options.windowOrientationScreenSize90==0 && window.orientation==90)
						options.windowOrientationScreenSize90=$(window).height();	
						
					if (options.windowOrientationScreenSize_90==0 && window.orientation==-90)
						options.windowOrientationScreenSize_90=$(window).height();						
					
					if (options.windowOrientationScreenSize0 && window.orientation==0 && $(window).width()>options.windowOrientationScreenSize0)	
						doResizeNow=false;

					if (options.windowOrientationScreenSize90 && window.orientation==90 && $(window).height()>options.windowOrientationScreenSize90)	
						doResizeNow=false;
						
					if (options.windowOrientationScreenSize_90 && window.orientation==-90 && $(window).height()>options.windowOrientationScreenSize_90)	
						doResizeNow=false;	
						
						
					if (current_obj.windowWidth==0) {
						doResizeNow=false;
						current_obj.windowWidth=$(window).width();
					}

				}
				if (ver_ie!=-1 && ver_ie==9 && current_obj.windowWidth==0)
					doResizeNow=false;
				
				
				if (current_obj.windowWidth==$(window).width()) {
					doResizeNow=false;
					if (options.windowCurOrientation!=window.orientation && navigator.userAgent.indexOf('Android') != -1) {
						options.windowCurOrientation=window.orientation;
						doResizeNow=true;
					}
				} else
					current_obj.windowWidth=$(window).width();
				
				
				
				if (options.responsive && doResizeNow) {
					 if(TO !== false)
						clearTimeout(TO);
					 
					
					 TO = setTimeout(function(){ doResize(current_obj,options,total_images,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolderVisibleWrapper,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,bottomNavButs,parallax_classic_leftNav,bottomNavBut,parallax_classic_bottomNav,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderVisibleWrapper,parallax_classic_thumbsHolderWrapper) }, 300); //200 is time in miliseconds
				}
			});			
			
			
			
			
			if (options.skin=="bullets") {
			//bottom nav
				var bottomNavButs=$('.bottomNavButtonOFF', parallax_classic_container);
				bottomNavButs.click(function() {
					if (!current_obj.slideIsRunning && current_obj.firstLoadingComplete) {
						current_obj.isVideoPlaying=false;
						
						var currentBut=$(this);
						var i=currentBut.attr('rel');
						if (current_obj.current_img_no != i) {
							//deactivate previous 
							$(bottomNavButs[current_obj.current_img_no]).removeClass('bottomNavButtonON');
							current_obj.previous_current_img_no=current_obj.current_img_no;
							  //reinit content to stop videos
							 /* if ($(imgs[current_obj.previous_current_img_no]).attr('data-video')=='true') {
									$('#contentHolderUnit_'+current_obj.previous_current_img_no, parallax_classic_container).html($(imgs[current_obj.previous_current_img_no]).html());
									resizeRepositionUnitContent(current_obj.previous_current_img_no,current_obj,options,imgs,parallax_classic_container,parallax_classic_the,bannerControls);					
							  }*/
							
		
							current_obj.current_img_no=i-1;
							parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav);
							
							//alert (i+'  --  '+current_obj.current_img_no+'  --  '+total_images);
						}
					}
				});
				
				bottomNavButs.mouseenter(function() {
					var currentBut=$(this);
					var i=currentBut.attr('rel');
					
					
					
					if (options.showPreviewThumbs) {
						parallax_classic_bottomOverThumb = $('<div class="bottomOverThumb"></div>');
						currentBut.append(parallax_classic_bottomOverThumb);
						var image_name=$(imgs[i]).attr('data-bottom-thumb');
						var previous_image=$(imgs[previousBottomHovered]).attr('data-bottom-thumb');
						var thumb_marginLeft=80; //80 thumb width, 4 border
						var thumb_marginLeftFinal=-80;
						if (previousBottomHovered>i) {
						   thumb_marginLeft=-80;
						   thumb_marginLeftFinal=80;
						 }
						var thumb_marginTop=-80;
						parallax_classic_bottomOverThumb.html('');
						parallax_classic_bottomOverThumb.html('<div class="innerBottomOverThumb"><img src="'+ previous_image + '"style="margin:0px;" id="oldThumb"><img src="'+ image_name + '" style="margin-top:'+thumb_marginTop+'px; margin-left:'+thumb_marginLeft+'px;" id="newThumb"></div>');
						$('#newThumb')
							 .stop()
							 .animate({
								marginLeft:'0px'
							  },150,function(){
									parallax_classic_bottomOverThumb.html('<div class="innerBottomOverThumb"><img src="'+ image_name + '"></div>'); //opera fix
							  });                    
						$('#oldThumb')
							 .stop()
							 .animate({
								marginLeft:thumb_marginLeftFinal+'px'
							  },150,function(){
									//
							  });
						previousBottomHovered=i;
					}
					
					currentBut.addClass('bottomNavButtonON');
				});
				
				bottomNavButs.mouseleave(function() {
					var currentBut=$(this);
					var i=currentBut.attr('rel');
	
					if (options.showPreviewThumbs) {
						parallax_classic_bottomOverThumb.remove();
					}				
					
					if (current_obj.current_img_no!=i)
						currentBut.removeClass('bottomNavButtonON');
				});			
			
            } ////if (options.skin=="bullets") {	
			
			
			


			//thumbs bottom nav
			thumbsHolder_Thumbs.mousedown(function() {
				arrowClicked=true;
				if (!current_obj.effectIsRunning && current_obj.firstLoadingComplete) {
				    current_obj.isVideoPlaying=false;
					var currentBut=$(this);
					var i=currentBut.attr('rel');
					if (current_obj.current_img_no != i) {
						//deactivate previous 
						$(thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
						current_obj.previous_current_img_no=current_obj.current_img_no;
						  //reinit content to stop videos
						  /*if ($(imgs[current_obj.previous_current_img_no]).attr('data-video')=='true') {
								$('#contentHolderUnit_'+current_obj.previous_current_img_no, parallax_classic_container).html($(imgs[current_obj.previous_current_img_no]).html());
								resizeRepositionUnitContent(current_obj.previous_current_img_no,current_obj,options,imgs,parallax_classic_container,parallax_classic_the,bannerControls);					
						  }*/
						
						current_obj.current_img_no=i-1;
						parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav);
					}
				}
			});
			thumbsHolder_Thumbs.mouseup(function() {
				arrowClicked=false;
			});				
			
			thumbsHolder_Thumbs.mouseenter(function() {
				var currentBut=$(this);
				var i=currentBut.attr('rel');
				
				currentBut.addClass('thumbsHolder_ThumbON');
			});
			
			thumbsHolder_Thumbs.mouseleave(function() {
				var currentBut=$(this);
				var i=currentBut.attr('rel');

				if (current_obj.current_img_no!=i)
					currentBut.removeClass('thumbsHolder_ThumbON');
			});	
			
			
			//carousel controllers
			parallax_classic_carouselLeftNav.click(function() {
				if (!current_obj.isCarouselScrolling) {
					currentCarouselLeft=parallax_classic_thumbsHolder.css('left').substr(0,parallax_classic_thumbsHolder.css('left').lastIndexOf('px'));

					if (currentCarouselLeft <0 ) 
						carouselScroll(1,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				}
			});
			
			
			parallax_classic_carouselRightNav.click(function() {
				if (!current_obj.isCarouselScrolling) {
					currentCarouselLeft=parallax_classic_thumbsHolder.css('left').substr(0,parallax_classic_thumbsHolder.css('left').lastIndexOf('px'));
					if (Math.abs(currentCarouselLeft-current_obj.carouselStep)<(thumbsHolder_Thumb.width()+current_obj.thumbMarginLeft)*total_images) 
						carouselScroll(-1,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,options,total_images,thumbsHolder_Thumb,current_obj);
				}
			});
			
			


			//first start autoplay
			if (options.skin=="bullets") {
				
				$(bottomNavButs[current_obj.current_img_no]).addClass('bottomNavButtonON');
			} else {
				$(thumbsHolder_Thumbs[current_obj.current_img_no]).addClass('thumbsHolder_ThumbON');
			}
			
			
			setTimeout (function () {
				$('.myloader', parallax_classic_container).css('display','none');
				
				//if (options.preanimateElementsOverImage) {
					preanimate_texts(imgs,options,parallax_classic_the,total_images);		
				//}
				
				current_obj.firstLoadingComplete=true;
				if (options.enableTouchScreen) {
					parallax_classic_contentHolder.draggable( "option", "disabled", false );
				}
				current_obj.arcInitialTime = (new Date).getTime();
				current_obj.mouseOverBanner=false;
				current_obj.timeElapsed=0;				
				//generate the text for first image
				animate_texts(current_obj,current_obj.currentImg,options,parallax_classic_the,parallax_classic_container,bannerControls,false,current_obj.current_img_no);
				
				if (options.autoPlay>0 && total_images>1) {
					if (options.showCircleTimer) {
						current_obj.intervalID=setInterval(function(){the_arc(current_obj,options)}, 125);
					}				
					
					current_obj.timeoutID=setTimeout(function(){ parallax_classic_navigation(1,current_obj,options,total_images,bottomNavButs,imgs,parallax_classic_the,bannerControls,parallax_classic_contentHolder,parallax_classic_container,parallax_classic_playOver,thumbsHolder_Thumbs,parallax_classic_thumbsHolder,parallax_classic_carouselLeftNav,parallax_classic_carouselRightNav,thumbsHolder_Thumb,parallax_classic_thumbsHolderWrapper,parallax_classic_bottomNav)},options.autoPlay*1000);
				}
			}, options.myloaderTime*1000 );

			if ($(imgs[current_obj.current_img_no]).attr('data-video')=='true')
				parallax_classic_playOver.css('display','block');
				
			
			
		});
	};

	
	//
	// plugin skins
	//
	$.fn.parallax_classic.defaults = {
			skin: 'bullets',
			width:918,
			height:382,
			width100Proc:false,
			height100Proc:false,			
			autoPlay:7,
			loop:true,
			target:"_blank", //_blank/_self
			absUrl:'',
			showAllControllers:true,
			showNavArrows:true,
			showOnInitNavArrows:true, // o1
			autoHideNavArrows:true, // o1
			showBottomNav:true,
			showOnInitBottomNav:true, // o2
			autoHideBottomNav:true, // o2
			showPreviewThumbs:true,
			enableTouchScreen:true,
			
			pauseOnMouseOver:true,
			showCircleTimer:true,
			showCircleTimerIE8IE7:false,
			circleRadius:10,
			circleLineWidth:4,
			circleColor: "#FF0000",
			circleAlpha: 100,
			behindCircleColor: "#000000",
			behindCircleAlpha: 50,
			responsive:false,
			responsiveRelativeToBrowser:true,
			
			thumbsWrapperMarginBottom:-35,
			
			scrollSlideDuration:0.8,
			scrollSlideEasing:'easeOutQuad',
			numberOfThumbsPerScreen:0,
			thumbsOnMarginTop:10,
			defaultEasing:'swing', //texts/elements over image Easing
			//preanimateElementsOverImage:false,
			//hideElementsOnPreviousSlide:true,
			myloaderTime:4,
			defaultExitLeft:0,
			defaultExitTop:0,
			defaultExitDuration:0,
			defaultExitDelay:0,
			//defaultExitFade:1,
			defaultExitEasing:'swing',
			defaultExitOFF:false,
			
			origWidth:0,
			origHeight:0,
			origThumbW:0,
			origThumbH:0,
			origthumbsHolderWrapperH:0,
			origWidthThumbsHolderVisibleWrapper:0,	
			windowOrientationScreenSize0:0,
			windowOrientationScreenSize90:0,
			windowOrientationScreenSize_90:0,
			windowCurOrientation:0			
			
	};

})(jQuery);
