fetchDataWorld();

// Grab html fields by id

var World = document.getElementById("world");
var India = document.getElementById("india");
var States = document.getElementById("states");

// Arrays to store data fetched.

var world = [];
var india = [];
var states = [];
var filler = [];
// function to fetch total world cases

function fetchDataWorld() {
	fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9d6e6cac6amsh36673530ad2b7d5p17c437jsn55c6f1352048",
			"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
		}
	}).then(blob => blob.json())
		.then(data => {
			world.push(...data)
			renderWorld(world);
			setInterval(1000, fetchDataIndia());

		})
}

// function to fetch total cases in India

function fetchDataIndia() {
	fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9d6e6cac6amsh36673530ad2b7d5p17c437jsn55c6f1352048",
			"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
		}
	}).then(blob => blob.json())
		.then(data => {
			india.push(data)
			// console.log(india)
			states.push(data.state_wise);
			console.log(states[0]);

			renderIndia(india);
		})
}

// functions to render data

function renderWorld(world) {

	let html = `<p><span class="lead">Total Cases:   </span>${world[0].TotalCases}</p>
	<p class="lead"><span>Active Cases:   </span><strong>${world[0].ActiveCases}</strong></p>
	<p class="lead"><span >Total Deaths:   </span><strong>${world[0].TotalDeaths}</strong></p>
	<p class="lead"><span >Total Recovered:   </span><strong>${world[0].TotalRecovered}</strong></p>
	`;

	World.innerHTML = html;
}

function renderIndia(india) {

	let html = `<p><span class="lead">Total Cases:   </span>${india[0].total_values.confirmed}</p>
	<p class="lead"><span >Active Cases :   </span><strong>${india[0].total_values.active}</strong></p>
	<p class="lead"><span >Total Deaths:   </span><strong>${india[0].total_values.deaths}</strong></p>
	<p class="lead"><span class="lead">Total Recovered:   </span><strong>${india[0].total_values.recovered}</strong></p>
	`;
	India.innerHTML = html;


	let i = 0;

	for (var key of Object.keys(states[0])) {
		filler[i] = key;
		i++;
	}

	filler.sort();

	const html2 = filler.map(
		(place, index) => {
			return `
			<li> 
			<button type="button" class="btn" onclick="showAllData(${index})"  >${place}</button>
	  
			</li>
			`;
		}
	).join("").replace("State Unassigned", "");

	States.innerHTML = html2;

}

function showAllData(index) {
	let v = filler[index];
	// console.log(v);
	for (var key of Object.keys(states[0])) {
		if (v == key) {
			console.log(key);
			alert("Active Cases in " + key + " is:  " + states[0][key].active +
				"   Confirmed Cases in " + key + " is:   " + states[0][key].confirmed +
				"   Deaths in " + key + " is:   " + states[0][key].deaths +
				"   Recovered Cases in " + key + " is:   " + states[0][key].recovered
			)
			break;
		}
		
	}


}


// function getLocationData(){
// 	navigator.geolocation.watchPosition((data)=>{
// 		console.log(data);
		
// 	})
// }

