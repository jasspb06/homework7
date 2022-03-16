class ShotHandler{

    constructor(initialAmmo){
        this.initialAmmo = initialAmmo;
        this.ammo = initialAmmo;
        this.shoot = new Audio('../resources/sounds/shoot.wav');
    }

    getAmmoNumber(){
        return this.ammo;
    }

    resetAmmo(){
        this.ammo = this.initialAmmo;
        this.changeShootBoxImage();
    }

    checkIsNoAmmoLeft(){
        if (this.ammo == 0) {
            return true;
        }
        return false;
    }

    checkIfHitSuccessful(ducks, mouseX, mouseY){
        if (mouseX == undefined || mouseY == undefined) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }
        let numberOfSuccessfulHits = 0;
        this.subtractAmmunition();

        for (let index = 0; index < ducks.length; index++) {
            let duck = ducks[index];
            let duckPosition = $(duck.duckId).offset();

            if(this.isShotOnDuck(mouseX,mouseY,duckPosition) && duck.isAlive){
                duck.fallDown();
                numberOfSuccessfulHits++;
            }   
        }
        if (numberOfSuccessfulHits>1) {
            showComboMessage(mouseX,mouseY, numberOfSuccessfulHits);
        }
        return numberOfSuccessfulHits;
    }

    subtractAmmunition(){
        this.shoot.currentTime = 0;
        this.shoot.play();
        this.ammo--;
        this.changeShootBoxImage();
    }

    isShotOnDuck(mouseX,mouseY,duckPosition) {
        let duckX = duckPosition.left;
        let duckY = duckPosition.top;
        let duckWidth = 78;
        let duckHeight = 73;
    
        if ((mouseX>=duckX) && (mouseX <= duckX+duckHeight) && 
            (mouseY >= duckY) && (mouseY <= duckY+duckWidth)){
            return true;
        }
        return false;
    }

    changeShootBoxImage() {
        //add displaying images on classic and modern game mode;
        $("#ammunitionAmmount").html(this.ammo)
    }

    enableShooting(){
        $("#shootBlocker").hide();
    }

    disablehooting(){
        $("#shootBlocker").show();
    }
}

