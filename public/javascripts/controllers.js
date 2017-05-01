app.controller("rhymeCtlr", ['$scope', 'RhymeService', function($scope, RhymeService){
	$scope.RhymeService = RhymeService;
	// Initialize the first rhyme
 //    $scope.rhyme = "imagination";
	$scope.rhyme = "current";
  // $scope.syllables = [{text: "Enter", disabled: true}, {text: "a", disabled: true}, {text: "word", disabled: true}];
  $scope.usableSyllables = 0;
  $scope.pronunciations = [];
  $scope.selectedPronunciationIndex = 1;
  $scope.helpProns = false;
  $scope.helpSyls = false;
  $scope.helpWholeMatch = false;
  $scope.helpSplitMatch = false;

  $scope.closeHelp = function(index){
    var helps = ["helpProns", "helpSyls", "helpWholeMatch", "helpSplitMatch"];
    $scope.RhymeService[helps[index]] = false;
  };

  $scope.clickPron = function(pron, index){
    if(pron.exact){
      $scope.RhymeService.selectedPronunciationIndex = index;
      $scope.RhymeService.helpProns = false;
      $scope.RhymeService.selectPronunciation(pron);
    }
  };

  $scope.highlightPron = function(){
    var prons = document.querySelectorAll("#pron_list li");
    for(i = 0; i < prons.length; ++i){
      prons[i].id = "";
    }
    prons[$scope.RhymeService.selectedPronunciationIndex].id = "highlight";
  };

  $scope.selectPronunciation = function(pron){
    // empty syllables
    $scope.syllables = [];
    var truncatedPronunciations;
    var syls = pron.text.split("-");
    if(pron.truncatedPronunciation){
      truncatedPronunciations = pron.truncatedPronunciation.split("-");
      syls.forEach(function(el, ind, arr){
        syls.push({text: el, truncatedPronunciation: truncatedPronunciations[ind], use: true});
      });
      // $scope.RhymeService.getRhymes();
    } else {
      $scope.usableSyllables = 0;
      $scope.syllables.push(pron);
      $scope.completeRhymes = [pron.text];
      $scope.splitRhymes = [false];
    }
  };

  $scope.compilePattern = function(){
    pattern = '';
    $scope.RhymeService.syls.forEach(function(el, ind, arr){
      if(el.use){
        pattern += el.exact;
      } else {
        pattern += '^';
      }
      if(ind != $scope.RhymeService.syls.length - 1){
        pattern += '-';
      }
    });
    return pattern;
  };

	$scope.completeRhymes = [];
  $scope.splitRhymes = [];

  $scope.successSearchCallback = function(data, responseHeaders, status, statusText){
    $scope.pronunciations = data.pronunciations;
    $scope.selectedPronunciationIndex = 1;
    $scope.selectPronunciation(data.pronunciations[0]);
	};

	$scope.errorSearchCallback = function(data, responseHeaders, status, statusText){
    console.log("Search errored out");
    debugger
	};

	// window.test = function (pat){
	// 	RhymeService.splitMatch(pat, $scope.successCallback, $scope.errorCallback);
	// };

}]);