let Instructions = {
    setup: function () {
        this.text1 = "To control your ship... blah blah blah.";
        this.text2 = "press the XX button and so on. yada yada yada";
        this.text3 = "watch out for the bombs...";

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