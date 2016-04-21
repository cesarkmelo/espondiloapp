// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: false,
	swipeBackPageThreshold: 1,
	swipePanel: "left",
	swipePanelCloseOpposite: true,
	pushState: true,
	pushStateRoot: undefined,
	pushStateNoAnimation: false,
	pushStateSeparator: '#!/',
    template7Pages: true
});


// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false
});


$$(document).on('pageInit', function (e) {
  		$(".swipebox").swipebox();

		$("#ContactForm").validate({
			submitHandler: function(form) {
				ajaxContact(form);
				return false;
			}
		});
		
		$('a.backbutton').click(function(){
			parent.history.back();
			return false;
		});
		
		$(".posts li").hide();	
		size_li = $(".posts li").size();
		x=4;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+1 <= size_li) ? x+1 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
		});
        
		/****** INICIO: CALCULADORAS **********/
		
		$('input[type="range"]').on('input change', function(){
			var theid = $(this).attr("id");
			var thecalc = $(this).attr("data-id");
			var theclassvalue = '.' + theid + '-value';
			$(theclassvalue).text(this.value);
			console.log(thecalc);
			switch (thecalc) {
				case 'basdai':
					calcBasdai();
					break;
				case 'basfi':
					calcBasfi();
					break;
				case 'basmi':
					calcBasmi();
					break;
				case 'asdas':
					calcAsdasPCR();
					calcAsdasVSG();
					break;
				case 4:
					day = "Thursday";
					break;
				case 5:
					day = "Friday";
					break;
				case 6:
					day = "Saturday";
					break;
			}
		});
	
		calcBasdai = function(msg){
			var crt01 = parseInt($("#basdai01").val());
			var crt02 = parseInt($("#basdai02").val());
			var crt03 = parseInt($("#basdai03").val());
			var crt04 = parseInt($("#basdai04").val());
			var crt05 = parseInt($("#basdai05").val());
			var crt06 = parseInt($("#basdai06").val());
			var valBasdai = (crt01 + crt02 + crt03 + crt04 + ( (crt05 + crt06 )/2) )/5;
			$('.basdai').text(valBasdai);
			return true;
		};
			
		calcBasfi = function(msg){
			var crt01 = parseInt($("#basfi01").val());
			var crt02 = parseInt($("#basfi02").val());
			var crt03 = parseInt($("#basfi03").val());
			var crt04 = parseInt($("#basfi04").val());
			var crt05 = parseInt($("#basfi05").val());
			var crt06 = parseInt($("#basfi06").val());
			var crt07 = parseInt($("#basfi07").val());
			var crt08 = parseInt($("#basfi08").val());
			var crt09 = parseInt($("#basfi09").val());
			var crt10 = parseInt($("#basfi10").val());
			var valBasfi = (crt01 + crt02 + crt03 + crt04 + crt05 + crt06 + crt07 + crt08 + crt09 + crt10)/10;
			$('.basfi').text(valBasfi);
			return true;
		};
		
		calcBasmi = function(msg){
			var crt01 = (21.1 - parseInt($("#basmi01").val()))/2.1;
			var crt02 = (parseInt($("#basmi02").val())-8)/3;
			var crt03 = (7.4 -  parseInt($("#basmi03").val()))/0.7;
			var crt04 = (124.5 - parseInt($("#basmi04").val()))/10;
			var crt05 = (89.3 - parseInt($("#basmi05").val()))/8.5;
			var valBasmi = ( crt01 + crt02 + crt03 + crt04 + crt05 ).toFixed(3);
			$('.basmi').text(valBasmi);
			return true;
		};
		
		$("#asdas05").on('input change', function() {
   		 	calcAsdasPCR();
		});
	
		$("#asdas06").on('input change', function() {
   			calcAsdasVSG();
		});
		
		calcAsdasPCR = function(msg){
			var crt01 = 0.12 * parseInt( $("#asdas01").val() );
			var crt02 = 0.06 * parseInt( $("#asdas02").val() );
			var crt03 = 0.11 * parseInt( $("#asdas03").val() );
			var crt04 = 0.07 * parseInt( $("#asdas04").val() );
			if ($("#asdas05").val() == 0){
				var crt05 = 0
			} else {	
				var crt05 = 0.58 * Math.log( parseInt( $("#asdas05").val() ) );
			}
			var valAsdas = ( crt01 + crt02 + crt03 + crt04 + crt05 ).toFixed(2);
			$('.asdasPcr').text(valAsdas);
			if ( valAsdas < 1.3 ) {
				$('.resultadoAsdasPcr').css('background-color', '#65F17E');
				$('.resultadoAsdasPcr').css('color', '#FFFFFF');
				$('.resultadoAsdasPcr').html('ASDAS PCR - ' + valAsdas + '<br/> Enfermedad inactiva');
				console.log("Inactiva")
			} else if ( valAsdas < 2.1 ) {
				$('.resultadoAsdasPcr').css('background-color', '#FFFF99');
				$('.resultadoAsdasPcr').css('color', '#333333');
				$('.resultadoAsdasPcr').html('ASDAS PCR - ' + valAsdas + '<br/> Actividad de la enfermedad moderada');
				console.log("Moderada")
			} else if ( valAsdas <= 3.5 ) {
				$('.resultadoAsdasPcr').css('background-color', '#FFA64D');
				$('.resultadoAsdasPcr').css('color', '#FFFFFF');
				$('.resultadoAsdasPcr').html('ASDAS PCR - ' + valAsdas + '<br/> Actividad de la enfermedad alta');
				console.log("Alta")
			} else if ( valAsdas > 3.5 ) {
				$('.resultadoAsdasPcr').css('background-color', '#FF2626');
				$('.resultadoAsdasPcr').css('color', '#FFFFFF');
				$('.resultadoAsdasPcr').html('ASDAS PCR - ' + valAsdas + '<br/> Actividad de la enfermedad muy alta');
				console.log("Muy Alta")
			}
			return true;
		};
		
		calcAsdasVSG = function(msg){
			var crt01 = 0.08 * parseInt( $("#asdas01").val() );
			var crt02 = 0.07 * parseInt( $("#asdas02").val() );
			var crt03 = 0.11 * parseInt( $("#asdas03").val() );
			var crt04 = 0.09 * parseInt( $("#asdas04").val() );
			var crt05 = 0.29 * Math.sqrt( parseInt( $("#asdas05").val() ) );
			var valAsdas = ( crt01 + crt02 + crt03 + crt04 + crt05 ).toFixed(3);
			$('.asdasVSG').text(valAsdas);
			return true;
		};
		
		$('input[type="checkbox"]').on('input change', function(){
			var theid = $(this).attr("id");
			var thecalc = $(this).attr("data-id");
			var theclassvalue = '.' + theid + '-value';
			$(theclassvalue).text(this.value);
			switch (thecalc) {
				case 'asasa':
					calcAsasAxial();
					break;
				case 'asasp':
					calcAsasPeriferico();
					break;
				case 'criteriony':
					calcCriterioNY();
					break;
				case 'criteriocaspar':
					calcCriterioCASPAR();
					break;
				case 'cberlin':
					calcCBerlin();
					break;	
				case 'topas':
					calcTopas();
					break;				
			}
		});
		
		calcTopas = function(){
			var boxes = $(":checkbox:checked");
			var keys = [];
			$(boxes).each(function() {
				keys.push( $(this).attr("id") );
			});
			
			if(jQuery.inArray('topas01', keys) !== -1) {
				$('.aux1').show("slow");
			} else {
				$('.aux1').hide("slow");
			}
			
			if(jQuery.inArray('topas05', keys) !== -1) {
				$('.aux5').show("slow");
			} else {
				$('.aux5').hide("slow");
			}
			
			if(jQuery.inArray('topas06', keys) !== -1) {
				$('.aux6').show("slow");
			} else {
				$('.aux6').hide("slow");
			}
			if(jQuery.inArray('topas08', keys) !== -1) {
				$('.aux8').show("slow");
			} else {
				$('.aux8').hide("slow");
			}
			if(jQuery.inArray('topas09', keys) !== -1) {
				$('.aux9').show("slow");
			} else {
				$('.aux9').hide("slow");
			}
			if(jQuery.inArray('topas10', keys) !== -1) {
				$('.aux10').show("slow");
			} else {
				$('.aux10').hide("slow");
			}
			
			if(jQuery.inArray('topas12', keys) !== -1) {
				$('.aux12').show("slow");
			} else {
				$('.aux12').hide("slow");
			}
			if(jQuery.inArray('topas13', keys) !== -1) {
				$('.aux13').show("slow");
			} else {
				$('.aux13').hide("slow");
			}
			
			if ( jQuery.inArray('topas02', keys) !== -1 || jQuery.inArray('topas03', keys) !== -1) {
				$('.aux2').show("slow");
			} else {
				$('.aux2').hide("slow");
			}
			
			
			
			return true;
		};
		
		calcCBerlin = function(){
			var boxes = $(":checkbox:checked");
			var keys = [];
			$(boxes).each(function() {
				keys.push( $(this).attr("id") );
			});
			
			if(jQuery.inArray('cberlin01', keys) !== -1) {
				$('.criterios').hide();
				$('.hlab27').hide();
				$('.rm').hide();
				$('.resultadoCBerlin').text('EA');
				$('.resultadoCBerlin').css('background-color', 'red');
				$('.resultadoCBerlin').text('EA');
				$('#rx').text('RX Positivo');
			} else if (jQuery.inArray('cberlin14', keys) !== -1)  {
				$('.hlab27').show();
				$('.rm').show();
				$('.resultadoCBerlin').css('background-color', 'red');
				$('.resultadoCBerlin').text('EsP');
			} else if (jQuery.inArray('cberlin13', keys) !== -1)  {
				console.log("HLAB27");
				if ( keys.length >= 5){
					$('.rm').hide();
					$('.resultadoCBerlin').css('background-color', 'red');
					$('.resultadoCBerlin').text('EsP');
				} else if (keys.length >= 3) {
					$('.rm').hide();
					$('.resultadoCBerlin').css('background-color', 'red');
					$('.resultadoCBerlin').text('EsP');
				} else {
					$('.rm').show();
					$('.resultadoCBerlin').css('background-color', '#65F17E');
					$('.resultadoCBerlin').text('Considerar otro diagnostico');
				}
			} else {
				$('.criterios').show();
				if ( keys.length >= 4){
					$('.rm').hide();
					$('.hlab27').hide();
					$('.resultadoCBerlin').css('background-color', 'red');
					$('.resultadoCBerlin').text('EsP');
				} else if (keys.length >= 2) {
					$('.hlab27').show();
					$('.resultadoCBerlin').css('background-color', '#65F17E');
					$('.resultadoCBerlin').text('Considerar otro diagnostico');
				} else {
					$('#rx').text('RX Negativo');
					$('.hlab27').show();
					$('.resultadoCBerlin').css('background-color', '#65F17E');
					$('.resultadoCBerlin').text('Considerar otro diagnostico');
				}
			}
			
			return true;
		};
				
		
		calcAsasAxial = function(){
			var boxes = $(":checkbox:checked");
			var keys = [];
			$(boxes).each(function() {
				keys.push( $(this).attr("id") );
			});
			
			//console.log(keys.length);
			if(jQuery.inArray('asasa01', keys) !== -1) {
				if ( keys.length >= 2){
					$('.resultadoAsasA').css('background-color', 'red');
					$('.resultadoAsasA').text('Clasifica como EA Axial');
				} else {
					$('.resultadoAsasA').css('background-color', '#65F17E');
					$('.resultadoAsasA').text('No clasifica como EA Axial');
				}
			} else if (jQuery.inArray('asasa02', keys) !== -1)  {
				if ( keys.length >= 3){
					$('.resultadoAsasA').css('background-color', 'red');
					$('.resultadoAsasA').text('Clasifica como EA Axial');
				} else {
					$('.resultadoAsasA').css('background-color', '#65F17E');
					$('.resultadoAsasA').text('No clasifica como EA Axial');
				}
			} else {
				$('.resultadoAsasA').css('background-color', '#65F17E');
				$('.resultadoAsasA').text('No clasifica como EA Axial');
			}
			
			return true;
		};
		
		calcAsasPeriferico = function(){
			var boxes1 = $(":checkbox.asasp1:checked");
			var boxes2 = $(":checkbox.asasp2:checked");
			var keys1 = [];
			var keys2 = [];
			$(boxes1).each(function() {
				keys1.push( $(this).attr("id") );
			});
			$(boxes2).each(function() {
				keys2.push( $(this).attr("id") );
			});
			
			//console.log(keys1.length >= 1);
			
			if(jQuery.inArray('asasp01', keys2) !== -1) {
				if ( keys1.length >= 1){
					$('.resultadoAsasP').css('background-color', 'red');
					$('.resultadoAsasP').text('Clasifica como EA Axial');
				} else if (keys2.length >= 3){
					$('.resultadoAsasP').css('background-color', 'red');
					$('.resultadoAsasP').text('Clasifica como EA Axial');
				}else {
					$('.resultadoAsasP').css('background-color', '#65F17E');
					$('.resultadoAsasP').text('No clasifica como EA Axial');
				}
			} else if (jQuery.inArray('asasp02', keys2) !== -1)  {
				if ( keys1.length >= 1){
					$('.resultadoAsasP').css('background-color', 'red');
					$('.resultadoAsasP').text('Clasifica como EA Axial');
				} else if (keys2.length >= 3){
					$('.resultadoAsasP').css('background-color', 'red');
					$('.resultadoAsasP').text('Clasifica como EA Axial');
				} else {
					$('.resultadoAsasP').css('background-color', '#65F17E');
					$('.resultadoAsasP').text('No clasifica como EA Axial');
				}
			} else if (jQuery.inArray('asasp03', keys2) !== -1)  {
				if ( keys1.length >= 1){
					$('.resultadoAsasP').css('background-color', 'red');
					$('.resultadoAsasP').text('Clasifica como EA Axial');
				} else if (keys2.length >= 3){
					$('.resultadoAsasP').css('background-color', 'red');
					$('.resultadoAsasP').text('Clasifica como EA Axial');
				} else {
					$('.resultadoAsasP').css('background-color', '#65F17E');
					$('.resultadoAsasP').text('No clasifica como EA Axial');
				}
			} else {
				$('.resultadoAsasP').css('background-color', '#65F17E');
				$('.resultadoAsasP').text('No clasifica como EA Axial');
			}
			
			return true;
		};
		
		$('#asdastype').click(function() {
			var type = $("#asdastype").is(':checked');
			if (type === true){
				console.log("VSG");
				$("#pcr").hide(1000);
				$("#vsg").show("slow");
			} else {
				console.log("PCR");
				$("#vsg").hide(1000);
				$("#pcr").show("slow");
			}
		});
		
		calcCriterioNY = function(){
			var boxes = $(":checkbox:checked");
			var keys = [];
			$(boxes).each(function() {
				keys.push( $(this).attr("id") );
			});
			
			if(jQuery.inArray('criteriony04', keys) != -1) {
				if ( keys.length >= 2){
					$('.resultadobox').css('background-color', 'red');
					$('.resultadobox').text('Definida');
				} else {
					$('.resultadobox').css('background-color', '#65F17E');
					$('.resultadobox').text('No definida');
				}
			} else {
				$('.resultadobox').css('background-color', '#65F17E');
				$('.resultadobox').text('No definida');
			}
			return true;
		};
		
		calcCriterioCASPAR = function(){
			var boxes = $(":checkbox:checked");
			var keys = [];
			$(boxes).each(function() {
				keys.push( $(this).attr("id") );
			});
			
			if(jQuery.inArray('criteriocaspar02', keys) != -1) {
				if ( keys.length >= 2){
					$('.resultadobox').css('background-color', 'red');
					$('.resultadobox').text('Definida');
				} else {
					$('.resultadobox').css('background-color', '#65F17E');
					$('.resultadobox').text('No definida');
				}
			} else {
				if ( keys.length >= 3){
					$('.resultadobox').css('background-color', 'red');
					$('.resultadobox').text('Definida');
				} else {
					$('.resultadobox').css('background-color', '#65F17E');
					$('.resultadobox').text('No definida');
				}
			}
			return true;
		};
		
		$('select').on('change', function() {
			var thecalc = $(this).attr("data-id");
  			switch (thecalc) {
				case 'pasi':
					calcPasi();
					break;
				case 'napsi':
					calcNapsi();
					break;
			}
		});
		
		calcPasi = function(){
			var crt01 = 0.1 * ( parseInt($("#pasicab1").val()) + parseInt($("#pasicab2").val()) + parseInt($("#pasicab3").val()) ) * parseInt($("#pasicab4").val());
			var crt02 = 0.3 * ( parseInt($("#pasitro1").val()) + parseInt($("#pasitro2").val()) + parseInt($("#pasitro3").val()) ) * parseInt($("#pasitro4").val());
			var crt03 = 0.2 * ( parseInt($("#pasibra1").val()) + parseInt($("#pasibra2").val()) + parseInt($("#pasibra3").val()) ) * parseInt($("#pasibra4").val());
			var crt04 = 0.4 * ( parseInt($("#pasipie1").val()) + parseInt($("#pasipie2").val()) + parseInt($("#pasipie3").val()) ) * parseInt($("#pasipie4").val());
			var valPasi = ( crt01 + crt02 + crt03 + crt04 ).toFixed(2);
			$('.resultadoCPasi').text(valPasi);
			return true;
		};
		
		calcNapsi = function(){
			var crt01 = parseInt( $("#napsi-der1").val() );
			var crt02 = parseInt( $("#napsi-der2").val() );
			var crt03 = parseInt( $("#napsi-der3").val() );
			var crt04 = parseInt( $("#napsi-der4").val() );
			var crt05 = parseInt( $("#napsi-der5").val() );
			var crt06 = parseInt( $("#napsi-izq1").val() );
			var crt07 = parseInt( $("#napsi-izq2").val() );
			var crt08 = parseInt( $("#napsi-izq3").val() );
			var crt09 = parseInt( $("#napsi-izq4").val() );
			var crt10 = parseInt( $("#napsi-izq5").val() );
			var valNapsi = ( crt01 + crt02 + crt03 + crt04 + crt05 + crt06 + crt07 + crt08 + crt09 + crt10 );
			$('.resultadoCNapsi').text(valNapsi);
			return true;
		};
		
		
		
		/****** FIN: CALCULADORAS **********/

	$("a.switcher").bind("click", function(e){
		e.preventDefault();
		
		var theid = $(this).attr("id");
		var theproducts = $("ul#photoslist");
		var classNames = $(this).attr('class').split(' ');
		
		
		if($(this).hasClass("active")) {
			// if currently clicked button has the active class
			// then we do nothing!
			return false;
		} else {
			// otherwise we are clicking on the inactive button
			// and in the process of switching views!

  			if(theid == "view13") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_13_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_12");
				theproducts.addClass("photo_gallery_13");

			}
			
			else if(theid == "view12") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_12_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_12");

			} 
			else if(theid == "view11") {
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_11_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_12");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_11");

			} 
			
		}

	});	
	
	document.addEventListener('touchmove', function(event) {
	   if(event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1 ) {
		event.preventDefault(); }
	}, false);
	
	// Add ScrollFix
	var scrollingContent = document.getElementById("pages_maincontent");
	new ScrollFix(scrollingContent);
	
	
	var ScrollFix = function(elem) {
		// Variables to track inputs
		var startY = startTopScroll = deltaY = undefined,
	
		elem = elem || elem.querySelector(elem);
	
		// If there is no element, then do nothing	
		if(!elem)
			return;
	
		// Handle the start of interactions
		elem.addEventListener('touchstart', function(event){
			startY = event.touches[0].pageY;
			startTopScroll = elem.scrollTop;
	
			if(startTopScroll <= 0)
				elem.scrollTop = 1;
	
			if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
				elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}, false);
	};
	
})
