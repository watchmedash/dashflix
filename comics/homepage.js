$(document).ready(function() {
    $('figure').show();

    $('.prev-page, .next-page').hide();

    $('.prev-page, .next-page').off('click');

    window.onpopstate = null;
});
