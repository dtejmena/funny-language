

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Datepicker
    if($('.datepicker').length != 0){
        $('.datepicker').datepicker({
             weekStart:1
        });
    }

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
    if($('.navbar-color-on-scroll').length != 0){
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
	$('.carousel').carousel({
      interval: 400000
    });

});

materialKit = {
    misc:{
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > 260 ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                }
            }
    }, 17),

    initSliders: function(){
        // Sliders for demo purpose
        $('#sliderRegular').noUiSlider({
            start: 40,
            connect: "lower",
            range: {
                min: 0,
                max: 100
            }
        });

        $('#sliderDouble').noUiSlider({
            start: [20, 60] ,
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

materialKitDemo = {
    checkScrollForParallax: debounce(function(){
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform':'translate3d(0,' + oVal +'px,0)',
            '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
            '-ms-transform':'translate3d(0,' + oVal +'px,0)',
            '-o-transform':'translate3d(0,' + oVal +'px,0)'
        });

    }, 6)

}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};









    /*
        Script form register
    */
"use strict";
function scroll_to_class(element_class, removed_height) {
    var scroll_to = $(element_class).offset().top - removed_height;
    if($(window).scrollTop() != scroll_to) {
        $('.form-wizard').stop().animate({scrollTop: scroll_to}, 0);
    }
}

function bar_progress(progress_line_object, direction) {
    var number_of_steps = progress_line_object.data('number-of-steps');
    var now_value = progress_line_object.data('now-value');
    var new_value = 0;
    if(direction == 'right') {
        new_value = now_value + ( 100 / number_of_steps );
    }
    else if(direction == 'left') {
        new_value = now_value - ( 100 / number_of_steps );
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

jQuery(document).ready(function() {
    
    /*
        Form
    */
    $('.form-wizard fieldset:first').fadeIn('slow');
    
    $('.form-wizard .required').on('focus', function() {
        $(this).removeClass('input-error');
    });
    
    // next step
    $('.form-wizard .btn-next').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.form-wizard').find('.form-wizard-step.active');
        var progress_line = $(this).parents('.form-wizard').find('.form-wizard-progress-line');
        
        // fields validation
        parent_fieldset.find('.required').each(function() {
            if( $(this).val() == "" ) {
                $(this).addClass('input-error');
                next_step = false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        // fields validation
        
        if( next_step ) {
            parent_fieldset.fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                // progress bar
                bar_progress(progress_line, 'right');
                // show next step
                $(this).next().fadeIn();
                // scroll window to beginning of the form
                scroll_to_class( $('.form-wizard'), 20 );
            });
        }
        
    });
    
    // previous step
    $('.form-wizard .btn-previous').on('click', function() {
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.form-wizard').find('.form-wizard-step.active');
        var progress_line = $(this).parents('.form-wizard').find('.form-wizard-progress-line');
        
        $(this).parents('fieldset').fadeOut(400, function() {
            // change icons
            current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
            // progress bar
            bar_progress(progress_line, 'left');
            // show previous step
            $(this).prev().fadeIn();
            // scroll window to beginning of the form
            scroll_to_class( $('.form-wizard'), 20 );
        });
    });
    
    // submit
    $('.form-wizard').on('submit', function(e) {
        
        // fields validation
        $(this).find('.required').each(function() {
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        // fields validation
        
    });
    
    
});





// image uploader scripts 

var $dropzone = $('.image_picker'),
    $droptarget = $('.drop_target'),
    $dropinput = $('#inputFile'),
    $dropimg = $('.image_preview'),
    $remover = $('[data-action="remove_current_image"]');

$dropzone.on('dragover', function() {
  $droptarget.addClass('dropping');
  return false;
});

$dropzone.on('dragend dragleave', function() {
  $droptarget.removeClass('dropping');
  return false;
});

$dropzone.on('drop', function(e) {
  $droptarget.removeClass('dropping');
  $droptarget.addClass('dropped');
  $remover.removeClass('disabled');
  e.preventDefault();
  
  var file = e.originalEvent.dataTransfer.files[0],
      reader = new FileReader();

  reader.onload = function(event) {
    $dropimg.css('background-image', 'url(' + event.target.result + ')');
  };
  
  console.log(file);
  reader.readAsDataURL(file);

  return false;
});

$dropinput.change(function(e) {
  $droptarget.addClass('dropped');
  $remover.removeClass('disabled');
  $('.image_title input').val('');
  
  var file = $dropinput.get(0).files[0],
      reader = new FileReader();
  
  reader.onload = function(event) {
    $dropimg.css('background-image', 'url(' + event.target.result + ')');
  }
  
  reader.readAsDataURL(file);
});

$remover.on('click', function() {
  $dropimg.css('background-image', '');
  $droptarget.removeClass('dropped');
  $remover.addClass('disabled');
  $('.image_title input').val('');
});

$('.image_title input').blur(function() {
  if ($(this).val() != '') {
    $droptarget.removeClass('dropped');
  }
});

// image uploader scripts


var inputAddphoto = '<div class="upload-photo">Foto de perfil</div>',
    inputphoto = $('#id_photo');

inputphoto.before(inputAddphoto);

$('.upload-photo').on('click', function() {
    $(this).siblings('#id_photo').trigger('click');
});

inputphoto.on('change', function(){
    var input = $(this),
        reader = new FileReader();

    reader.onload = function (e) {
        input.siblings('.upload-photo').css('background-image', 'url(' + e.target.result + ')');
    };

    reader.readAsDataURL(this.files[0]);
});


// Time Zone 

function calculate_time_zone() {
    var rightNow = new Date();
    var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);  // jan 1st
    var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0); // june 1st
    var temp = jan1.toGMTString();
    var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
    temp = june1.toGMTString();
    var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
    var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
    var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
    var dst;
    if (std_time_offset == daylight_time_offset) {
        dst = "0"; // daylight savings time is NOT observed
    } else {
        // positive is southern, negative is northern hemisphere
        var hemisphere = std_time_offset - daylight_time_offset;
        if (hemisphere >= 0)
            std_time_offset = daylight_time_offset;
        dst = "1"; // daylight savings time is observed
    }
    var i;
    // check just to avoid error messages
    if (document.getElementById('timezone')) {
        for (i = 0; i < document.getElementById('timezone').options.length; i++) {
            if (document.getElementById('timezone').options[i].value == convert(std_time_offset)+","+dst) {
                document.getElementById('timezone').selectedIndex = i;
                break;
            }
        }
    }
}

function convert(value) {
    var hours = parseInt(value);
    value -= parseInt(value);
    value *= 60;
    var mins = parseInt(value);
    value -= parseInt(value);
    value *= 60;
    var secs = parseInt(value);
    var display_hours = hours;
    // handle GMT case (00:00)
    if (hours == 0) {
        display_hours = "00";
    } else if (hours > 0) {
        // add a plus sign and perhaps an extra 0
        display_hours = (hours < 10) ? "+0"+hours : "+"+hours;
    } else {
        // add an extra 0 if needed 
        display_hours = (hours > -10) ? "-0"+Math.abs(hours) : hours;
    }
    
    mins = (mins < 10) ? "0"+mins : mins;
    return display_hours+":"+mins;
}

onload = calculate_time_zone;


// ******ADD Expertise****** 





//secod parent

