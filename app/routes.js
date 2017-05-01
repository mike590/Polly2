module.exports = function(app, Word){
	// Find word, return it to display its pronciations and make its
	// truncated_pronunciations available to the front end
	var search = function(req, res){
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
				returnList.push({text: "Not in Dictionary", disabled: true});
				res.json({pronunciations: returnList});
			}
		});

	};

	app.get('/search/:word', search);

	// Split Match
	var split = function (req, res){
		var syllables = req.query.syllables;
		var rhymes = {};
		for(let i=0, j=syllables.length; i<j; i++){
			var dbCallback = function(err, words){
				if(err)	throw err;
				if(words){
					rhymes[syllables[i]] = words.map(function(x){return x.word;});
				}else{
					rhymes[syllables[i]] = ["Not Found"];
				}
			};
		// ^ indicates that the syllable has been deselected
			if(syllables[i] !== "^"){
				Word.splitRhyme(syllables[i], dbCallback);
	    }else{
				rhymes[syllables[i]] = ["-"];
	    }
  }
  // check if the rhymes are captured every second
  var checkIfFinished = function(){
		if(Object.keys(rhymes).length === syllables.length){
			clearInterval(int);
			res.json({rhymes: rhymes});
		}
	};
  var int = setInterval(checkIfFinished, 1000);
  // Only wait 10 seconds
  var clearInt = function(){
  	if(int._repeat){
			clearInterval(int);
			res.json({rhymes: rhymes});
		}
  };
  setTimeout(clearInt, 10000);
	}


  app.get('/split', split);
};




//   // Complete Match
//   app.get('/complete', function (req, res) {
//   	pattern = req.query.pattern;
//   	res.json({status: "Success"});
//   })