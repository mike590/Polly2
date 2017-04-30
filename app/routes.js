module.exports = function(app, Word){

  app.get('/search/:word', function(req, res){
		var returnList = [];
		var matchWord = req.params.word.toLowerCase();
		Word;
		debugger
		// doc.forEach(function(el, ind, arr){
		// 	if(matchWord === el.word){
		// 	  el.pron.forEach(function(p_el, p_ind, p_arr){
		// 	    el.exacts.forEach(function(ex_el, ex_ind, ex_arr){
		// 	      if(p_ind === ex_ind){
		// 	        returnList.push({text: p_el, exact: ex_el});
		// 	      }
		// 	    });
		// 	  });
		// 	}
		// });
		// if(returnList.length === 0){
		// 	returnList = [{text: "Not in Dictionary", disabled: true}];
		// 	returnList.unshift({text: "Pronunciations", token: true});
		// 	res.json({list: returnList});
		// } else {
		// 	returnList.sort(function(a, b){
		// 	  return a.text.length - b.text.length;
		// 	});
		// 	returnList.unshift({text: "Pronunciations", token: true});
		// 	res.json({list: returnList});
		// }
		res.json({status: "Success"});
  });

// Split Match
  app.get('/split', function (req, res) {
  	pattern = req.query.pattern;
  	res.json({status: "Success"});
  })

  // Complete Match
  app.get('/complete', function (req, res) {
  	pattern = req.query.pattern;
  	res.json({status: "Success"});
  })

};