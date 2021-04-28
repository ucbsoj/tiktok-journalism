/**************************
jQuery Choose-Your-Own-Adventure by Jeremy Rue https://github.com/jrue

LICENSE: CC BY-NC-SA Attribution-NonCommercial-ShareAlike

You are free to remix, adapt, and build upon this work non-commercially, as long as you credit me and license the new creations under the identical terms. 

https://creativecommons.org/licenses/by-nc-sa/4.0/
**************************/


(function($){
  $.chooseYourOwnAdventure = function(el, data, options){

    var base = this;

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;

    // Add a reverse reference to the DOM object
    base.$el.data("chooseYourOwnAdventure", base);

    base.init = function(){
      
      base.options = $.extend({},$.chooseYourOwnAdventure.defaultOptions, options);
      
      base.data = data;

      jQuery.extend( jQuery.easing, {easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    }});
       
    };
    
    base.createQuestion = function(d, first){
      
      let questionHolder = $("<div />")
        .addClass("card my-3 active")
        .attr("data-adventure-id", d.id);

      let questionBody = $("<div />")
        .addClass("card-body");

      if(d.image !== ""){
        $("<img />").attr("src", d.image).appendTo(questionHolder);
      }

      if(d.title !== ""){
        $("<h3 />").addClass("card-title").text(d.title).appendTo(questionBody);
      }

      if(d.prompt !== ""){
        $("<p />").addClass("card-text").text(d.prompt).appendTo(questionBody);
      }

      if(d.choices.length > 0){
        let questionChoices = $("<div />").addClass("d-grid gap-2");
        d.choices.forEach(function(j,k){
          $("<button />")
            .addClass("btn btn-secondary")
            .attr("type","button")
            .attr("data-adventure-goto", j.ifChosenGoTo)
            .text(j.option)
            .on("click", base.activateQuestions)
            .appendTo(questionChoices);
        });
        questionChoices.appendTo(questionBody);
      }

      questionBody.appendTo(questionHolder);
      questionHolder.appendTo(base.$el);
      if(!first){
        questionHolder.hide();
      }
        
    }
    
    base.activateQuestions = function(){
      
      //disable buttons just clicked
      let scrollTo = $('.active')
        .removeClass('active')
        .find('button')
        .addClass('disabled')
        .offset().top;
      
      $("html,body").animate({'scrollTop': scrollTo + ($(window).height()*0.1)}, {duration:200, queue:false, delay:0, easing:'easeOutCubic'});
      
      //save number of where we're going
      let goto = $(this).data('adventure-goto');
      
      base.createQuestion(base.findObjectByKey(base.data, "id", goto), false);
      
      
      $('.active').slideDown({queue: false});
      

      
      
      
    }
    
    

    // Sample Function, Uncomment to use
    /**
     * Find Object By Key
     * @param  {Array} [array] Array to search
     * @param  {String} [key] The key of the object
     * @param  {Mixed} [value] Which value to match.
     * @return {Mixed} Either null or value found
     * @api private
     */  
     base.findObjectByKey = function(array, key, value) {
          for (var i = 0; i < array.length; i++) {
              if (array[i][key] === value) {
                  return array[i];
              }
          }
          return null;
      }
     
     
      base.makeQuestionAppear = function(questionNum, currentQuestion){
        
        let questionElement = base.findObjectByKey(base.data, "id", questionNum).elm;
        
        currentQuestion.css('opacity', 0.25)
        questionElement.removeClass('visually-hidden');
        
        base.scrollToQuestion(questionElement);
        
      }
      
      base.scrollToQuestion = function(questionElm){
        let scrollPosition = questionElm.offset().top - ($(window).height()/2)
        $('html,body').stop().animate({'scrollTop': scrollPosition }, {duration:500, queue:false, delay:0});
      }
      
      

    // Run initializer
    base.init();
  };

  $.chooseYourOwnAdventure.defaultOptions = {
    cssStyles: true,
    borderStyle: "1px solid rgba(0,0,0,.125)",
    borderRadius: ".25rem",
    backgroundColor: "none",
    padding: "1rem",
    titleFont: "Georgia, serif",
    titleFontSize: "1.75rem",
    bodyFont: "sans-serif",
    buttonColor: "#cccccc",
    textColor: "#000000"
  };

  $.fn.chooseYourOwnAdventure = function(data, options){
    return this.each(function(){
      const adventure  = (new $.chooseYourOwnAdventure(this, data, options));

      //start with first question
      adventure.createQuestion(adventure.data[0], true);

//      adventure.data.forEach(function(d){
//        
//        d.choices.each(function(i,e){
//          $(e).on("click", function(evt){
//            adventure.makeQuestionAppear($(this).data('adventureGoto'), $(this));
//          })
//        })
//        
//      })
      
      
      
      
      //create first question
//      const firstQuestion = $("<div />").css({
//        "border": adventure.options.borderStyle,
//        "background-color": adventure.options.backgroundColor,
//        "font": adventure.options.bodyFont,
//        "border-radius": adventure.options.borderRadius,
//        "padding":adventure.options.padding,
//        "color": adventure.options.textColor
//      }).appendTo(adventure.$el);
//      
//      const firstQuestionTitle = $("<h3 />").css({
//        "font": adventure.options.titleFont,
//        "font-size": adventure.options.titleFontSize
//      }).text(adventure.data[0].title).appendTo(firstQuestion);

       // END DOING STUFF

    });
  };
    
})(jQuery);