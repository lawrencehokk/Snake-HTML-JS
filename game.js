document.addEventListener("DOMContentLoaded", () => {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var snakeX = 50;
	var snakeY = 200;

	var appleX = Math.floor(Math.random() * ((canvas.width - 50)/50 + 1)) * 50;
	var appleY = Math.floor(Math.random() * ((canvas.height - 50)/50 + 1)) * 50;

	document.addEventListener("keydown", move, false);

	if(localStorage.getItem("snake-highscore"))
		document.getElementById("highscore").innerHTML = "High Score: " + localStorage.getItem("snake-highscore");

	var rightPressed = false;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;

	var score = 0;

	function move(event) {
		if(event.code == "ArrowRight") {
			rightPressed = true;
			leftPressed = false;
			upPressed = false;
			downPressed = false;
		}else if(event.code == "ArrowLeft") {
			leftPressed = true;
			rightPressed = false;
			upPressed = false;
			downPressed = false;
		}else if(event.code == "ArrowDown") {
			downPressed = true;
			leftPressed = false;
			rightPressed = false;
			upPressed = false;
		}else if(event.code == "ArrowUp") {
			upPressed = true;
			leftPressed = false;
			rightPressed = false;
			downPressed = false;
		}
	}

	function drawSnake(){

		if(rightPressed){
			if(snakeX != canvas.width - 50)
				snakeX += 50;	
			else
				death();
			
		}else if(leftPressed){
			if(snakeX != 0)
				snakeX -= 50;
			else
				death();
			
		}else if(downPressed){
			if(snakeY != canvas.height - 50)
				snakeY += 50;
			else
				death();
		}else if(upPressed){
			if(snakeY != 0)
				snakeY -= 50;	
			else
				death();
		}

		collisionCheck();
		var img = document.getElementById("image");
		ctx.drawImage(img, snakeX, snakeY, 50, 50);


	}

	function death(){
		alert("You lose!");
		upPressed = false;
		leftPressed = false;
		rightPressed = false;
		downPressed = false;

		highScore();
		
		document.getElementById("highscore").innerHTML =  "High Score: " + localStorage.getItem("snake-highscore");
		score = 0;
		document.getElementById("score").innerHTML =  "Score: " + score;

	}

	function collisionCheck(){
		if(snakeX == appleX & snakeY == appleY){
			appleX = Math.floor(Math.random() * ((canvas.width - 50)/50 + 1)) * 50;
			appleY = Math.floor(Math.random() * ((canvas.height - 50)/50 + 1)) * 50;
			score++;
			document.getElementById("score").innerHTML =  "Score: " + score;
		}
	}

	function drawApple(){
		ctx.rect(appleX, appleY, 50, 50);
		ctx.fillStyle = "red";
		ctx.fill()
	}

	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		drawSnake();
		ctx.closePath();

		ctx.beginPath();
		drawApple();
		ctx.closePath();
		
	}

	function highScore(){
		if(!localStorage.getItem("snake-highscore")){
			localStorage.setItem("snake-highscore", 0);
		}else{
			if(localStorage.getItem("snake-highscore") < score){
				localStorage.setItem("snake-highscore", score);
			}
		}
		
	}

	setInterval(draw, 100);
	setInterval(move, 100);
	
});