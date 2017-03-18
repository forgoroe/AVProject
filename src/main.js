import { randomPhraseCreator } from "./scripts/randomPhraseCreator"; import {
contentGrabber } from "./scripts/contentGrabber"; import { moreAnimations }
from "./scripts/moreAnimations"

(function(){

let intro = {

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
  },

  bindEvents: function(){
   this.btn.addEventListener('click', this.insertInitialSegment);
  },

  bindEventToContent: function($nodeToBind){
    $nodeToBind.on('click', this.insertNextSegment);
    $nodeToBind.addClass('pointerCursor');
  },

  unbindEventFrom: function($nodeToUnbind){
    $nodeToUnbind.unbind().click(function(){});
  },

  animateIntro: function(){

      let str = "A volte";
      let amount = 3;
      let delay = 8;
      let count = randomPhraseCreator.getShortestPhraseLength()*2;
      let icon = '<i class="fa fa-envelope" aria-hidden="true"></i>';
      let iconIsSet = false;

      let gen = setInterval(function() {
        intro.el.setAttribute('data-before', randomPhraseCreator.getRandomPhrase(amount));
        intro.el.setAttribute('data-after', randomPhraseCreator.getRandomPhrase(amount));
        if(delay > 0) {
          delay--;
        }
        else {
          if(count < str.length) {
           if(!iconIsSet){
             intro.el.innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i> ';
             iconIsSet = true;
           }
            intro.el.innerHTML += str[str.length - count-1];
          }
          count--;
          if(count === -1) {
            clearInterval(gen);
            intro.el.removeAttribute('data-before');
            intro.el.removeAttribute('data-after');
            intro.el.style['margin-right'] = '25px';
            intro.btn.classList.add('show');
          }
        }
      }, 180);

    //to clear the setInterval function of button animation later 
    this.buttonAnimation = moreAnimations.animateButton($(this.btn));
      
  },

  emptyPage: function(){
    $('body').empty();
  },

  /*I initially set up these setup functions thinking I wasn't going to use jQuery at all. 
  I was wrong. The whole thing is a mess because of it.*/

  setUpContainer: function(){
    let containerDiv = document.createElement('div');

    containerDiv.classList.add('container');

    this.cacheContainer(containerDiv);

    document.body.appendChild(containerDiv);

    return containerDiv;
  },

  setUpRow: function(container){
    let rowDiv = document.createElement('div');
    $(rowDiv).addClass('row');

    container.appendChild(rowDiv);

    return rowDiv;
  },

  setUpCol: function(row, id){
    let colDiv = document.createElement('div');
    colDiv.classList.add('col-xs-12');
    colDiv.setAttribute('id', id);

    row.appendChild(colDiv);

    return colDiv;
  },

  setUpH3: function(col, id){
    let h3 = document.createElement('h3');
    h3.setAttribute('id', id);
    
    col.append(h3);

    return $(h3);
  },

  resetAutoNext: function(secondsBeforeNext){
    clearInterval(intro.autoNext);
    intro.autoNext = setInterval(intro.insertNextSegment, secondsBeforeNext);
  },

  /*The following two functions should be merged into on. They basically do
    the same thing with slight variations. I'm ashamed of this code. */

  insertInitialSegment: function(){
    
    clearInterval(intro.buttonAnimation);

    intro.emptyPage();
    intro.setUpContainer();

    let secondsBeforeNext = 8*1000;

    let rowDiv = intro.setUpRow(intro.container);
    let colDiv = intro.setUpCol(rowDiv, 'main');
    let h3 = intro.setUpH3(colDiv, 1);

    let nextUp = contentGrabber.giveNext().text;

    $(h3).html(nextUp)
         .addClass('firstTurn')
         .addClass('disable-select');

    intro.body.setAttribute('class', 'neutralBackground');
    setTimeout(() => intro.bindEventToContent($('body')),1000);

    intro.autoNext = setInterval(intro.insertNextSegment, secondsBeforeNext);
    
    },

  insertNextSegment: function(){
    clearInterval(intro.timer);
    let time = 0;
    intro.timer = setInterval(() => console.log(++time + " seconds"), 1000);

    let idOfPrevious = contentGrabber.getContentGrabbed();
    let idOfNext = idOfPrevious+1;
    let secondsBeforeNext = 8*1000;

    //prevent user from accidentally clicking next more than once
    intro.unbindEventFrom($('body'));
    setTimeout(()=>{intro.bindEventToContent($('body'))}, 1000);

    //normalise autoNext timer
    intro.resetAutoNext(secondsBeforeNext);

    //removing and re-adding element to restart css animation
    if(idOfPrevious < contentGrabber.getContentLength()){
      let nextUp = contentGrabber.giveNext().text;

      console.log("Section number: "+contentGrabber.getContentGrabbed());
      
      $('#'+idOfPrevious).remove();

      let $contentSelector = intro.setUpH3($('#main'), idOfNext);

      $contentSelector.html(nextUp)
                      .removeClass()
                      .addClass('disable-select')
                      .addClass('pointerCursor')
                      .addClass('yourTurn');

      intro.doMoreBasedOn($contentSelector);
    } else{
      clearInterval(intro.autoNext);
    }
  },

  //using setTimeOut to not overwrite the yourTurn animation or simply animate at a specific time
  doMoreBasedOn: function($selector){
    let timeBeforeNext = 7*1000;

    switch($selector.attr('id')){
      
      case '2':

      setTimeout(() => {
        $selector.addClass('animated')
                 .addClass('bounce')
                 .css('animation-duration', '3s')
                }, 2200);
      
      break;

      case '3':

      setTimeout(() => {
        $selector.addClass('animated')
                 .addClass('shake')
                 .css('animation-duration', '1.5s')
                }, 2000);

      
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '4':

      setTimeout(() => {
        $selector.addClass('animated')
                 .addClass('fadeOutDown')
                 .css('animation-duration', '4s')
                }, 4000);

      timeBeforeNext = 8*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '5':

       let row = intro.setUpRow(intro.container)
       let col = intro.setUpCol(row, 'secondary');
       let $h3 = intro.setUpH3(col, 'extra');


       moreAnimations.animateWordsOnto($h3);


      break;

      case '6':

      timeBeforeNext = 10*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '7':



      break;

      case '8':

      timeBeforeNext = 4*1000;
      intro.resetAutoNext(timeBeforeNext);


      break;

      case '9':

       setTimeout(() => {
        $selector.addClass('animated')
                 .addClass('pulse')
                 .css('animation-duration', '2s')
                }, 400);

      timeBeforeNext = 6*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '10':

      timeBeforeNext = 1*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '11':

      timeBeforeNext = 0.5*1000;
      intro.resetAutoNext(timeBeforeNext);


      break;

      case '12':

      timeBeforeNext = 0.5*1000;
      intro.resetAutoNext(timeBeforeNext);


      break;

      case '13':

      timeBeforeNext = 1.5*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '14':

      timeBeforeNext = 4*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '15':

      timeBeforeNext = 5*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '16':

      timeBeforeNext = 6*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '17':

      timeBeforeNext = 6*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '18':

      timeBeforeNext = 6*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '19':

      timeBeforeNext = 5*1000;
      intro.resetAutoNext(timeBeforeNext);


      break;

      case '20':

      timeBeforeNext = 5*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '21':

      timeBeforeNext = 5*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '22':

      timeBeforeNext = 5*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;

      case '23':

      timeBeforeNext = 5*1000;
      intro.resetAutoNext(timeBeforeNext);

      break;


    }
  }


  }

  intro.init();

})();
