let Instructions = {
    setup: function () {
        this.text1 = "Use LEFT/RIGHT or A/D to control your ship.";
        this.text2 = "press the SPACEBAR to fire your weapon.";
        this.text3 = "watch out for the aliens... They will shoot at you.";

    },
    draw: function () {
        push();
        background(0);
        fill(255);
        textAlign(CENTER);
        textSize(66);
        text("Instructions", width / 2, 100);

        let textStart = 200;
        textAlign(LEFT);
        textSize(33);
        text(this.text1, 100, textStart);
        text(this.text2, 100, textStart + 50);
        text(this.text3, 100, textStart + 100);

        textAlign(CENTER);
        text("press any key to go back...", width / 2, height - 100);

        pop();
    },
    update: function () {

    },
    keyPressed: function (keyCode) {
        console.log("Instructions detected keyPressed(): " + keyCode);
        GM.setCurrentScene("MainMenu");
    },
};