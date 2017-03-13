import { randomPhraseCreator } from "./scripts/randomPhraseCreator";
import { contentGrabber } from "./scripts/contentGrabber";

(function(){

var intro = {

  init: function(){
    this.cacheIntroDom();
    this.bindEvents();
    this.animateIntro();
  },

  cacheIntroDom: function(){
    this.el = document.getElementById('aVolte');
    this.btn = document.getElementsByClassName('btn-default')[0];
    this.body = document.body;
  },

  cacheContainer: function(containerNode){
    this.container = containerNode;
  },

  bindEvents: function(){
   this.btn.addEventListener('click', this.insertInitialSegment);
  },

  bindEventToContent: function(nodeToBind){
    nodeToBind.addEventListener('click', this.insertNextSegment);
    nodeToBind.classList.add('pointerCursor');
  },

  animateIntro: function(){
      var str = "A volte"

      var delay = 8;
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
            intro.el.removeAttribute('data-before');
            intro.el.removeAttribute('data-after');
            intro.btn.classList.add('show');
          }
        }
      }, 180);
  },

  emptyPage: function(){
    $('body').empty();
  },

  setUpElements: function(){
    this.setUpContainer();
  },

  setUpContainer: function(){
    var containerDiv = document.createElement('div');

    containerDiv.classList.add('container');

    this.cacheContainer(containerDiv);

    document.body.appendChild(containerDiv);

    return containerDiv;
  },

  setUpRow: function(container){
    var rowDiv = document.createElement('div');
    $(rowDiv).addClass('row');

    container.appendChild(rowDiv);

    return rowDiv;
  },

  setUpCol: function(row){
    var colDiv = document.createElement('div');
    colDiv.classList.add('col-xs-12');

    row.appendChild(colDiv);

    return colDiv;
  },

  setUpH3: function(col, id){
    var h3 = document.createElement('h3');
    h3.setAttribute('id', id);
    h3.classList.add('disable-select');

    col.appendChild(h3);

    return h3;
  },

  scrollTo: function(elementId){
    $("#"+elementId).click(function() {
    $('html, body').animate({
        scrollTop: $("#"+elementId).offset().top
    }, 2000);
  });
  },

  insertInitialSegment: function(){
    intro.emptyPage();
    intro.setUpElements();

    var rowDiv = intro.setUpRow(intro.container);
    var colDiv = intro.setUpCol(rowDiv);
    var h3 = intro.setUpH3(colDiv, 1);

    var nextUp = contentGrabber.giveNext().text;
    $('h3').html(nextUp);

    intro.body.setAttribute('class', 'neutralBackground');
    intro.bindEventToContent(h3);
    
    },

  insertNextSegment: function(){
    var idOfPrevious = contentGrabber.getContentGrabbed();

    if(idOfPrevious < contentGrabber.getContentLength()){
      var nextUp = contentGrabber.giveNext().text;
      $('h3').attr("id", idOfPrevious+1);
      $('h3').html(nextUp);
    }
  },

  }

  intro.init();

})();
