// GameManager.js
let GM = {
//   KEY :   VALUE,
    title: "SPACE INVADERS",
    scenes: {},
    currentScene: null,
    recentScore: null,

    // methods a.k.a. functions that belong to an object
    addScene: function(key, value){
        this.scenes[key] = value;
        console.log("A Scene has been loaded: " + key);
    },
    getScene: function(s){
        return this.scenes[s];
    },
    setCurrentScene: function(s){
        this.currentScene = this.scenes[s];
        this.currentScene.setup();
    },
    getCurrentScene: function(){
        return this.currentScene;
    },
    logAllScenes: function(){
        for(const key in this.scenes){
            if(this.scenes.hasOwnProperty(key)){
                const element = this.scenes[key];
                console.log(key + ": ");
                console.log(element);
            }
        }
    },

};