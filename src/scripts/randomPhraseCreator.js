export var randomPhraseCreator = (function(){
  
  var words = ("Dolce volto, occhi, sorriso, capelli soffici, adorabile, "+
         "bella, attraente, piccola, sicurezza, una vita condivisa, parlare, "+
         "risate, affetto, mano nella mano, abbraccio di cinque minuti, stima, speranza, "+
         "fiducia contagiosa, mistero, voglia di vivere, conoscere ancora, tutta da vivere....");
  
  var amountOfPhrases = 3;
  var dictionary = _createDictionary(words);
  var shortestLength = _findShortestPhraseLength(dictionary);  

  function _createDictionary(text){
    dictionary = [];
    dictionary = text.split(',');

    return dictionary;
  };

  function _randomIndexOf(dictionArg){
    return Math.floor(Math.random() * dictionArg.length)
  };

  function _randomPhraseCreator(dictionArg, amt){
      var randomPhrase = '';
      for(var i = 0; i < amt; i++) {
        randomPhrase += " " + dictionArg[_randomIndexOf(dictionArg)];
      }
      return randomPhrase;
  };

  function _findShortestPhraseLength(dictionaryArg){
    var shortest = dictionaryArg.reduce(function(a, b) {
    return a.length <= b.length ? a : b;
    });
    return shortest.length;
  };

  function getDictionary(){
    return dictionary;
  }

  function getRandomPhrase(){
    var randomPhrase = _randomPhraseCreator(dictionary, amountOfPhrases);
    return randomPhrase.trim();
  };

  function getShortestPhraseLength(){
    return shortestLength;  
  };

  return {
    getRandomPhrase: getRandomPhrase,
    getShortestPhraseLength: getShortestPhraseLength,
    getDictionary: getDictionary
  }

})();