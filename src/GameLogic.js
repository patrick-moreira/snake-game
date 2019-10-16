window.onload = function(){
    var stage = document.getElementById('stage');
    var container = stage.getContext('2d');
    document.addEventListener('keydown', keyPush);
    
    scores = document.getElementById('scores');
    scores.innerHTML = 0;
    
    const velocity = 1;

    var velocityX = velocityY = 0;
    var positionXsnake = 10;
    var positionYsnake = 15;
    var positionXfood = positionYfood = 15;
    var sizeOfPieces = 10;
    var numberOfPieces = 50;

    var trail = [];
    tail = 5; 

    setInterval(game, 30);
    
    function game(){
        positionXsnake += velocityX;
        positionYsnake += velocityY;
        if(positionXsnake < 0){
            positionXsnake = numberOfPieces - 1;
        }
        if(positionXsnake > numberOfPieces - 1){
            positionXsnake = 0;
        }
        if(positionYsnake < 0){
            positionYsnake = numberOfPieces - 1;
        }
        if(positionYsnake > numberOfPieces - 1){
            positionYsnake = 0;
        }
            
        container.fillStyle = '#046633';
        container.fillRect(0,0, stage.width, stage.height);		

        container.fillStyle = 'red';
        container.fillRect(positionXfood*sizeOfPieces, positionYfood*sizeOfPieces, sizeOfPieces, sizeOfPieces);

        container.fillStyle = '#0acf00';
        for (var index = 0; index < trail.length; index++) {
            container.fillRect(trail[index].x*sizeOfPieces, trail[index].y*sizeOfPieces, sizeOfPieces-1, sizeOfPieces-1);
            if (trail[index].x == positionXsnake && trail[index].y == positionYsnake){
                velocityX = velocityY = 0; //Game Over
                tail = 5;
                scores.innerHTML = 0;
                document.getElementById('soundGameOver').play();    
            }					
        }
        trail.push({x: positionXsnake, y: positionYsnake}); //Move Snake
        while (trail.length > tail) {
            trail.shift();
        }
        if (positionXfood == positionXsnake && positionYfood == positionYsnake){
            document.getElementById('soundCoin').play();    
            scores.innerHTML = parseInt(scores.innerHTML)+1;					
            tail++;
            positionXfood = Math.floor(Math.random()*numberOfPieces);
            positionYfood = Math.floor(Math.random()*numberOfPieces);
        }
    }

    function keyPush(event){
        switch(event.keyCode){
            case 37: //left
                velocityX = -velocity; 
                velocityY = 0;
                break;
            case 38: //up
                velocityX = 0; 
                velocityY = -velocity;
                break;
            case 39: //right
            velocityX = velocity; 
                velocityY = 0;
                break;
            case 40: //down
                velocityX = 0; 
                velocityY = velocity;
                break;	
        }
    }

     

}