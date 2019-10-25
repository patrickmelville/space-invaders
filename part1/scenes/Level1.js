let Level1 = {
    setup: function () {
        // set stuff up
        this.pos = createVector(width / 2, 550);
        this.aliens = [];
        this.setupAliens();
    },
    draw: function () {
        push();
        background(0);
        // draw score
        textSize(22);
        fill(255);
        text("SCORE: 100", 25, 25);

        // draw ship
        this.drawShip();

        // draw 3/4 barriers
        this.drawBarriers();

        // alien array
        this.drawAliens();

        pop();
    },
    update: function () {
        this.updateShip();
        this.updateBarriers();
        this.updateAliens();
    },
    keyPressed: function (keyCode) {
        // console.log("Level 1 detected keyPressed(): " + keyCode);

        // GM.recentScore = 11234;
        // Highscores.addHighscore(GM.recentScore);
        // GM.setCurrentScene("Highscores");
    },

    drawShip: function () {
        fill(0, 255, 0);
        noStroke();
        rect(this.pos.x, this.pos.y, 60, 30, 15, 15, 0, 0);
        rect(this.pos.x + 25, this.pos.y - 10, 10, 20);
    },
    drawBarriers: function () {
        fill(0, 255, 0);
        noStroke();
        rect(60, 420, 80, 65, 15, 15, 0, 0);
        rect(260, 420, 80, 65, 15, 15, 0, 0);
        rect(460, 420, 80, 65, 15, 15, 0, 0);
        rect(660, 420, 80, 65, 15, 15, 0, 0);
    },
    drawAliens: function () {
        
    },

    updateShip: function () {
        if (keyIsDown(37)) {
            this.pos.x -= 5;
        }
        if (keyIsDown(39)) {
            this.pos.x += 5;
        }
    },
    updateBarriers: function () {},
    updateAliens: function () {},

    setupAliens: function(){
        let rows = 5;
        let cols = 11;
        for (let y = 0; y < rows; y++) {

            for (let x = 0; x < cols; x++) {
                this.aliens.push({
                    pos: createVector(x * 20,y * 20),
                    alive: true,
                });
            }
        }
    },

};