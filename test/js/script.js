const roomerArray = [{name:'Abbigail Farrell', birth:'1962'},
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
								`<div class='${el}'><div class="modal modal--busy"><a href="#" class="btn">Выселить жильца</a></div></div>` : 
								`<div class='${el}'>
									<div class="modal modal--free">
										<p>Номер подготовлен к заселению</p>
										<a href="#" class="btn">Заселить жильца</a>
									</div>
								</div>`})
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

const busyRoomsList = document.querySelectorAll('.busy');

busyRoomsList.forEach((room, i) => {
	room.childNodes[0].innerHTML = `<p>Здесь проживает ${roomerArray[i].name}</p>
								 <a href="#" class="btn">Выселить жильца</a>`;
	localStorage.setItem('roomList', roomList.innerHTML);
});

const buttons = document.querySelectorAll('.btn');

function roomerAction(e) {
	e.preventDefault();
	if (this.parentNode.classList.contains('modal--busy')) {
		this.parentNode.parentNode.classList.remove('busy');
		this.parentNode.innerHTML = `<div class="modal modal--free">
										<p>Номер подготовлен к заселению</p>
										<a href="#" class="btn">Заселить жильца</a>
									</div>`;
	} else {
		this.parentNode.parentNode.classList.add('busy');
		this.parentNode.innerHTML = `<div class="modal modal--busy">
										<a href="#" class="btn">Выселить жильца</a>
									</div>`;
	}
	localStorage.setItem('roomList', roomList.innerHTML);
}

buttons.forEach(btn => btn.addEventListener('click', roomerAction));


const roomsLevel = document.querySelectorAll('[type=radio]');
const allRooms = document.querySelectorAll('.room');
const standRooms = document.querySelectorAll('.room--stand');
const luxLevel = document.querySelectorAll('.room--lux');
const econLevel = document.querySelectorAll('.room--eco');

function chooseLevel() {
	roomsLevel.forEach(level => level.checked = false);
	this.checked = true;
	allRooms.forEach(room => room.style.display = 'none');
	switch(this.id) {
		case 'lux': return luxLevel.forEach(room => room.style.display = 'flex');
		case 'econ': return econLevel.forEach(room => room.style.display = 'flex');
		case 'stand': return standRooms.forEach(room => room.style.display = 'flex');
		default: return allRooms.forEach(room => room.style.display = 'flex');
	}
	console.log(this.id)
}

roomsLevel.forEach(level => level.addEventListener('change', chooseLevel));

const roomPopulating = document.querySelectorAll('[type=checkbox]');

function chooseType() {
	if (this.id == 'free' && this.checked == true) {
		allRooms.forEach(room => room.style.display = 'flex');
		busyRoomsList.forEach(room => room.style.display = 'none');
	} else if (this.id == 'busy' && this.checked == true) {
		allRooms.forEach(room => room.style.display = 'none');
		busyRoomsList.forEach(room => room.style.display = 'flex');
	} else if (roomPopulating.forEach(level => level.checked == true)) {
		allRooms.forEach(room => room.style.display = 'flex');
	} else {
		allRooms.forEach(room => room.style.display = 'none');
	}
}

roomPopulating.forEach(type => type.addEventListener('change', chooseType));