app.directive("search", ["$http", "RhymeService", function($http, RhymeService){
  return {
    restrict: "A",
    replace: true,
    templateUrl: "views/templates/search.html",
    link: function(scope, elem, attr){
      scope.RhymeService = RhymeService;

      // press enter on text field should send data
      document.getElementById('rhyme_input').addEventListener('keydown', function(e){
        if(e.keyCode === 13){
          console.log("hit enter with word: " + scope.rhyme)
          scope.RhymeService.search(scope.rhyme);
        }
      });

      // clicking on text box should highlight all the text
      scope.highlight = function(){
        document.getElementById('rhyme_input').select();
        0
        scope.RhymeService.splitMatch("a")
      }

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
  }
}]);

// app.directive("sylselect", ['rhymer', function(rhymer){
//   return {
//     restrict: "A",
//     replace: true,
//     templateUrl: "sylselect.html",
//     link: function(scope, elem, attr){

//       scope.clickSyl = function(index){
//         var syl = scope.rhymer.syls[index];
//         if(syl.disabled != true && (rhymer.usableSyls != 1 || !syl.use)){
//           rhymer.helpSyls = false;
//           // Alternate syl class and property
//           syl.use = !syl.use;
//           var syl_dom = document.getElementById("syl" + index)
//           new_class = syl.use ? "use" : "dont"
//           syl_dom.className = new_class + " hand";
//           rhymer.getRhymes();
//         }
//       };

//       scope.rhymer = rhymer;

//     }
//   }
// }]);

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