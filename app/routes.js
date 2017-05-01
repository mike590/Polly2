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
			// found word
			if(word){
				word.pronunciations.forEach(function(pron, pron_ind, pron_arr){
						returnList.push({text: pron, truncatedPronunciation: word.truncated_pronunciations[pron_ind]});
				});
				res.json({pronunciations: returnList});
			// didnt find word
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
		if(typeof syllables == "string"){
			syllables = [syllables];
		}
		// arrays of rhymes will be added as values,
		// with the key being the syllable they rhyme with
		var rhymes = {};
		for(let i=0, j=syllables.length; i<j; i++){
			// The Word Model has a class method splitRhyme, which
			// takes a callback. We define it here, so it has to access
			// to the rhymes variable
			var dbCallback = function(err, words){
				if(err)	throw err;
				console.log(words.length);
				if(words.length){
					rhymes[syllables[i]] = words.map(function(x){return x.word;});
				}else{
					rhymes[syllables[i]] = ["None Found"];
				}
			};
			Word.splitRhyme(syllables[i], dbCallback);
		}

		// Since multiple async calls are being made, we have to
		// wait until they are completed
		// check if the rhymes are captured every second
		var checkIfFinished = function(){
			if(Object.keys(rhymes).length === syllables.length){
				clearInterval(int);
				res.json({rhymes: rhymes});
			}
		};
		var int = setInterval(checkIfFinished, 1000);
		// Only wait 10 seconds, then just send whatever is ready
		var clearInt = function(){
			// int._repeat will be set to null if the interval has
			// already been cleared and there's no need for further action
			if(int._repeat){
				clearInterval(int);
				res.json({rhymes: rhymes});
			}
		};
		setTimeout(clearInt, 10000);
	};


  app.get('/split', split);

  // Complete Match
	var complete = function (req, res){
		var pattern = req.query.pattern;
		var dbCallback = function(err, words){
			if (err) throw err;
			res.json({rhymes: words.map(function(x){return x.word;})});
		};
		Word.completeRhyme(pattern, dbCallback);
	};

	app.get('/complete', complete);
};




//   // Complete Match
//   app.get('/complete', function (req, res) {
//   	pattern = req.query.pattern;
//   	res.json({status: "Success"});
//   })