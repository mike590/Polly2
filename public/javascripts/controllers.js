app.controller("rhymeCtlr", ['$scope', 'RhymeService', function($scope, RhymeService){
	$scope.RhymeService = RhymeService;
	// Initialize the first rhyme
 //    $scope.rhyme = "imagination";
	// {"word":"imagination","pron":["i-ˌma-jə-ˈnā-shən"],"exacts":["i-ˌa-ə-ˈā-ən"]}
	$scope.rhyme = "current";
    // {"word":"current","pron":["ˈkər-ənt","ˈkə-rənt"],"exacts":["ˈər-ənt","ˈə-ənt"]}
	$scope.syllables = [{text: "Enter", disabled: true}, {text: "a", disabled: true}, {text: "word", disabled: true}]
    $scope.usableSyllables = 0
    $scope.pronunciations = []
    $scope.selectedPronIndex = 1
    $scope.helpProns = false
    $scope.helpSyls = false
    $scope.helpWholeMatch = false
    $scope.helpSplitMatch = false
    $scope.closeHelp = function(index){
      var helps = ["helpProns", "helpSyls", "helpWholeMatch", "helpSplitMatch"];
      $scope.RhymeService[helps[index]] = false;
    }
    $scope.clickPron = function(pron, index){
      if(pron.exact){
        $scope.RhymeService.selectedPronIndex = index;
        $scope.RhymeService.helpProns = false;
        $scope.RhymeService.selectPron(pron);
      }
    }
    $scope.highlightPron = function(){
      var prons = document.querySelectorAll("#pron_list li");
      for(i = 0; i < prons.length; ++i){
        prons[i].id = "";
      }
      prons[$scope.RhymeService.selectedPronIndex].id = "highlight";
    }
    $scope.selectPron = function(pron){
      if(pron.token){
        return null;
      }
      $scope.RhymeService.syls = [];
      var exacts;
      var syls = pron.text.split("-");
      if(pron.exact){
        exacts = pron.exact.split("-");
        syls.forEach(function(el, ind, arr){
          $scope.RhymeService.syls.push({text: el, exact: exacts[ind], use: true});
        });
        $scope.RhymeService.getRhymes();
      } else {
        $scope.RhymeService.usableSyls = 0;
        $scope.RhymeService.syls.push(pron);
        $scope.RhymeService.cMRhymes = ["Word Not Found"];
        $scope.RhymeService.splitRhymes = [false];
      }
    }
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
    }
	$scope.cMRhymes = []
    $scope.splitRhymes = []

    $scope.successCallback = function(data, responseHeaders, status, statusText){
		data
		responseHeaders
		debugger
	}
	$scope.errorCallback = function(data, responseHeaders, status, statusText){
		data
		responseHeaders
		debugger
	}
	window.test = function (pat){
		RhymeService.splitMatch(pat, $scope.successCallback, $scope.errorCallback);
	};

}]);