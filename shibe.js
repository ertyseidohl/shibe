var lexer = new Lexer();
var posTagger = new POSTagger();
var lexWords = function(){
	var inEl = document.getElementById('input');
	var words = lexer.lex(inEl.value);
	return posTagger.tag(words);
};
var objToSortedArray = function(obj){
	//this next part can be optimized
	//right now it is like O(n^2)
	var arr = Array();
	while(Object.keys(obj).length > 0){
		var max = 0;
		var maxVal = null;
		for(var i in obj){
			if(obj[i] > max){
				maxVal = i;
				max = obj[i];
			}
		}
		arr.push(maxVal);
		delete obj[maxVal];
	}
	return arr;
};
var sortWords = function(taggedWords){
	var tags = ['CC', 'CD', 'DT', 'EX', 'FW', 'IN', 'JJ', 'JJR', 'JJS', 'LS', 'MD', 'NN', 'NNP', 'NNPS', 'NNS', 'POS', 'PDT', 'PP$', 'PRP', 'PRP$', 'RB', 'RBR', 'RBS', 'RP', 'SYM', 'TO', 'UH', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'WDT', 'WP', 'WP$', 'WRB'];
	wordList = {};
	for(var t in tags){
		wordList[tags[t]] = {};
	}
	var blacklist = getBlacklist();
	for (var i in taggedWords) {
		var taggedWord = taggedWords[i];
		var word = taggedWord[0].toLowerCase();
		var tag = taggedWord[1];
		word = word.replace(/[^A-Za-z]/g, '');
		if(word.length > 2 && word.indexOf("'") === -1 && blacklist.indexOf(word) === -1){
			if(wordList[tag][word]){
				wordList[tag][word] += 1;
			} else{
				wordList[tag][word] = 1;
			}
		}
	}
	return wordList;
};
var getPhrases = function(){
	var phrases = document.getElementById('phrases').value.split("\n");
	var i = phrases.length;
	for(var k = 0; k < i; k++){
		while(phrases[k][0] === '*'){
			phrases.push(phrases[k].replace(/\*/g, ''));
			phrases[k] = phrases[k].substring(1);
		}
	}
	phrases = phrases.map(function(a){return a.trim().toLowerCase()});
	phrases = phrases.filter(function(a){return a.length > 2});
	return phrases;
};
var getBlacklist = function(){
	var blacklist = document.getElementById('blacklist').value.split(",");
	blacklist = blacklist.map(function(a){return a.trim().toLowerCase()});
	return blacklist;
};
var getRandomPhrase = function(words, phrases){
	var chosenPhrase = phrases[parseInt(Math.random() * phrases.length)];
	chosenPhrase = chosenPhrase.replace(/\[(.*)\]/g, function(match){
		match = match.replace(/[\[\]]/g, '').toUpperCase();
		if(words[match]){
			var tagwords = Object.keys(words[match]);
			return tagwords[parseInt(Math.random() * tagwords.length)];
		} else{
			return match;
		}
	});
	return chosenPhrase;
};
var createShibe = function(words, phrases){
	var outEl = document.getElementById('output');

	outEl.value = "";

	wow = parseFloat(document.getElementById('wow').value);
	phraseDensity = parseFloat(document.getElementById('phrasedensity').value);
	blankChance = parseFloat(document.getElementById('blankchance').value);

	for(var line = 0; line < outEl.rows; line++){
		if(Math.random() < blankChance){
			//blank line
			outEl.value += "    \n";
		} else{
			var len = 4;
			outEl.value += "    ";
			while(len < outEl.cols){
				var rand = Math.random();
				var toWrite = "";
				if(rand < phraseDensity){
					toWrite = getRandomPhrase(words, phrases);
				} else if(rand < wow + phraseDensity){
					toWrite = "wow"
				}
				if(len + toWrite.length < outEl.cols){
					outEl.value += toWrite;
					len += toWrite.length;
				}
				var spaces = parseInt(Math.random() * 10) + 5;
				for(var f = 0; f < spaces; f++){
					outEl.value += " "
				}
				len += spaces;
			}
			outEl.value += "\n";
		}
	}
};
