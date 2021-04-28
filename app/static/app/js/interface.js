( function($) {
  'use strict';

  	/* Window Load */
	$(window).on('load',function(){
		$('.loader').fadeOut(200);
        $('.line').addClass('active');
	});
    
    /* Navbar scroll*/
    $('.navbar-nav ul li a').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top)
            }, 1000);
            $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
            return false;
        }
    });

    /* Full page scroll*/
    if ($('#pagepiling').length > 0){

        $('#pagepiling').pagepiling({
            scrollingSpeed: 280,
            // Ocultar botones de navegacion de la derecha
            // navigation:false,
            menu: '.navbar-nav',
            anchors: ['home', 'about', 'experience', 'skills', 'contact'],
            afterRender: function(anchorLink, index){ 
              NavbarColor();

            },
            afterLoad: function(anchorLink, index){
                $('.pp-section .intro').removeClass('animate');
                $('.active .intro').addClass('animate');
                NavbarColor();
            }
        });

        function NavbarColor(){
            if ($('.pp-section.active').hasClass('navbar-is-white')){
                $('.navbar-desctop').addClass('navbar-white');
                $('.progress-nav').addClass('progress-nav-white');
                $('.navbar-bottom').addClass('navbar-bottom-white');
                $('#logo').attr('src', $('#logo').data('img1'));

                // Para Cambiar el background del menu principal
                // if ($('.home.active').hasClass('navbar-is-white')){
                //     console.log('home activo');
                //     $('#navbar-desctop').css("cssText", "background-color: none");
                // }
                // else{
                //     console.log('home inactivo');
                //     $('#navbar-desctop').css("cssText", "background-color: #160d1d;");
                // }
            }
            else{
                $('.navbar-desctop').removeClass('navbar-white');
                $('.progress-nav').removeClass('progress-nav-white');
                $('.navbar-bottom').removeClass('navbar-bottom-white');
                // $('.logo').removeClass('logo-white');
                $('#logo').attr('src', $('#logo').data('img2'));
                console.log('entro al if no');
            }
        }
    }

    /* Navbar toggler */
    $('.toggler').on('click',function(){
    	$('body').addClass('menu-is-open');
    });

    $('.close, .click-capture').on('click',function(){
    	$('body').removeClass('menu-is-open');
    });

    /* Navbar mobile */
    $('.navbar-nav-mobile li a').on('click', function(){
    	$('body').removeClass('menu-is-open');
    	$('.navbar-nav-mobile li a').removeClass('active');
    	$(this).addClass('active');
    });

    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    /* Change bacgkround on project section*/
    $('.project-box').on('mouseover',function(){
        var index = $('.project-box').index(this);
        $('.bg-changer .section-bg').removeClass('active').eq(index).addClass('active');
    });

    /* Carousel experience*/
    $('.carousel-experience').owlCarousel({
        loop:true,
        margin:45,
        dots:true,
        nav:true,
        smartSpeed:1000,
        items:1
    });

    /* Carousel testimonials */
    $('.carousel-testimonials').owlCarousel({
	    loop:true,
	    margin:10,
        nav:true,
	    dots:false,
	    items:1
	});

    /* Send form */
	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function(){
            let aux = $(this).attr('action');
			$(this).validate({
				errorClass: 'error',
			    submitHandler: function(form){
		        	$.ajax({
			            type: "POST",
			            url: aux,
			            data: $(form).serialize(),
                        crossDomain: true,
                        dataType: 'jsonp',
			            success: function() {
		                	$('#success-message').show();
		                },

		                error: function(e){
                            console.log(e);
		                	$('#error-message').show();
			            }
			        });
			    }
			});
		});
	}

})(jQuery);
