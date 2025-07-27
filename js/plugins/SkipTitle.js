/*:
 * @plugindesc Skips the title screen and goes straight into the game map.
 * @author ChatGPT
 */

var _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
  _Scene_Boot_start.call(this);
  DataManager.setupNewGame();
  SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.create = function() {
  SceneManager.goto(Scene_Map);
};
