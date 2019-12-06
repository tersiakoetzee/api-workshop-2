

// http://api-tutor.herokuapp.com/v1/colors


const makesTemplateSource = document.querySelector(".makesTemplate");
const makesTemplate = Handlebars.compile(makesTemplateSource.innerHTML);

function toggleLoader() {
	const spinner = document.querySelector(".loader");
	spinner.classList.toggle("hidden");
}

toggleLoader();
axios.get('http://api-tutor.herokuapp.com/v1/colors')
	.then(function (response) {
		// handle success
		
		const colorsElem = document.querySelector(".colors");
		colorsElem.innerHTML = makesTemplate({
			makes: response.data
		});
		toggleLoader();
	});

axios.get('http://api-tutor.herokuapp.com/v1/makes')
	.then(function (response) {
		// handle success
		console.log(response.data);
	});

