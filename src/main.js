import { randomPhraseCreator } from "./scripts/randomPhraseCreator";
import { contentGrabber } from "./scripts/contentGrabber";

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
   this.btn.addEventListener('click', this.insertNextSegment);
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

  /*viewNextSegment: function(){
    var contentLength = contentGrabber.getContentLength();
    console.log(contentLength);
    document.body.innerHTML = '';
    for(var i=0; i<contentLength/3; i++){
      document.body.innerHTML += '<p>' + contentGrabber.giveNext().text +'</p>';
    }
  }*/

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
    var content = document.createElement('p');
    content.setAttribute('id', id);

    col.appendChild(content);

    return content;
  },

  insertNextSegment: function(){
    intro.emptyPage();
    intro.setUpElements();

    var contentLength = contentGrabber.getContentLength(); 
    //Above^: amount of content to display (currently all)
    var containerDiv = document.getElementsByClassName('container')[0];

    for(var i=0; i<10; i++){

      var rowDiv = intro.setUpRow(containerDiv);
      var colDiv = intro.setUpCol(rowDiv);
      var content = intro.setUpH2(colDiv, i);

      var nextUp = contentGrabber.giveNext().text;

      content.innerHTML = nextUp;
    }
  }

};

  intro.init();

})();
