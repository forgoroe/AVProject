export var phraseCreator = (function(){
  
  var words = ("Dolce volto, occhi, sorriso, capelli soffici, adorabile, "+
         "bella, attraente, piccola, sicurezza, una vita condivisa, parlare, "+
         "risate, affetto, mano nella mano, abbraccio di cinque minuti, stima, speranza, "+
         "fiducia contagiosa, mistero, voglia di vivere, conoscere ancora, tutta da vivere....");
  
  
  var dictionary = _createDictionary(words);
  var shortestLength = _findShortestPhraseLength(dictionary);  

  var counter = 0;
  var shuffledDictionary = _shuffleDictionary(dictionary);

  function _createDictionary(text){
    dictionary = [];
    dictionary = text.split(',');

    return dictionary;
  };

  function _randomIndexOf(dictionArg){
    return Math.floor((Math.random() * dictionArg.length));
  };

  function _randomPhraseCreator(dictionArg, amt){
      let randomPhrase = '';
      for(var i = 0; i < amt; i++) {
        randomPhrase += " " + dictionArg[_randomIndexOf(dictionArg)];
      }
      return randomPhrase;
  };

  function _shuffleDictionary(dictionArg){
    let tempDictionary = dictionArg.slice(0);
    var i = tempDictionary.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random() * (i+1));
      temp = tempDictionary[j];
      tempDictionary[j] = tempDictionary[i];
      tempDictionary[i] = temp;
    }
    return tempDictionary;
  }

  function _findShortestPhraseLength(dictionaryArg){
    var shortest = dictionaryArg.reduce(function(a, b) {
    return a.length <= b.length ? a : b;
    });
    return shortest.length;
  };

  function getDictionary(){
    return dictionary;
  }

  function getRandomPhrase(amountOfPhrases){
    var randomPhrase = _randomPhraseCreator(dictionary, amountOfPhrases);
    return randomPhrase;
  };


  function getNextInDictionary(){
    return shuffledDictionary[counter++];
  };

  function getShortestPhraseLength(){
    return shortestLength;  
  };

  return {
    getRandomPhrase: getRandomPhrase,
    getShortestPhraseLength: getShortestPhraseLength,
    getDictionary: getDictionary,
    getNextInDictionary: getNextInDictionary
  }

})();