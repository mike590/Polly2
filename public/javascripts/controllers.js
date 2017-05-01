app.controller("rhymeCtlr", ['$scope', 'RhymeService', function($scope, RhymeService){
	$scope.RhymeService = RhymeService;
	// Initialize the first rhyme
 //    $scope.rhyme = "imagination";
	$scope.rhyme = "current";
  $scope.splitRhymes = {};
  $scope.usableSyllables = 0;
  $scope.pronunciations = [];
  $scope.helpProns = false;
  $scope.helpSyls = false;
  $scope.helpWholeMatch = false;
  $scope.helpSplitMatch = false;


  $scope.highlightPronunciation = function(index){
    var prons = document.querySelectorAll("#pron_list li");
    // only highlight if there are pronunciations to highlight
    if(prons.length > 1){
      // highlight by class,so remove that class from all, then add to the right one
      for(i = 0; i < prons.length; ++i){
        // The first element is the label, don't mess with its id
        if(i != 0){
          prons[i].id = "";
        }
      }
      prons[index].id = "highlight";
    }
  };

  $scope.selectPronunciation = function(pron, index){
    // empty syllables
    $scope.syllables = [];
    var truncatedPronunciations;
    var syls = pron.text.split("-");
    if(pron.truncatedPronunciation){
      $scope.helpProns = false;
      truncatedPronunciations = pron.truncatedPronunciation.split("-");
      $scope.usableSyllables = syls.length;
      syls.forEach(function(el, ind, arr){
        $scope.syllables.push({text: el, truncatedPronunciation: truncatedPronunciations[ind], use: true});
      });
      // postDigest waits for angular to apply all changes
      // cant highlight the pronunciation until angular creates the elements
      $scope.$$postDigest(function () {
        $scope.highlightPronunciation(index);
      });
      $scope.retrieveRhymes();
    } else {
      // Couldn't find word
      $scope.usableSyllables = 0;
      $scope.syllables.push(pron);
      $scope.completeRhymes = [pron.text];
      $scope.splitRhymes = [false];
    }
  };

  $scope.retrieveRhymes = function(){
    // Retrieve split rhymes and complete rhymes with separate calls
    var pattern = $scope.compilePattern();
    $scope.RhymeService.completeRhyme(pattern, $scope.successCompleteCallback, $scope.errorCompleteCallback);
    $scope.RhymeService.splitRhyme($scope.syllables.map(function(syl){return syl.truncatedPronunciation;}), $scope.successSplitCallback, $scope.errorSplitCallback);
  };

  $scope.compilePattern = function(){
    pattern = '';
    for(var i=0, j=$scope.syllables.length; i<j; i++){
      if($scope.syllables[i].use){
        pattern += $scope.syllables[i].truncatedPronunciation;
      }else {
        // if the syllable isn't used, insert the regex to skip it
        // [^-]+ will skip to the next hyphen/syllable
        pattern += '[^-]+';
      }
      if(i != j-1){
        pattern += '-';
      }
    }
    return pattern + "$";
  };

  $scope.closeHelp = function(index){
    var helps = ["helpProns", "helpSyls", "helpWholeMatch", "helpSplitMatch"];
    $scope.RhymeService[helps[index]] = false;
  };


  $scope.successCompleteCallback = function(data, responseHeaders, status, statusText){
    $scope.completeRhymes = data.rhymes;
  };

  $scope.errorCompleteCallback = function(data, responseHeaders, status, statusText){
    debugger
  };

  $scope.successSplitCallback = function(data, responseHeaders, status, statusText){
    $scope.splitRhymes = data.rhymes;
  };

  $scope.errorSplitCallback = function(data, responseHeaders, status, statusText){
    debugger
  };

  $scope.successSearchCallback = function(data, responseHeaders, status, statusText){
    $scope.pronunciations = data.pronunciations;
    $scope.selectPronunciation(data.pronunciations[0], 1);
  };


	$scope.errorSearchCallback = function(data, responseHeaders, status, statusText){
    console.log("Search errored out");
    debugger
	};

	$scope.tester = function (x){
    $scope
    x
    debugger
	};

}]);
