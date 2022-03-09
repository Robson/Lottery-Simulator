var currentStats = {
	ticketsPurchased: 0,
	moneySpent: 0,
	moneyWon: 0	
}

var mode = 0; // 0=ready, 1=simulating
var amount = 0, speed = 0;
var timeoutIds = [];

function showOverallStats() {
	// reset everything
	if (currentStats.ticketsPurchased == 0) {
		d3.select('#statSimulationProgress').html('0%');
	} else {
		d3.select('#statSimulationProgress').html(Math.round((currentStats.ticketsPurchased / amount) * 100, 0) + '%');
	}
	d3.select('#statTicketsPurchased').html(Number(currentStats.ticketsPurchased).toLocaleString());
	d3.select('#statTicketPrice').html(chosenLottery.currency + Number(chosenLottery.ticketPrice).toLocaleString());
	d3.select('#statMoneySpent').html(chosenLottery.currency + Number(currentStats.moneySpent).toLocaleString());
	d3.select('#statMoneyWon').html(chosenLottery.currency + Number(currentStats.moneyWon).toLocaleString());
	if (currentStats.moneyWon - currentStats.moneySpent < 0) {
		d3.select('#statMoneyBalance').html('-' + chosenLottery.currency + Number(-(currentStats.moneyWon - currentStats.moneySpent)).toLocaleString());
	} else {
		d3.select('#statMoneyBalance').html(chosenLottery.currency + Number(currentStats.moneyWon - currentStats.moneySpent).toLocaleString());
	}
			
	d3.selectAll('#tableWinsLarge tr.data').remove();
	d3.selectAll('#tableWinsSmall tr.data').remove();
	d3.selectAll('#tableChanceSmall tr.data').remove();
	for (var a = 0; a < chosenLottery.combinations.length; a++) {
		var combo = chosenLottery.combinations[a];
		var row = d3.select('#tableWinsLarge').append('tr').attr('class', 'data ' + (a == 0 ? 'first' : ''));
		row.append('td').attr('class', 'text left').html(combo[0]);
		row.append('td').attr('class', 'value').html(Number(combo[1]).toLocaleString());
		row.append('td').attr('class', 'value').html(chosenLottery.currency + Number(combo[2]).toLocaleString());
		row.append('td').attr('class', 'value').html(Number(combo[3]).toLocaleString());
		
		combo = chosenLottery.combinations[a];
		row = d3.select('#tableWinsSmall').append('tr').attr('class', 'data ' + (a == 0 ? 'first' : ''));
		row.append('td').attr('class', 'text left').html(combo[0]);
		if (combo[2] >= 1000000) {
			row.append('td').attr('class', 'value').html(chosenLottery.currency + Number(combo[2] / 1000000).toLocaleString() + 'm');
		} else {
			row.append('td').attr('class', 'value').html(chosenLottery.currency + Number(combo[2]).toLocaleString());
		}
		row.append('td').attr('class', 'value').html(Number(combo[3]).toLocaleString());
		
		combo = chosenLottery.combinations[a];
		row = d3.select('#tableChanceSmall').append('tr').attr('class', 'data ' + (a == 0 ? 'first' : ''));
		row.append('td').attr('class', 'text left').html(combo[0]);
		row.append('td').attr('class', 'value').html(Number(combo[1]).toLocaleString());
	}
}

function simulateSet() {
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
			}
			/**
			if (determineWinnings > 3) {
				console.log('---------------------');
				console.log(player);
				console.log(machine);
				console.log(determineWinnings);
			}
			**/
		}
		showOverallStats();
		if (amount == currentStats.ticketsPurchased) {
			mode = 0;
			d3.select('#simulate').attr('value', 'Simulate!');
		}
	}
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
	d3.select('#output').style('display', 'block');
	currentStats.ticketsPurchased = 0;
	currentStats.moneySpent = 0;
	currentStats.moneyWon = 0;
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