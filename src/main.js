import { randomPhraseCreator } from "./scripts/randomPhraseCreator";

(function(){

var intro = {

  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.render();
  },

  cacheDom: function(){
    this.el = document.querySelector('h1');
    this.btn = document.querySelector('.button');
  },

  bindEvents: function(){
    this.btn.addEventListener('click', animateIntro.bind(this));
  },

  animateIntro: function(){

  },

  render: function(){
    this.btn.classList.add('show');
  }

};

  intro.init();

})();
