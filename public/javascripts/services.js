app.factory('RhymeService', ['$resource', function($resource){
  var RhymeService = {

    completeRhyme: function(pattern, success, error){
      $resource('/complete').get({pattern: pattern}, success, error);
    },

    splitRhyme: function(syllables, success, error){
      $resource('/split').get({syllables: syllables}, success, error);
    },

    search: function(word, success, error){
      service = $resource('/search/:word', {word: "@word"});
      service.get({word: word}, success, error);
    }

    // getRhymes: function(index){
    //   var pattern = rhymer.compilePattern();
    //   var url = '/rhyme/' + pattern;
    //   $http.get(url).
    //   success(function(data) {
    //     rhymer.usableSyls = 0;
    //     rhymer.syls.forEach(function(el, ind, arr){
    //       if(el.use){ rhymer.usableSyls += 1}
    //     });
    //     rhymer.cMRhymes = data.completeMatch;
    //     rhymer.splitRhymes = data.splitMatch;
        // rhymer.highlightPron();
    //   }).
    //   error(function(data) {});
    // }

  };
  return RhymeService;
}]);