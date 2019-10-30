let Level1 = {
    setup: function () {
        // set stuff up
        imageMode(CENTER);
        this.pos = createVector(width / 2, 550);
        this.lives = 4;
        this.aliens = [];
        this.alienDir = createVector(1, 0);
        this.alienJustHitLeftWall = false;
        this.alienJustHitRightWall = false;
        this.alienBullets = [];
        this.barriers = [];
        this.setupAliens();
        this.setupBullet();
        this.setupBarriers();
        this.turd = false;
        this.currentScore = 0;
    },
    draw: function () {
        push();
        background(0);



        // draw score
        textSize(22);
        fill(255);
        text("SCORE: " + this.currentScore + " - LIVES: " + this.lives, 25, 25);

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
        if (keyCode == 32) { //SPACEBAR
            this.fireBullet();
        }
        if (keyCode == 27) { // ESCAPE KEY
            GM.setCurrentScene("MainMenu");

            GM.recentScore = this.currentScore;
            Highscores.addHighscore(GM.recentScore);

        }
    },
    // SECTION Drawing
    drawShip: function () {
        fill(0, 255, 0);
        noStroke();
        rect(this.pos.x, this.pos.y, 60, 30, 15, 15, 0, 0);
        rect(this.pos.x + 25, this.pos.y - 10, 10, 20);
    },
    drawBarriers: function () {
        for (let i = 0; i < this.barriers.length; i++) {
            const b = this.barriers[i];
            push();
            fill(0, 255, 0);
            circle(b.x, b.y, 15);
            pop();
        }
    },
    drawAliens: function () {
        fill(255);
        for (let i = 0; i < this.aliens.length; i++) {
            const a = this.aliens[i];
            // circle(a.pos.x, a.pos.y, 30);
            image(alienImg, a.pos.x, a.pos.y, 35, 30);
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
        this.alienBullets.forEach(ab => {
            fill(255, 0, 255)
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

    updateAliens: function () {
        this.aliens = this.aliens.filter(a => {
            // move it
            a.pos.add(this.alienDir);

            // if alien touches player... destroy player
            let dist2Player = dist(this.pos.x + 28, this.pos.y, a.pos.x, a.pos.y);
            if (dist2Player < 30) {
                this.destroyShip();
            }

            // random chance to fire an Alien Bullet
            let rand = random(100);
            if (rand < 0.06) {
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
                this.currentScore += 100;
                return false;
            } else {
                return true;
            }

        });


        // change direction out of the loop & speed up aliens
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
        // cap alien speed
        if (this.alienDir.x > 15) this.alienDir.x = 15;

        // clear screen = get points & add new aliens
        if (this.aliens.length < 1) {
            this.setupAliens();
            this.currentScore += 1000;
            this.alienDir.x = (this.currentScore / 1000 / 2) - 2;
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
    updateAlienBullets: function () {
        this.alienBullets = this.alienBullets.filter(ab => {
            ab.y += 5;
            //collision checks
            let dist2Player = dist(this.pos.x + 28, this.pos.y, ab.x, ab.y);
            // delete bullets
            if (ab.y > height - 50) {
                return false;
            } else if (dist2Player < 30) {
                this.destroyShip();
                return false;
            } else {
                return true;
            }


        });
    },
    updateBarriers: function () {
        let destroyedBarriers = [];
        this.barriers = this.barriers.filter((barrier, i) => {
            let hasDestroyedBarriers = false;
            destroyedBarriers.forEach(db => {
                if (db == i) {
                    hasDestroyedBarriers = true;
                }
            });
            if (hasDestroyedBarriers) return false;

            let didHitEnemyBullet = false;
            let didHitPlayerBullet = false;
            // check for the player bullet
            let dist2PBullet = dist(barrier.x, barrier.y, this.bullet.pos.x, this.bullet.pos.y);
            if (dist2PBullet < 15 / 2) {
                didHitPlayerBullet = true;
            }
            // check for the enemy bullet
            this.alienBullets = this.alienBullets.filter(bullet => {
                let dist2Ebullet = dist(barrier.x, barrier.y, bullet.x, bullet.y + (25 / 2));
                if (dist2Ebullet < 15 / 2) {
                    didHitEnemyBullet = true;
                    destroyedBarriers.push(i+1);
                    return false;
                } else {
                    return true;
                }
            });

            if (didHitEnemyBullet) {
                return false;
            } else if (didHitPlayerBullet) {
                this.bullet.fired = false;
                return false;
            } //else {
            return true;
            // }
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
    setupBarriers: function () {
        for (let offset = 60; offset < 700; offset += 200) {
            for (let i = 0; i < 9; i++) {
                for (let y = 0; y < 9; y++) {
                    this.barriers.push(createVector(offset + i * 8, 420 + y * 8));
                }
            }
        }
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
        this.alienBullets.push(createVector(v.x, v.y));
    },
    destroyShip: function () {
        this.pos.x = 50;
        this.lives--;

        if (this.lives < 1) {
            GM.recentScore = this.currentScore;
            Highscores.addHighscore(GM.recentScore);

            GM.setCurrentScene("Highscores");
        }

    },



    // !SECTION 
};