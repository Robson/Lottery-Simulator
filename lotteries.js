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
	currencyOutput: '£',
	ticketPrice: 2,
	description: '',
	wikipedia: "https://en.wikipedia.org/wiki/National_Lottery_(United_Kingdom)#Lotto",
	forcePrecision: null,
	combinations: [
		[ "2 balls",                     9,       2, 0 ],
		[ "3 balls",                    95,      30, 0 ],
		[ "4 balls",                  2179,     140, 0 ],
		[ "5 balls",                144414,    1750, 0 ],
		[ "5 balls + bonus ball",  7509578, 1000000, 0 ],
		[ "6 balls",              45057474, 6700000, 0 ]
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
	currencyOutput: '£',
	ticketPrice: 1,
	description: '',	
	wikipedia: "https://en.wikipedia.org/wiki/National_Lottery_(United_Kingdom)#Thunderball",
	forcePrecision: null,
	combinations: [
		[ "Thunderball only",     28,      3, 0 ],
		[ "1 + Thunderball",      34,      5, 0 ],
		[ "2 + Thunderball",     134,     10, 0 ],
		[ "3 numbers",           110,     10, 0 ],
		[ "3 + Thunderball",    1436,     20, 0 ],
		[ "4 numbers",          3646,    100, 0 ],
		[ "4 + Thunderball",   47414,    250, 0 ],
		[ "5 numbers",        620045,   5000, 0 ],
		[ "5 + Thunderball", 8060597, 500000, 0 ]
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

lotteryUkSetForLife = {
	title: 'UK Set For Life',
	currency: '&#163;',
	currencyOutput: '£',
	ticketPrice: 1.5,
	description: "The prize for <em>5 numbers</em> is £10K every month for a year (total: £120K).<br/>The prize for <em>5 numbers + Life Ball</em> is £10K every month for 30 years (total: £3.6M).",
	wikipedia: "https://en.wikipedia.org/wiki/National_Lottery_(United_Kingdom)#Set_For_Life",
	forcePrecision: null,
	combinations: [
		[ "2 numbers",           14,           5, 0 ],
		[ "2 + Life Ball",      133,          10, 0 ],
		[ "3 numbers",          197,          20, 0 ],
		[ "3 + Life Ball",     1781,          30, 0 ],
		[ "4 numbers",         8115,          50, 0 ],
		[ "4 + Life Ball",    73044,         250, 0 ],	
		[ "5 numbers",      1704376,    12*10000, 0 ],
		[ "5 + Life Ball", 15339389, 30*12*10000, 0 ],		
	],
	playerNumbers: function() {
		var regular = generateRandomUniqueNumbers(1, 47, 5);
		var lifeball = generateRandomUniqueNumbers(1, 10, 1);
		return [regular, lifeball];
	},
	machineNumbers: function() {
		var regular = generateRandomUniqueNumbers(1, 47, 5);
		var lifeball = generateRandomUniqueNumbers(1, 10, 1);
		return [regular, lifeball];
	},
	determineWinnings: function(player, machine) {
		var matched = 0;
		for (var a = 0; a < player[0].length; a++) {
			if (machine[0].includes(player[0][a])) {
				matched++;
			}
		}
		var isLifeBallChosen = (player[1][0] == machine[1][0]);
		switch (matched) {
			case 0: return -1;
			case 1: return -1;
			case 2: return (isLifeBallChosen ? 1 : 0);
			case 3: return (isLifeBallChosen ? 3 : 2);
			case 4: return (isLifeBallChosen ? 5 : 4);
			case 5: return (isLifeBallChosen ? 7 : 6);
			default: return -1;
		}		
	}	
}

lotteryUkLottoHotPicks = {
	amount: -1,
	title: 'UK Lotto Hotpicks',
	currency: '&#163;',
	currencyOutput: '£',
	ticketPrice: 1,
	description: '',
	wikipedia: "https://en.wikipedia.org/wiki/National_Lottery_(United_Kingdom)#Lotto_Hotpicks",
	forcePrecision: null,
	combinations: [],
	playerNumbers: function() {
		return generateRandomUniqueNumbers(1, 59, this.amount);
	},
	machineNumbers: function() {
		// includes bonus ball
		return generateRandomUniqueNumbers(1, 59, 6);
	},
	determineWinnings: function(player, machine) {
		var matched = 0;
		for (var a = 0; a < player.length; a++) {
			if (machine.includes(player[a])) {
				matched++;
			}
		}
		if (matched >= this.amount) {
			return 0;
		} else {
			return -1;
		}
	},
	amountOfPicks: function(chosenAmount) {
		this.amount = chosenAmount;
		this.title = 'UK Lotto Hotpicks (Pick ' + this.amount + ')';
		winStats = [this.amount + ' Ball' + (this.amount > 1 ? 's' : ''), 0, 0, 0];
		switch (this.amount) {
			case 1:
				winStats[1] = 9;
				winStats[2] = 6;
				break;
			case 2:
				winStats[1] = 114;
				winStats[2] = 60;
				break;
			case 3:
				winStats[1] = 1625;
				winStats[2] = 800;
				break;
			case 4:
				winStats[1] = 30341;
				winStats[2] = 13000;
				break;
			case 5:
				winStats[1] = 834397;
				winStats[2] = 350000;
				break;				
		}
		this.combinations.push(winStats);
	}
}

lotteryUkEuroMillions = {
	title: 'UK EuroMillions',
	currency: '&#163;',
	currencyOutput: '£',
	ticketPrice: 2.5,
	description: '',
	wikipedia: "https://en.wikipedia.org/wiki/EuroMillions",
	forcePrecision: 2,
	combinations: [
		[ "2 Main + 0 Bonus",        21,        2.50 ],  
		[ "2 Main + 1 Bonus",        48,        3.60 ],
		[ "1 Main + 2 Bonus",       187,        4.30 ],
		[ "3 Main + 0 Bonus",       313,        6.00 ],
		[ "3 Main + 1 Bonus",       705,        7.30 ],
		[ "2 Main + 2 Bonus",       984,        9.10 ],
		[ "4 Main + 0 Bonus",     13810,       25.60 ],
		[ "3 Main + 2 Bonus",     14124,       37.30 ],
		[ "4 Main + 1 Bonus",     31074,       77.80 ],
		[ "4 Main + 2 Bonus",    621502,      844.70 ],
		[ "5 Main + 0 Bonus",   3107514,    13561.20 ],
		[ "5 Main + 1 Bonus",   6991907,   130554.30 ],
		[ "5 Main + 2 Bonus", 139838159, 17000000.00 ]
	],
	playerNumbers: function() {
		var regular = generateRandomUniqueNumbers(1, 50, 5);
		var bonus = generateRandomUniqueNumbers(1, 12, 2);
		return [regular, bonus];
	},
	machineNumbers: function() {
		var regular = generateRandomUniqueNumbers(1, 50, 5);
		var bonus = generateRandomUniqueNumbers(1, 12, 2);
		return [regular, bonus];		
	},
	determineWinnings: function(player, machine) {
		var matchedRegular = 0;
		for (var a = 0; a < player[0].length; a++) {
			if (machine[0].includes(player[0][a])) {
				matchedRegular++;
			}
		}
		var matchedBonus = 0;
		for (var a = 0; a < player[1].length; a++) {
			if (machine[1].includes(player[1][a])) {
				matchedBonus++;
			}
		}
		
		var combo = matchedRegular + " Main + " + matchedBonus + " Bonus";
		return this.combinations.findIndex(a => a[0] == combo);
	}	
}

var lotteries = [
	lotteryUkLotto,
	lotteryUkSetForLife,
	lotteryUkThunderball,
	lotteryUkEuroMillions
]

for (var i = 1; i <= 5; i++) {
	// plese add deep cloning to JavaScript :(
	var lottery = JSON.parse(JSON.stringify(lotteryUkLottoHotPicks));	
	lottery.playerNumbers = lotteryUkLottoHotPicks.playerNumbers;
	lottery.machineNumbers = lotteryUkLottoHotPicks.machineNumbers;
	lottery.determineWinnings = lotteryUkLottoHotPicks.determineWinnings;
	lottery.amountOfPicks = lotteryUkLottoHotPicks.amountOfPicks;
	lottery.amountOfPicks(i);
	lotteries.push(lottery);
}

function isUsed(a) {
	return a;
}

isUsed(lotteries, takeRandomItemsFromArray, sequence);