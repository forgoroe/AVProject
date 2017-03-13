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
    this.btn = document.getElementsByClassName('button')[0];
    this.body = document.body;
  },

  cacheContainer: function(containerNode){
    this.container = containerNode;
    console.log(this.container);
  },

  bindEvents: function(){
   this.btn.addEventListener('click', this.insertInitialSegment);
  },

  bindEventToContent: function(nodeToBind){
    nodeToBind.addEventListener('click', this.insertNextSegment);
    nodeToBind.classList.add('pointerCursor');
  },

  unbindEventOfPreviousContent: function(nodeToUnbind){
    nodeToUnbind.removeEventListener('click', this.insertNextSegment);
    nodeToUnbind.className += ' animated bounce';
    nodeToUnbind.classList.remove('pointerCursor');
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
    document.body.innerHTML = '';
  },

  setUpElements: function(){
    var containerDiv = this.setUpContainer();
    /*var rowDiv = this.setUpRow(containerDiv);
    var colDiv = this.setUpCol(rowDiv);*/
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
    rowDiv.classList.add('row');

    container.appendChild(rowDiv);

    return rowDiv;
  },

  setUpCol: function(row){
    var colDiv = document.createElement('div');
    colDiv.classList.add('col-xs-12');

    row.appendChild(colDiv);

    return colDiv;
  },

  setUpH2: function(col, id){
    var h2 = document.createElement('h2');
    h2.setAttribute('id', id);
    h2.classList.add('disable-select');
    
    if(id==1){
      h2.classList.add('firstTurn');
    } else{
      h2.classList.add('yourTurn');
    }

    col.appendChild(h2);

    return h2;
  },

  insertInitialSegment: function(){
    intro.emptyPage();
    intro.setUpElements();

    var containerDiv = intro.container;

    var rowDiv = intro.setUpRow(containerDiv);
    var colDiv = intro.setUpCol(rowDiv);
    var h2 = intro.setUpH2(colDiv, 1);

    var nextUp = contentGrabber.giveNext().text;
    h2.innerHTML = nextUp;

    intro.body.setAttribute('class', 'neutralBackground');
    intro.bindEventToContent(h2);
    
    },

  insertNextSegment: function(){

    var idOfPrevious = contentGrabber.getContentGrabbed();

    intro.unbindEventOfPreviousContent(document.getElementById(idOfPrevious));

    var containerDiv = intro.container;
    var rowDiv = intro.setUpRow(containerDiv);
    var colDiv = intro.setUpCol(rowDiv);
    var h2 = intro.setUpH2(colDiv, idOfPrevious+1);

    var nextUp = contentGrabber.giveNext().text;
    h2.innerHTML = nextUp;

    
    intro.bindEventToContent(h2);

    
    console.log('next element inserted');
    window.scrollTo(0,document.body.scrollHeight);
  },

  styleSegment: function(segmentId){

  },

  }

  intro.init();

})();
