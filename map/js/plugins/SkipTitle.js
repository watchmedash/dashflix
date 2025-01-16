(function() {

    Scene_Boot.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        SoundManager.preloadImportantSounds();
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
        this.updateDocumentTitle();
    };

    Scene_Map.prototype.callMenu = function() {

    };

    Scene_Map.prototype.updateCallMenu = function() {

    };

    Scene_Map.prototype.createAllWindows = function() {
        this._messageWindow = new Window_Message();
        this.addWindow(this._messageWindow);
        this._scrollTextWindow = new Window_ScrollText();
        this.addWindow(this._scrollTextWindow);
    };
})();
