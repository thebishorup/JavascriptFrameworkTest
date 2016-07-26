
;(function (global, $) {

    //'new' an object
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }

    //hidden within the scope of the IIFE and never directly accessible
    var supportedLanguage = ['en', 'es'];

    //informal greeting
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    //formal greeting
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    //logger message
    var logMessages = {
        en: 'Logged in',
        es: '(es) Logged in'
    };

    Greetr.prototype = {

        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },

        validte: function () {
            if(supportedLanguage.indexOf(this.language) === -1){
                throw 'Invalid Language';
            }
        },

        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName() + '.';
        },

        greet: function(formal){
            var message;

            //if undefined or null it will be coerced to 'false'
            if(formal){
                message = this.formalGreeting();
            }
            else{
                message = this.greeting();
            }

            if(console){
                console.log(message);
            }

            //'this' refers to the calling object at execution time
            //makes the method chainable
            return this;
        },

        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            return this;
        },

        setLang: function(lang){
            this.language = lang;

            this.validte();

            return this;
        },

        HTMLGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded';
            }

            if(!selector){
                throw 'Missing jQuery selector';
            }

            var message;
            if(formal){
                message = this.formalGreeting();
            }
            else{
                message = this.greeting(); 
            }

            $(selector).html(message);
            
            return this;
        }

    };

    //the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language){

        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validte();

    }

    Greetr.init.prototype = Greetr.prototype;

    //attach Greetr to the global object, and provide the shortcut 'G$'
    global.Greetr = global.G$ = Greetr;

})(window, jQuery);