'use strict';

$(function(){
    $('.oldBio').click(function(){
        $.ajax({
          url: "manage/",
          type: "POST",
          data: {"action":"revertBio","payload":true},
          success: function( data ) {
            $('.oldBio').removeClass('btn-info').addClass('btn-success');
          }
        });
    }).tooltip();

    $('.deactivate').click(function(){
          
            
        $.ajax({
          url: "manage/",
          type: "POST",
          data: {"action":"deactivate","payload":true},
          success: function( data ) {
            console.log('Your account was deactivated. Do something here.');
         	$('.btn').not('.deactivate').attr('disable','disabled');
            $('.deactivate').removeClass('btn-danger').addClass('btn-success').html('<span class="glyphicon glyphicon-fire"></span>Reactive your Bii.io');
          }
        });
    }).tooltip();

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
            $('.bioButtons > .no').addClass('btn-info');
            $('.slider').slideUp();
          }
        });
    });




});