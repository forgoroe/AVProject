import { phraseCreator } from "./scripts/phraseCreator"; 
import { moreAnimations } from "./scripts/moreAnimations";
import { presentation } from "./scripts/presentation";
import NoSleep from "nosleep";

(function(){

  var noSleep = new NoSleep();

  function enableNoSleep() {
    noSleep.enable(9999999999);
    intro.$btn.off('click', enableNoSleep, false);
  };
  
let intro = {

  init: function(){
    this.cacheIntroDom();
    this.bindEvents();
    this.animateIntro();
  },

  cacheIntroDom: function(){
    this.$el = $('#aVolte');
    this.$btn = $('.button');
    this.$body = $('body');
  },

  bindEvents: function() {
      this.$btn.on('click', () => {
        enableNoSleep();
        clearInterval(intro.buttonAnimation);
        presentation.rollPresentation()
      });

  },

  animateIntro: function(){

      let str = "A volte";
      let amount = 3;
      let delay = 8;
      let count = phraseCreator.getShortestPhraseLength()*2;
      let icon = '<i class="fa fa-envelope" aria-hidden="true"></i>';
      let iconIsSet = false;
      let html = ''

      let gen = setInterval(function() {
        intro.$el.attr('data-before', phraseCreator.getRandomPhrase(amount));
        intro.$el.attr('data-after', phraseCreator.getRandomPhrase(amount));
        if(delay > 0) {
          delay--;
        }
        else {
          if(count < str.length) {
           if(!iconIsSet){
             html = '<i class="fa fa-envelope" aria-hidden="true"></i> ';
             iconIsSet = true;
           }
            html += str[str.length - count-1];
            intro.$el.html(html);
          }
          count--;
          if(count === -1) {
            clearInterval(gen);
            intro.$el.removeAttr('data-before');
            intro.$el.removeAttr('data-after');
            intro.$el.css('margin-right', '25px');
            intro.$btn.addClass('show');
          }
        }
      }, 180);

    this.buttonAnimation = moreAnimations.animateButton($(this.$btn));   
  }

  }

  intro.init();

})();
