let Level1 = {
    setup: function () {
        // set stuff up
        this.pos = createVector(width / 2, 550);
        this.aliens = [];
        this.alienDir = createVector(1, 0);
        this.alienJustHitLeftWall = false;
        this.alienJustHitRightWall = false;
        this.alienBullets = [];
        this.setupAliens();
        this.setupBullet();
    },
    draw: function () {
        push();
        background(0);
        // draw score
        textSize(22);
        fill(255);
        text("SCORE: 100", 25, 25);

        this.drawShip();
        this.drawBarriers();
        this.drawAliens();
        this.drawAlienBullets();
        this.drawBullet();

        pop();
    },
    update: function () {
        this.updateShip();
        this.updateBarriers();
        this.updateAliens();
        this.updateBullet();
        this.updateAlienBullets();
    },
    keyPressed: function (keyCode) {
        if (keyCode == 32) {
            this.fireBullet();
        }
        // GM.recentScore = 11234;
        // Highscores.addHighscore(GM.recentScore);
        // GM.setCurrentScene("Highscores");
    },
    // SECTION Drawing
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
        fill(255);
        for (let i = 0; i < this.aliens.length; i++) {
            const a = this.aliens[i];
            circle(a.pos.x, a.pos.y, 30);
        }

    },
    drawBullet: function () {
        if (this.bullet.fired) {
            let x = this.bullet.pos.x;
            let y = this.bullet.pos.y;
            fill(255)
            rect(x, y, 3, 25);
        }
    },
    drawAlienBullets: function () {
        this.alienBullets.forEach(ab =>{
            fill(255,0,255)
            rect(ab.x, ab.y, 3, 25);
        });
    },

    // !SECTION 
    // SECTION UPDATES
    updateShip: function () {
        // move left with ARROWLEFT or 'a' key (if still on screen)
        if ((keyIsDown(37) || keyIsDown(65)) && this.pos.x > 0) {
            this.pos.x -= 5;
        }
        // move right with ARROWRIGHT or 'd' key
        if ((keyIsDown(39) || keyIsDown(68)) && this.pos.x < width - 60) {
            this.pos.x += 5;
        }
    },
    updateBarriers: function () {},
    updateAliens: function () {
        this.aliens = this.aliens.filter(a => {
            // move it
            a.pos.add(this.alienDir);

            // random chance to fire an Alien Bullet
            let rand = random(100);
            if (rand < 0.03){
                this.fireAlienBullet(a.pos);
            }

            // check for wallHits
            let touchRightWall = a.pos.x > width - 15;
            let touchLeftWall = a.pos.x < 15
            if (touchLeftWall) {
                // let game know that we hit the wall
                this.alienJustHitLeftWall = true;
            } else if (touchRightWall) {
                // let game know that we hit the wall
                this.alienJustHitRightWall = true;
            }

            // check for bulletHit
            let d = p5.Vector.dist(this.bullet.pos, a.pos);
            let hitBullet = d < 15;
            if (hitBullet) {
                this.setupBullet();
                return false;
            } else {
                return true;
            }

        });


        // actually change direction out of the loop
        if (this.alienJustHitLeftWall) {
            this.alienDir.rotate(-HALF_PI);
            this.alienDir.x *= 1.05;
            this.alienJustHitLeftWall = false;
            this.alienJustHitLeftWall = false;
        }
        if (this.alienJustHitRightWall) {
            this.alienDir.rotate(HALF_PI);
            this.alienDir.x *= 1.05;
            this.alienJustHitRightWall = false;
            this.alienJustHitRightWall = false;
        }

    },
    updateBullet: function () {
        if (this.bullet.fired) {
            this.bullet.pos.y -= 10;
            if (this.bullet.pos.y < 0) {
                this.setupBullet();
            }
        }
    },
    updateAlienBullets: function (){
        this.alienBullets = this.alienBullets.filter(ab =>{
            ab.y+=5;
            //collision check
            return true;
        });
    },

    // !SECTION 

    // SECTION SETUPS
    setupAliens: function () {
        let rows = 5;
        let cols = 11;
        let offset = 50;
        let margin = 45;
        for (let y = 0; y < rows; y++) {

            for (let x = 0; x < cols; x++) {
                this.aliens.push({
                    pos: createVector(x * margin + offset, y * margin + offset),
                    // alive: true,
                });
            }
        }
    },
    setupBullet: function () {
        this.bullet = {
            pos: createVector(this.pos.x, this.pos.y),
            fired: false,
        };
    },

    // !SECTION 

    // SECTION OTHER
    fireBullet: function () {
        if (!this.bullet.fired) {
            this.bullet.pos = createVector(this.pos.x + 28, this.pos.y);
            this.bullet.fired = true;
        }
    },
    fireAlienBullet: function (v) {
        this.alienBullets.push(createVector(v.x,v.y));
    },
    // !SECTION 
};

