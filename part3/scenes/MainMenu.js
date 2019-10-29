let MainMenu = {
    cursor: null,
    selection: 0,
    // option names should match desired scene names
    options: ["Level1", "Highscores", "Instructions"],
    setup: function () {
        this.selection = 0;
        this.cursor = createVector(width / 2 - 110, height / 2+30);
    },
    draw: function () {
        push();
        background(0);

        // Title Area
        fill(0,0);
        stroke(255,0,0);
        strokeWeight(5);
        rect(25,25, width-50, 250);

        fill(255);
        textAlign(CENTER);
        textSize(130);
        text(GM.title, width / 2, height / 3.4);

        // menu choices
        noStroke();
        textAlign(LEFT);
        textSize(33);
        text("START", width / 2 - 50, height / 2 + 40);
        textSize(33);
        text("HIGHSCORES", width / 2 - 50, height / 2 + 90);
        textSize(33);
        text("INSTRUCTIONS", width / 2 - 50, height / 2 + 140);
        pop();

        // selection icon
        push();
        rectMode(CENTER);
        fill("red");
        translate(this.cursor.x, this.cursor.y);
        rotate(radians(45));
        square(0, 0, 30);
        rotate(radians(-45));
        fill("black");
        square(-25, 0, 70);
        pop();

    },
    update: function () {
        let startingPoint = height / 2 + 30;
        if (this.selection == 0) {
            this.cursor.y = startingPoint;
        } else if (this.selection == 1) {
            this.cursor.y = startingPoint + 52;
        } else if (this.selection == 2) {
            this.cursor.y = startingPoint + 104;
        }
    },
    keyPressed: function (keyCode) {
        console.log("MainMenu detected keyPressed(): " + keyCode);
        // 40 is DOWNARROW
        if (keyCode == 40 && this.selection < this.options.length - 1) {
            this.selection++;
        }
        // 38 is UPARROW
        if (keyCode == 38 && this.selection > 0) {
            this.selection--;
        }
        // 32 is SPACEBAR // 13 is ENTER
        if (keyCode == 32 || keyCode == 13) {
            GM.setCurrentScene(this.options[this.selection]);
        }
    },
};