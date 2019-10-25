let Highscores = {
    setup: function () {
        // set stuff up
        this.defaultScores = [1,1,1,1,1,1,1,1,1,1,1,0];
        this.storedHighscoresName = GM.title;

        // LOADING HIGHSCORES from default or localStorage
        this.highscores = [];
        if (localStorage.hasOwnProperty(this.storedHighscoresName)) {
            this.highscores = JSON.parse(localStorage[this.storedHighscoresName]);
            console.log("I grabbed HS's from local storage");
        } else {
            this.highscores = this.defaultScores;
            localStorage[this.storedHighscoresName] = JSON.stringify(this.defaultScores);
            console.log("I grabbed HS's from default scores");
        }
        console.log("after: ", this.highscores);
    },
    draw: function () {
        push();
        background(0);
        fill(255);
        textAlign(CENTER);
        textSize(66);
        text("HIGHSCORES", width / 2, 100);

        let textStart = 150;
        textAlign(LEFT);
        textSize(30);
        let sortedArray = this.getHighscores();
        for (let i = 0; i < 10; i++) {
            let score = sortedArray[i];
            if (i < 9)
                text(" " + (i + 1) + ":    " + score, width / 3, textStart);
            else
                text(i + 1 + ":    " + score, width / 3, textStart);
            textStart += 30;
        }

        textAlign(CENTER);
        if (GM.recentScore != null) {
            text("Your most recent score: " + GM.recentScore, width / 2, height - 120);
        }

        text("press any key to go back...", width / 2, height - 50);




        pop();
    },
    update: function () {

    },

    addHighscore: function (score) {
        this.setup();
        let tempScores = JSON.parse(localStorage[this.storedHighscoresName]);
        tempScores.push(score);
        localStorage[this.storedHighscoresName] = JSON.stringify(tempScores);
    },

    getHighscores: function () {
        let newArray = this.highscores.sort(function (a, b) {
            return b - a
        });
        // sort the scores array from highest to lowest

        return newArray;
    },

    keyPressed: function (keyCode) {
        console.log("Highscores detected keyPressed(): " + keyCode);
        GM.setCurrentScene("MainMenu");

        // this.addHighscore(random(0, 10000));
        // this.setup();
    },
};