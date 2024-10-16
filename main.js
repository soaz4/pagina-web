const searchContainer = document.querySelector('.search-input-box');
const inputSearch = searchContainer.querySelector('input');
const boxSuggestions = document.querySelector('.container-suggestions');

inputSearch.onkeyup = e => {
	let userData = e.target.value;
	let emptyArray = [];

	if (userData) {
		emptyArray = suggestions.filter(data => {
			return data.name
				.toLocaleLowerCase()
				.startsWith(userData.toLocaleLowerCase());
		});

		emptyArray = emptyArray.map(data => {
			return `<li data-url="${data.url}">${data.name}</li>`;
		});
		searchContainer.classList.add('active');
		showSuggestions(emptyArray);

		let allList = boxSuggestions.querySelectorAll('li');

		allList.forEach(li => {
			li.setAttribute('onclick', 'select(this)');
		});
	} else {
		searchContainer.classList.remove('active');
	}
};

function select(element) {
	let selectUserData = element.textContent;
	inputSearch.value = selectUserData;

	// Obtiene la URL desde el atributo data-url
	const url = element.getAttribute('data-url');
	window.location.href = url; // Redirige a la página correspondiente
	searchContainer.classList.remove('active');
}

const showSuggestions = list => {
	let listData;

	if (!list.length) {
		userValue = inputSearch.value;
		listData = `<li>${userValue}</li>`;
	} else {
		listData = list.join(' ');
	}
	boxSuggestions.innerHTML = listData;
};
