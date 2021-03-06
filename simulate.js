var currentStats = {
	title: '',
	currency: '',
	ticketsPurchased: 0,
	ticketPrice: 0,
	moneySpent: 0,
	moneyWon: 0,
	bestResultIndex: -1,
	bestResultTitle: '',
	bestResultAmount: 0
}

var mode = 0; // 0=ready, 1=simulating
var amount = 0, speed = 0;
var timeoutIds = [];

function formatNumber(number) {
	number = +number.toFixed(2);
	if (chosenLottery.forcePrecision != null) {
		return Number(number).toLocaleString(undefined, { minimumFractionDigits: chosenLottery.forcePrecision });
	} else if (number % 1 == 0) {
		return Number(number).toLocaleString();
	} else {
		return Number(number).toLocaleString(undefined, { minimumFractionDigits: 2 });
	}	
}

function showOverallStats() {
	// reset everything
	if (currentStats.ticketsPurchased == 0) {
		d3.select('#statSimulationProgress').html('0%');
	} else {
		d3.select('#statSimulationProgress').html(Math.round((currentStats.ticketsPurchased / amount) * 100, 0) + '%');
	}
	d3.select('#statTicketsPurchased').html(Number(currentStats.ticketsPurchased).toLocaleString());
	d3.select('#statTicketPrice').html(chosenLottery.currency + formatNumber(chosenLottery.ticketPrice));
	d3.select('#statMoneySpent').html(chosenLottery.currency + formatNumber(currentStats.moneySpent));
	d3.select('#statMoneyWon').html(chosenLottery.currency + formatNumber(currentStats.moneyWon));
	var prefix = '';
	if (currentStats.moneyWon - currentStats.moneySpent < 0) {
		prefix = '-';
	}
	var balance = Math.abs(currentStats.moneyWon - currentStats.moneySpent);
	d3.select('#statMoneyBalance').html(prefix + chosenLottery.currency + formatNumber(balance));
			
	d3.selectAll('#tableWinsLarge tr.data').remove();
	d3.selectAll('#tableWinsSmall tr.data').remove();
	d3.selectAll('#tableChanceSmall tr.data').remove();
	for (var a = 0; a < chosenLottery.combinations.length; a++) {
		var combo = chosenLottery.combinations[a];
		var row = d3.select('#tableWinsLarge').append('tr').attr('class', 'data ' + (a == 0 ? 'first' : ''));
		row.append('td').attr('class', 'text left').html(combo[0]);
		row.append('td').attr('class', 'value').html(Number(combo[1]).toLocaleString());
		row.append('td').attr('class', 'value').html(chosenLottery.currency + formatNumber(combo[2]));
		row.append('td').attr('class', 'value').html(Number(combo[3]).toLocaleString());
		
		combo = chosenLottery.combinations[a];
		row = d3.select('#tableWinsSmall').append('tr').attr('class', 'data ' + (a == 0 ? 'first' : ''));
		row.append('td').attr('class', 'text left').html(combo[0]);
		if (combo[2] >= 1000000) {
			row.append('td').attr('class', 'value').html(chosenLottery.currency + Number(combo[2] / 1000000).toLocaleString() + 'm');
		} else {
			row.append('td').attr('class', 'value').html(chosenLottery.currency + formatNumber(combo[2]));
		}
		row.append('td').attr('class', 'value').html(Number(combo[3]).toLocaleString());
		
		combo = chosenLottery.combinations[a];
		row = d3.select('#tableChanceSmall').append('tr').attr('class', 'data ' + (a == 0 ? 'first' : ''));
		row.append('td').attr('class', 'text left').html(combo[0]);
		row.append('td').attr('class', 'value').html(Number(combo[1]).toLocaleString());
	}
}

function simulateSet() {
	console.time('simulating')
	if (mode == 1) {
		currentStats.ticketsPurchased += speed;
		currentStats.moneySpent = currentStats.ticketsPurchased * chosenLottery.ticketPrice;
		for (var a = 0; a < speed; a++) {
			var player = chosenLottery.playerNumbers();
			var machine = chosenLottery.machineNumbers();
			var determineWinnings = chosenLottery.determineWinnings(player, machine);
			if (determineWinnings > -1) {
				chosenLottery.combinations[determineWinnings][3]++;
				currentStats.moneyWon += chosenLottery.combinations[determineWinnings][2];
				if (currentStats.bestResultIndex <= determineWinnings) {
					currentStats.bestResultIndex = determineWinnings;
					currentStats.bestResultTitle = chosenLottery.combinations[determineWinnings][0];
					currentStats.bestResultAmount = chosenLottery.combinations[determineWinnings][3];
				}				
			}
		}
		showOverallStats();
		if (amount == currentStats.ticketsPurchased) {
			mode = 0;
			d3.select('#simulate').attr('value', 'Simulate!');
		}
	}
	console.timeEnd('simulating');
}

function simulate() {
	
	switch (mode) {
		case 0:
			d3.select('#simulate').attr('value', 'Stop!');
			mode = 1;
			break;
		case 1:
			d3.select('#simulate').attr('value', 'Simulate!');
			mode = 0;
			for (var a = 0; a < timeoutIds.length; a++) {
				clearTimeout(timeoutIds[a]);
			}
			return;
	}
	
	// reset
	chosenLottery = lotteries[d3.select('#lotteryType').property('value')];
	if (chosenLottery.description == '') {
		d3.select('#tableNotes').style('display', 'none');
	} else {
		d3.select('#tableNotes').style('display', 'block');
		d3.select('#noteText').html(chosenLottery.description);
	}	
	d3.select('#output').style('display', 'block');
	d3.select('#rules').html('Learn about the <a href="' + chosenLottery.wikipedia + '">' + chosenLottery.title.split('(')[0].trim() + ' at Wikipedia</a>.');
	currentStats.title = chosenLottery.title;
	currentStats.currency = chosenLottery.currency;
	currentStats.ticketPrice = chosenLottery.ticketPrice;
	currentStats.ticketsPurchased = 0;
	currentStats.moneySpent = 0;
	currentStats.moneyWon = 0;
	currentStats.bestResultIndex = -1;
	currentStats.bestResultTitle = 'None';
	for (var a = 0; a < chosenLottery.combinations.length; a++) {
		chosenLottery.combinations[a][3] = 0;
	}
	showOverallStats();	
	
	// get input configuration
	amount = +d3.select('#ticketAmount').property('value');
	speed = +d3.select('#simulationSpeed').property('value');
	if (speed > amount) {
		speed = amount;
	}
	
	// run the simulation
	timeoutIds = [];
	for (a = 0; a < amount / speed; a++) {
		timeoutIds.push(setTimeout(() => { simulateSet() }, 1000 * (a + 1)));
	}
	
}

function copy() {
	var output = '';
	output += 'Lottery Simulator Results #lsr\r\n';
	output += 'https://robson.plus/lottery-simulator\r\n\r\n';
	output += 'Type: ' + currentStats.title + '\r\n';
	output += 'Tickets: ' + Number(currentStats.ticketsPurchased).toLocaleString() + ' (' + chosenLottery.currencyOutput;
	output += formatNumber(chosenLottery.ticketPrice);
	output += ' each)\r\n';	
	output += 'Spent: ' + chosenLottery.currencyOutput + formatNumber(currentStats.moneySpent) + '\r\n';
	output += 'Won: ' + chosenLottery.currencyOutput + formatNumber(currentStats.moneyWon) + '\r\n';
	output += 'Balance: ';
	if (currentStats.moneyWon - currentStats.moneySpent < 0) {
		output += '-';
	}
	output += chosenLottery.currencyOutput + formatNumber(Math.abs(currentStats.moneyWon - currentStats.moneySpent)) + '\r\n';
	output += 'Best Result: ' + currentStats.bestResultTitle + ' (x' + Number(currentStats.bestResultAmount).toLocaleString() + ')';
	
	navigator.clipboard.writeText(output);
	alert('Stats copied to the clipboard!');
}

function isUsed(a) {
	return a;
}

isUsed(simulate, copy);