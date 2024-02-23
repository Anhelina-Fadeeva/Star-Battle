audioPlayer = document.querySelector("audio");

//Стартовая кнопка
startButton = document.querySelector("#start button") ;

//Стартовый блок
startBlock = document.querySelector("#start") ;

//Игровой блок
gameBlock = document.querySelector("#game") ;

//Делаем перемещение игрока
gamer = document.querySelector("#player") ;

gamerSkin = "skin_1";

countLifes = 1;

score = document.querySelector("#score span");

//Клик по кнопке старт
startButton.onclick = function() {
	startGame();
}

sound = "off" ; //"off"

//Включение мелодии при клике на саунд
soundButton = document.querySelector("#sound img") ;
soundButton.onclick = function() {
	if (sound == "on") {
		soundButton.src = "images/mute_sound.png"
		sound = "off"
		audioPlayer.pause() ;
	} else {
		soundButton.src = "images/sound_on.png"
		sound = "on"
		audioPlayer.play() ;
	}
}

//Делаем движение игрока клавишами
document.onkeydown = function(event) {
	console.dir(event)
	if (event.keyCode == 87 && gamer.offsetTop > 10) {
		gamer.style.top = gamer.offsetTop - 40 + "px"}
	if (event.keyCode == 83 && gamer.offsetTop < 750) {
		gamer.style.top = gamer.offsetTop + 40 + "px"}
	//выстрел
	if (event.keyCode == 32) {
		createAndMoveBullet();
	}
}



//Делаем функцию начала игры
function startGame() {
	startBlock.style.display = "none" ; 
	gameBlock.style.display = "block" ;
	gamer.className = gamerSkin;
	createEnemy();
	createLifes();

}

function createAndMoveBullet() {
	let bullet = document.createElement("div");
	bullet.className = "bullet";
	bullet.style.left = 210 + "px";
	bullet.style.top = gamer.offsetTop + 138 + "px";
	gameBlock.appendChild(bullet);
	let timerId = setInterval(function() {
		bullet.style.left = bullet.offsetLeft + 10 + "px";
		if (bullet.offsetLeft > document.querySelector("body").clientWidth ) {
			bullet.remove();
			clearInterval(timerId);
		}
		isBoom(bullet);
	}, 10) 
}

//работа с врагами
function createEnemy() {
	let enemy = document.createElement("div");
	enemy.className = "enemy " + typeEnemy();
	enemy.style.top = random(100, document.querySelector("#app").clientHeight-150) + "px";
	gameBlock.appendChild(enemy);
	moveEnemy(enemy);
}

function typeEnemy() {
	if(random(1, 2) == 1) {
		return "type-1";
	} else{
		return "type-2";
	}
}

function moveEnemy(enemy) {
	let timerID = setInterval(function() {
			enemy.style.left = enemy.offsetLeft - 10 + "px";
			console.dir(enemy.offsetLeft);
			if(enemy.offsetLeft < -100 ) {
			enemy.remove();
			createEnemy();
			//Остановить таймер
			clearInterval(timerID);
			die();
		} 	
	}, 100);
}

function isBoom(bullet) {
	let enemy = document.querySelector(".enemy")
	if(bullet.offsetTop > enemy.offsetTop 
		&& bullet.offsetTop < enemy.offsetTop + enemy.clientHeight 
		&& bullet.offsetLeft > enemy.offsetLeft) {
		Boom(bullet.offsetTop, bullet.offsetLeft);
		score.innerText = Number(score.innerText) + 1;
		bullet.remove();
		enemy.remove();
		createEnemy();
	}
}

function die() {
	countLifes = countLifes - 1;
	if (countLifes <= 0) {
		endGame();
	}
		createLifes();
}

function createLifes() {
	let lifesBlock = document.querySelector("#lifes");
		lifesBlock.innerHTML = "";
	let count = 0;
	while(count < countLifes) {
		let span = document.createElement("span");
		lifesBlock.appendChild(span);
		count = count + 1;
	}
}

function Boom(top, left) {
	let boom = document.createElement("div")
	boom.className = "boom";
	boom.style.top = top - 100 + "px";
	boom.style.left = left - 100 + "px";

	gameBlock.appendChild(boom)
	setTimeout(function() {
		boom.remove();
	}, 1000)
}

function endGame() {
	let scoreBlock = document.querySelector("#end h3 span");
	scoreBlock.innerText = score.innerText;
	gameBlock.innerHTML = ("");
	let endBlock = document.querySelector("#end");
	endBlock.style.display = "block";
	let restartButton = document.querySelector("#end button")
	console.dir(restartButton);
		restartButton.onclick = function () {
			restart();
		}
}

function random(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

function restart() {
	location.reload();
}

selectSkin1 = document.querySelector("#skin_1");
selectSkin1.onclick = function() {
	selectSkin1.className = "selected";
	selectSkin2.className = "";
	gamerSkin = "skin_1";
}
selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function(){
	selectSkin2.className = "selected";
	selectSkin1.className = "";
	gamerSkin = "skin_2";
}