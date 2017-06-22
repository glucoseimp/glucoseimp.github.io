const roomerArray = JSON.parse(localStorage.getItem('roomerArray')) ||
					[{name:'Abbigail Farrell', birth:'1962'},
					 {name:'Pablo Wunsch', birth:'1982'},
					 {name:'Randi Stehr', birth:'1975'},
					 {name:'Abbigail Farrell', birth:'1973'},
					 {name:'Abbigail Farrell', birth:'1973'},
					 {name:'Abbigail Farrell', birth:'1973'},
					 {name:'Abbigail Farrell', birth:'1973'},
					 {name:'Abbigail Farrell', birth:'1973'}];
const roomList = document.querySelector('.wrapper');
const rooms =  [];


const totalRooms = 20;
const busyPercent = 0.4;
const busyRooms = totalRooms * busyPercent ^ 0;
let busy = 0;

function addRooms(rooms) {
	for (let i = 0; i < 20; i++) {
		if (rooms.length > 19) return JSON.parse(localStorage.getItem('rooms'));
		rooms.push('room');
	};
	createRooms(rooms, roomList);
}

function createRooms(rooms = [], roomList) {
	rooms = rooms.map((room, i) => {
							return i <= 6 ? room += ' room--lux' :
								   i > 7 && i <= 11 ? room +=' room--eco' :
								   room += ' room--stand';
						}).sort(randomPos);
	roomList.innerHTML = localStorage.getItem('roomList') || 
						rooms.map(room => populateRooms(room))
						.map(el => {
							return el.search(/busy/g) != -1 ?
								`<div class='${el}'><div class="modal modal--busy"><button class="btn">Выселить жильца</button></div></div>` : 
								`<div class='${el}'><div class="modal"><p>Номер подготовлен к заселению</p><button" class="btn">Заселить жильца</button></div><div class="pop-up">
								<label for="name">Имя жильца</label><input type="text" id='name' required><label for="surname">Фамилия жильца</label><input type="text" id='surname' required>
								<label for="year">Год рождения</label><input type="text" id='year' required><button class="btn btn--pop-up">Разместить жильца</button></div></div>`})
						.join('');
	localStorage.setItem('roomList', roomList.innerHTML);
};

function randomPos(a, b) {
	return Math.random() - 0.5;
};

function populateRooms(el) {
	const randomPop = Math.random() * 2 ^ 0;

	if (randomPop > 0 && busy < busyRooms) {
		busy++;
		return el += ' busy';		
	}
	return el;
}
window.onload = addRooms(rooms);

window.onload = () => setTimeout(document.querySelectorAll('.pop-up').forEach(popUp => popUp.classList.remove('pop-up--open')), 10);

const busyRoomsList = document.querySelectorAll('.busy');

busyRoomsList.length == busyRooms ? busyRoomsList.forEach((room, i) => {
	room.childNodes[0].innerHTML = `<p>Здесь проживает ${roomerArray[i].name}</p>
								 <button class="btn">Выселить жильца</button>`;
	localStorage.setItem('roomList', roomList.innerHTML);
}) : '';

const buttons = document.querySelectorAll('.btn');
const roomerData = document.querySelectorAll('[type=text]');
let allData = {};

function roomerAction() {
	if (this.parentNode.classList.contains('modal--busy')) {
		return;
	} 	else {
		this.parentNode.parentNode.lastChild.classList.add('pop-up--open');
		this.parentNode.parentNode.lastChild.lastChild.addEventListener('click', addRoomer);
		this.parentNode.querySelectorAll('[type=text]').forEach(data => allData[data.id] = data.value);
		this.parentNode.parentNode.classList.add('busy');
		this.parentNode.parentNode.firstChild.classList.add('modal--busy');
		this.parentNode.parentNode.firstChild.innerHTML = `<p>Здесь проживает ${allData.name} ${allData.surname}</p><button class="btn">Выселить жильца</button>`;
	}
	localStorage.setItem('roomArray', JSON.stringify(roomerArray));
	console.log(this);
	localStorage.setItem('roomList', roomList.innerHTML);
}

function addRoomer() {
	roomerArray.push({name: `${allData['name']} ${allData['surname']}`, birth: `${allData['year']}`});
	this.parentNode.classList.remove('pop-up--open');	
};


buttons.forEach(btn => btn.addEventListener('click', roomerAction));


const roomsLevel = document.querySelectorAll('[type=radio]');
const allRooms = document.querySelectorAll('.room');
const standRooms = document.querySelectorAll('.room--stand');
const luxLevel = document.querySelectorAll('.room--lux');
const econLevel = document.querySelectorAll('.room--eco');

function chooseLevel() {
	roomsLevel.forEach(level => level.checked = false);
	roomsLevel.forEach(level => level.removeAttribute('checked'));
	this.setAttribute('checked', 'checked');
	this.checked = true;
	allRooms.forEach(room => room.style.display = 'none');
	switch(this.id) {
		case 'lux': return luxLevel.forEach(room => room.style.display = 'flex');
		case 'econ': return econLevel.forEach(room => room.style.display = 'flex');
		case 'stand': return standRooms.forEach(room => room.style.display = 'flex');
		default: return allRooms.forEach(room => room.style.display = 'flex');
	}
	
}

roomsLevel.forEach(level => level.addEventListener('change', chooseLevel));

const roomPopulating = document.querySelectorAll('[type=checkbox]');

function chooseType() {
	if (this.id == 'free' && this.checked == false && roomPopulating[1].checked == true) {
		allRooms.forEach(room => room.style.display = 'none');
		busyRoomsList.forEach(room => room.style.display = 'flex');
	} else if (this.id == 'busy' && this.checked == false && roomPopulating[0].checked == true) {
		allRooms.forEach(room => room.style.display = 'flex');
		busyRoomsList.forEach(room => room.style.display = 'none');
	} else if (this.id == 'free' && this.checked == true && roomPopulating[1].checked == false) {
		allRooms.forEach(room => room.style.display = 'flex');
		busyRoomsList.forEach(room => room.style.display = 'none');
	} else if (this.id == 'busy' && this.checked == true && roomPopulating[0].checked == false) {
		allRooms.forEach(room => room.style.display = 'none');
		busyRoomsList.forEach(room => room.style.display = 'flex');
	} else if ((this.id == 'free' && this.checked == true && roomPopulating[1].checked == true) ||
				(this.id == 'busy' && this.checked == true && roomPopulating[0].checked == true)) {
		allRooms.forEach(room => room.style.display = 'flex');
	} else {
		allRooms.forEach(room => room.style.display = 'none');
	}
}

roomPopulating.forEach(type => type.addEventListener('change', chooseType));