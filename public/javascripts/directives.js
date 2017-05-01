app.directive("search", function(){
  return {
    restrict: "A",
    replace: true,
    templateUrl: "views/templates/search.html",
    link: function(scope, elem, attr){
      // press enter on text field should send data
      document.getElementById('rhyme_input').addEventListener('keydown', function(e){
        if(e.keyCode === 13){
          scope.RhymeService.search(scope.rhyme, scope.successSearchCallback, scope.errorSearchCallback);
        }
      });

      // clicking on text box should highlight all the text
      scope.highlight = function(){
        document.getElementById('rhyme_input').select();
      };

      scope.refreshHelp = function(){
        scope.RhymeService.helpProns = true;
        scope.RhymeService.helpSyls = true;
        scope.RhymeService.helpWholeMatch = true;
        scope.RhymeService.helpSplitMatch = true;
        scope.rhyme = "guidance";
        scope.RhymeService.getProns(scope.rhyme);
      };

      // scope.RhymeService.getPronunciations(scope.rhyme);

    }
  };
});

app.directive("syllableselect", function(){
  return {
    restrict: "A",
    replace: true,
    templateUrl: "views/templates/syllable_select.html",
    link: function(scope, elem, attr){
      console.log("syl select");
      // scope.clickSyl = function(index){
      //   var syl = scope.rhymer.syls[index];
      //   if(syl.disabled != true && (rhymer.usableSyls != 1 || !syl.use)){
      //     rhymer.helpSyls = false;
      //     // Alternate syl class and property
      //     syl.use = !syl.use;
      //     var syl_dom = document.getElementById("syl" + index)
      //     new_class = syl.use ? "use" : "dont"
      //     syl_dom.className = new_class + " hand";
      //     rhymer.getRhymes();
      //   }
      // };
      0
    }
  };
});

// app.directive("completematch", ['rhymer', function(rhymer){
//   return{
//     restrict: "A",
//     replace: true,
//     templateUrl: "completematch.html",
//     link: function(scope, elem, ettr){
//       scope.rhymer = rhymer;
//     }
//   }
// }]);

// app.directive("splitmatch", ['rhymer', function(rhymer){
//   return{
//     restrict: "A",
//     replace: true,
//     templateUrl: "splitmatch.html",
//     link: function(scope, elem, ettr){
//       scope.rhymer = rhymer;
//     }
//   }