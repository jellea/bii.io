'use strict';

$(function(){
    $('.oldBio').tooltip();

    $('.bioButtons > .yes').click(function(){
        $('.slider > .setMsg').removeClass('btn-info');
        $('.slider').slideDown();
    });

    $('.slider > .setMsg').click(function(){
        $.ajax({
          url: "manage/",
          type: "POST",
          data: {"action":"msgSet","payload":$('.slider > textarea').val()},
          success: function( data ) {
            $('.slider > .setMsg').addClass('btn-info');
            $('.bioButtons > .yes').addClass('btn-info');
            $('.bioButtons > .no').removeClass('btn-info');
          }
        });
    });

    $('.bioButtons > .no').click(function(){
         $.ajax({
          url: "manage/",
          type: "POST",
          data: {"action":"msgSet","payload":""},
          success: function( data ) {
            $('.bioButtons > .yes').removeClass('btn-info');
            $('.slider > .setMsg').removeClass('btn-info');
            $(this).addClass('btn-info');
            $('.slider').slideUp();
          }
        });
    });




});