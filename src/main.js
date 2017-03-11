import { randomPhraseCreator } from "./scripts/randomPhraseCreator";

(function(){

var intro = {

  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.animateIntro();
  },

  cacheDom: function(){
    this.el = document.getElementById('aVolte');
    this.btn = document.getElementsByClassName('button')[0];
  },

  bindEvents: function(){
    this.btn.addEventListener('click', this.animateIntro.bind(this));
  },

  animateIntro: function(){
      var str = "A volte..."

      var delay = 6;
      var count = randomPhraseCreator.getShortestPhraseLength()*2;

      this.btn.classList.remove('show');
      
      var gen = setInterval(function() {
        intro.el.setAttribute('data-before', randomPhraseCreator.getRandomPhrase());
        intro.el.setAttribute('data-after', randomPhraseCreator.getRandomPhrase());
        if(delay > 0) {
          delay--;
        }
        else {
          if(count < str.length) {
            intro.el.innerHTML += str[str.length - count-1];
          }
          count--;
          if(count === -1) {
            clearInterval(gen);
            intro.render();
          }
        }
      }, 180);
  },

  render: function(){
    this.el.removeAttribute('data-before');
    this.el.removeAttribute('data-after');
    this.btn.classList.add('show');
  }

};

  intro.init();

})();
