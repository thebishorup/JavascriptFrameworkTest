var a = G$('John', 'Doe');

a.greet().setLang('es').greet(true);

$('#login').click(function(){

    var loginGreeting = G$('John', 'Doe');

    $('#logindiv').hide();

    loginGreeting.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});