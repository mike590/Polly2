module.exports = function(app, Word){
	// Find word, return it to display its pronciations and make its
	// truncated_pronunciations available to the front end
	search = function(req, res){
		var returnList = [];
		var matchWord = req.params.word.toLowerCase();
		Word.findOne({word: matchWord}, function(err, word){
			if(err){
				console.log("Error while trying to find" + matchWord);
				throw err;
			}
			if(word){
				word.pronunciations.forEach(function(pron, pron_ind, pron_arr){
						returnList.push({text: pron, truncatedPronunciation: word.truncated_pronunciations[pron_ind]});
				});
				res.json({pronunciations: returnList});
			}else{
				returnList = [{text: "Not in Dictionary", disabled: true}];
				res.json({pronunciations: returnList});
			}
		});

	};

	app.get('/search/:word', search);
};

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
// 		res.json({status: "Success"});
//   });

// // Split Match
//   app.get('/split', function (req, res) {
//   	pattern = req.query.pattern;
//   	res.json({status: "Success"});
//   })

//   // Complete Match
//   app.get('/complete', function (req, res) {
//   	pattern = req.query.pattern;
//   	res.json({status: "Success"});
//   })