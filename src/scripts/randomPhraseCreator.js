export var randomPhraseCreator = (function(){
  
  var words = ("Dolce volto, occhi, sorriso, capelli soffici, adorabile, "+
         "bella, attraente, piccola, sicurezza, una vita condivisa, parlare, "+
         "risate, affetto, mano nella mano, abbraccio di 5 minuti, stima, speranza, "+
         "fiducia contagiosa, mistero, voglia di vivere, conoscere ancora, tutta da vivere....");

  function createDictionary(text){
    var dictionary = []
    dictionary = text.trim().split(',');

    return dictionary;
  };

  function randomIndexOf(dictionArg){
    return Math.floor(Math.random() * dictionArg.length)
  };

  function randomPhraseCreator(dictionArg, amt){
      var randomPhrase = '';
      for(var i = 0; i < amt; i++) {
        randomPhrase += dictionArg[randomIndexOf(dictionArg)];
      }
      return randomPhrase;
  };

  var myDictionary = createDictionary(words);
  var amountOfPhrases = 2;

  var randomPhrase = randomPhraseCreator(myDictionary, amountOfPhrases);

  return {
    randomPhrase: randomPhrase
  }

})();
/*
  function(str) {
      var count = 10;
      var delay = 4;
      
      btn.classList.remove('show');
      el.innerHTML = '';
      
      var gen = setInterval(function() {
        el.setAttribute('data-before', randomPhrase(count));
        el.setAttribute('data-after', randomPhrase(count));
        if(delay > 0) {
          delay--;
        }
        else {
          if(count < str.length) {
            el.innerHTML += str[str.length - count-1];
          }
          count--;
          if(count === -1) {
            clearInterval(gen);
            showButton();
          }
        }
      }, 195);
    }
    */