app.factory('RhymeService', ['$resource', '$http', function($resource, $http){
  var rhymer = {

    // completeMatch: function(id, success, error){
    //   @service = $resource('/api/campaigns/:id', {id: '@id'}, {'update': {method: 'PUT'}})
    //   @service.get({id: id}, success, error)
    // }

    splitMatch: function(pattern, success, error){
      $resource('/split').get({pattern: pattern}, success, error);
    },

    search: function(word, success, error){
      service = $resource('/search/:word', {word: "@word"});
      service.get({word: word}, success, error);
      // $http.get(url).
      // success(function(data) {
      //   rhymer.pronunciations = data.list;
      //   rhymer.selectedPronIndex = 1;
      //   rhymer.selectPron(data.list[1]);
      // }).
      // error(function(data) {});
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
    //     rhymer.highlightPron();
    //   }).
    //   error(function(data) {});
    // }

  };
  return rhymer;
}]);