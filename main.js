const url = 'https://frontend-take-home.fetchrewards.com/form';
const occupation = document.getElementById('occupation');
const state = document.getElementById('state');
const form = document.getElementById('form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');

fetchOccupation();
fetchStates();
/**
 * This function gets the occupations data from the API
 */
function fetchOccupation() {
	console.log('hi');
	fetch(url) //get request
		.then((res) => res.json())
		.then((data) => loadData(data.occupations))
		.catch((err) => console.log(err));
}

/**
 * This function gets the states data from the API
 */
function fetchStates() {
	console.log('states');
	fetch(url)
		.then((res) => res.json())
		.then((data) => loadStates(data.states))
		.catch((err) => console.log(err));
}

/**
 * Loads all the data into a drop down menu
 * @param {*} data all of the occupations
 */
function loadData(data) {
	console.log(typeof data);
	opt = document.createElement('option');
	opt.text = 'Select an occupation';
	occupation.options.add(opt);
	for (var i = 0; i < data.length; i++) {
		opt = document.createElement('option');
		opt.text = data[i];
		occupation.options.add(opt);
	}
}

/**
 * Loads all the data into a drop down menu
 * @param {*} data all the states and their abbreviations
 */
function loadStates(data) {
	opt = document.createElement('option');
	opt.text = 'Select a state';
	state.options.add(opt);
	console.log(data.length);
	for (var i = 0; i < data.length; i++) {
		opt = document.createElement('option');
		opt.text = data[i].abbreviation;
		state.options.add(opt);
	}
}

/**
 * On a click of the submit button, it first checks if the inputs are valid by calling a funciton. If it
 * is not valid, it sends an error message, if it is, then it posts the results.
 */
form.addEventListener('submit', (event) => {
	message.style.visibility= 'visible'
	message.style.textAlign = "center"
	message.style.color = "red"
	message.style.fontSize= "150%"
	if (checkValues() == true) {
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: fullname.value.trim(),
				email: email.value.trim(),
				password: password.value.trim(),
				occupation: occupation.value.trim(),
				state: state.value.trim(),
			}),
		})
			/** 
            .then(res=>res.json())
            .then(data => console.log(data.status))
            */
			.then(function (res) {
				console.log(res.status);
			});

		message.innerHTML = "Submitted"
		message.style.fontSize = "300%"
		message.style.color = "green"
		
		
	} else {
		message.innerHTML = "One of your inputs is incorrect, please try again"
	
	}
});

/**
 * Checks all values so that they're not empty and valid ones
 * @returns True if all values filled in are valid, false otherwise
 */
function checkValues() {
	// checks full name
	const checkname = fullname.value.trim();
	if (checkname === 0) {
		return false;
	}
	var letters = /^[A-Za-z\s]+$/;
	if (!checkname.match(letters)) {
		//makes sure there are only letters and spaces in the name
		return false;
	}

	//checks email, makes sure there's an @ and a . thats after the @
	const checkemail = email.value.trim();
	if (checkemail.indexOf('@') < 1) {
		return false;
	}
	if (checkemail.indexOf('.') < checkemail.indexOf('@')) {
		return false;
	}

	//checks password so its not empty
	const checkpassword = password.value.trim();
	if (checkpassword == 0) {
		return false;
	}

	//checks occupation so one has been selected
	const selectOccupation = occupation.value.trim();
	if (selectOccupation == 'Select an occupation') {
		console.log('no occupation selected');
		return false;
	}

	//checks state so that one has been selected
	const selectstate = state.value.trim();
	if (selectstate == 'Select a state') {
		console.log('no state selected');
		return false;
	}

	return true;
}
