const secondHand = document.querySelector(".hand--second");
const minuteHand = document.querySelector(".hand--minute");
const hourHand = document.querySelector(".hand--hour");


function setDate() {
	const now = new Date();

	const seconds = now.getSeconds();
	const secondsDegrees = ((seconds / 60) * 360) + 90;

	const minutes = now.getMinutes();
	const minutesDegrees = ((minutes / 60) * 360) + 90

	const hours = now.getHours();
	const hoursDegrees = ((hours / 12) * 360) + 90

	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
	minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
	hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
};

setInterval(setDate, 1000)