function sequence(start, end) {
	  return Array(end - start + 1).fill().map((a, index) => start + index)
}

function takeRandomItemsFromArray(array, amount) {
	var answers = [];
	var index = 0;
	for (var a = 0; a < amount; a++) {		
		do {
			index = Math.floor(Math.random() * array.length);			
		} while (answers.includes(array[index]));
		answers.push(array[index]);
	}
	return answers;
}

function generateRandomUniqueNumbers(start, end, amount) {
	var answers = [];
	var slots = Array(end - start + 1);
	var index = 0;
	for (var a = 0; a < amount; a++) {
		do {
			index = Math.floor(Math.random() * slots.length);
		} while (slots[index]);
		slots[index] = true;
		answers.push(index + 1);
	}
	return answers;
}

lotteryUkLotto = {
	title: 'UK Lotto',
	currency: '&#163;',
	ticketPrice: 2,
	combinations: [
		[ "2 balls",                     9,        2, 0 ],
		[ "3 balls",                    95,       30, 0 ],
		[ "4 balls",                  2179,      140, 0 ],
		[ "5 balls",                144414,     1750, 0 ],
		[ "5 balls + bonus ball",  7509578,  1000000, 0 ],
		[ "6 balls",              45057474, 13000000, 0 ]
	],
	playerNumbers: function() {
		return generateRandomUniqueNumbers(1, 59, 6);
	},
	machineNumbers: function() {
		// includes bonus ball
		return generateRandomUniqueNumbers(1, 59, 7);
	},
	determineWinnings: function(player, machine) {
		var matched = 0;
		for (var a = 0; a < player.length; a++) {
			if (player.includes(machine[a])) {
				matched++;
			}
		}
		switch (matched) {
			case 2: return 0;
			case 3: return 1;
			case 4: return 2;
			case 5: return (player.includes(machine[6]) ? 4 : 3);
			case 6: return 5;
			default: return -1;
		}
	}
}

lotteryUkThunderball = {
	title: 'UK Thunderball',
	currency: '&#163;',
	ticketPrice: 1,
	combinations: [
		[ "Thunderball only",      28,      3, 0 ],
		[ "1 + Thunderball",       34,      5, 0 ],
		[ "2 + Thunderball",      134,     10, 0 ],
		[ "3 numbers",            110,     10, 0 ],
		[ "3 + Thunderball",     1436,     20, 0 ],
		[ "4 numbers",           3646,    100, 0 ],
		[ "4 + Thunderball",    47414,    250, 0 ],
		[ "5 numbers",         620045,   5000, 0 ],
		[ "5 + Thunderball", 58060597, 500000, 0 ]
	],
	playerNumbers: function() {
		var regular = generateRandomUniqueNumbers(1, 39, 5);
		var thunderball = generateRandomUniqueNumbers(1, 14, 1);
		return [regular, thunderball];
	},
	machineNumbers: function() {
		var regular = generateRandomUniqueNumbers(1, 39, 5);
		var thunderball = generateRandomUniqueNumbers(1, 14, 1);
		return [regular, thunderball];		
	},
	determineWinnings: function(player, machine) {
		var matched = 0;
		for (var a = 0; a < player[0].length; a++) {
			if (machine[0].includes(player[0][a])) {
				matched++;
			}
		}
		var isThunderballChosen = (player[1][0] == machine[1][0]);
		switch (matched) {
			case 0: return (isThunderballChosen ? 0 : -1);
			case 1: return (isThunderballChosen ? 1 : -1);
			case 2: return (isThunderballChosen ? 2 : -1);
			case 3: return (isThunderballChosen ? 4 :  3);
			case 4: return (isThunderballChosen ? 6 :  5);
			case 5: return (isThunderballChosen ? 8 :  7);
			default: return -1;
		}		
	}	
}

var lotteries = [
	lotteryUkLotto,
	lotteryUkThunderball
]

function isUsed(a) {
	return a;
}

isUsed(lotteries);