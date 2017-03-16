import { randomPhraseCreator } from "./scripts/randomPhraseCreator";
import { contentGrabber } from "./scripts/contentGrabber";
//be warned. The code is messier than usual :(
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

      let delay = 8;
      let count = randomPhraseCreator.getShortestPhraseLength()*2;
      let icon = '<i class="fa fa-envelope" aria-hidden="true"></i>';
      let iconIsSet = false;
      this.btn.classList.remove('show');

      let gen = setInterval(function() {
        intro.el.setAttribute('data-before', randomPhraseCreator.getRandomPhrase());
        intro.el.setAttribute('data-after', randomPhraseCreator.getRandomPhrase());
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
  },

  emptyPage: function(){
    $('body').empty();
  },

  setUpElements: function(){
    this.setUpContainer();
  },

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

  setUpCol: function(row){
    let colDiv = document.createElement('div');
    colDiv.classList.add('col-xs-12');

    row.appendChild(colDiv);

    return colDiv;
  },

  setUpH3: function(col, id){
    let h3 = document.createElement('h3');
    h3.setAttribute('id', id);
    
    col.append(h3);

    return $(h3);
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

    let secondsBeforeNext = 8*1000;

    let rowDiv = intro.setUpRow(intro.container);
    let colDiv = intro.setUpCol(rowDiv);
    let h3 = intro.setUpH3(colDiv, 1);

    let nextUp = contentGrabber.giveNext().text;

    $(h3).html(nextUp)
         .addClass('firstTurn')
         .addClass('disable-select');

    intro.body.setAttribute('class', 'neutralBackground');
    setTimeout(() => intro.bindEventToContent($('body')),1600);

    intro.autoNext = setInterval(intro.insertNextSegment, secondsBeforeNext);
    
    },

  insertNextSegment: function(){
    let idOfPrevious = contentGrabber.getContentGrabbed();
    let idOfNext = idOfPrevious+1;
    let secondsBeforeNext = 8*1000;

    //prevent user from accidentally clicking next more than once
    intro.unbindEventFrom($('body'));
    setTimeout(()=>{intro.bindEventToContent($('body'))}, 1600);

    //if the event was fired by body, reset the timer
    if($(this).is('body')){
      clearInterval(intro.autoNext);
      intro.autoNext = setInterval(intro.insertNextSegment, secondsBeforeNext);
    }

    //removing and re-adding element to restart css animation
    if(idOfPrevious < contentGrabber.getContentLength()){
      let nextUp = contentGrabber.giveNext().text;

      console.log(contentGrabber.getContentGrabbed());
      
      $('#'+idOfPrevious).remove();

      let $contentSelector = intro.setUpH3($('.col-xs-12'), idOfNext);

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
    switch($selector.attr('id')){
      
      case '2':

      setTimeout(() => {
        $selector.addClass('animated')
                 .addClass('bounce')
                 .css('animation-duration', '3s')
                }, 2500);
      
      break;

      case '3':

      setTimeout(() => {
        $selector.addClass('animated')
                 .addClass('shake')
                 .css('animation-duration', '2s')
                }, 2000);

      break;
      case '4':




      break;
      case '5':



      break;
      case '6':



      break;
      case '7':



      break;
      case '8':



      break;
      case '9':

       setTimeout(() => {
        $selector.addClass('animated')
                 .addClass('pulse')
                 .css('animation-duration', '2s')
                }, 400);

      break;
      case '10':



      break;
      case '11':



      break;
      case '12':




      break;
      case '13':



      break;
      case '14':



      break;
      case '15':



      break;
      case '16':



      break;
      case '17':



      break;
      case '18':



      break;

    }
  }


  }

  intro.init();

})();
