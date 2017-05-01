app.controller("rhymeCtlr", ['$scope', 'RhymeService', function($scope, RhymeService){
	$scope.RhymeService = RhymeService;
	// Initialize the first rhyme
 //    $scope.rhyme = "imagination";
	$scope.rhyme = "current";
  $scope.usableSyllables = 0;
  $scope.pronunciations = [];
  $scope.helpProns = false;
  $scope.helpSyls = false;
  $scope.helpWholeMatch = false;
  $scope.helpSplitMatch = false;

  $scope.closeHelp = function(index){
    var helps = ["helpProns", "helpSyls", "helpWholeMatch", "helpSplitMatch"];
    $scope.RhymeService[helps[index]] = false;
  };


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
      syls.forEach(function(el, ind, arr){
        $scope.syllables.push({text: el, truncatedPronunciation: truncatedPronunciations[ind], use: true});
      });
      // postDigest waits for angular to apply all changes
      // cant highlight the pron until angular creates the elements
      $scope.$$postDigest(function () {
        $scope.highlightPronunciation(index);
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
    $scope.selectPronunciation(data.pronunciations[0], 1);
	};

	$scope.errorSearchCallback = function(data, responseHeaders, status, statusText){
    console.log("Search errored out");
    debugger
	};

	// window.test = function (pat){
	// 	RhymeService.splitMatch(pat, $scope.successCallback, $scope.errorCallback);
	// };

}]);