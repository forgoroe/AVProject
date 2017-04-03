import { phraseCreator } from "./scripts/phraseCreator"; 
import { moreAnimations } from "./scripts/moreAnimations";
import { presentation } from "./scripts/presentation";
import NoSleep from "nosleep";

window.onload = (function(){

  var noSleep = new NoSleep();

  function enableNoSleep() {
    noSleep.enable(9999999);
    intro.$btn.off('click', enableNoSleep, false);
  };

  function fullScreen() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      var docElm = document.getElementsByTagName('html')[0];
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    }
    
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
    this.$subtitle = $('#subtitle');
  },

  bindEvents: function() {
      this.$btn.on('click', () => {
        enableNoSleep();
        clearInterval(intro.buttonAnimation);
        fullScreen();
        presentation.rollPresentation();
      });
  },

  animateIntro: function(){

      let str = "A volte ...";
      let amount = 3;
      let delay = 8;
      let count = phraseCreator.getShortestPhraseLength()*2;
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
             html = '<i class="fa fa-envelope animated fadeIn" aria-hidden="true"></i> ';
             intro.$el.html(html);
             iconIsSet = true;
           }
            html = '<span class="yourTurn">' + str[str.length - count-1] + '</span>';
            intro.$el.append(html);
          }
          count--;
          if(count === -1) {
            clearInterval(gen);
            intro.$el.removeAttr('data-before');
            intro.$el.removeAttr('data-after');
            intro.$el.css('margin-right', '25px');
            intro.$btn.addClass('show');
            window.scrollTo(0,document.body.scrollHeight);
          }
        }
      }, 180);

    moreAnimations.animateSubtitle(this.$subtitle);
    this.buttonAnimation = moreAnimations.animateButton($(this.$btn));
  }

  }

  intro.init();

})();
