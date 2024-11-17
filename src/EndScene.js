class EndScene extends Phaser.Scene {
    constructor() {
      super("endScene");
    }
    create(){
      this.gameovertext = this.add.text(this.scale.width/2, this.scale.height/2, "Game Over!", {fontSize: 32});
      this.scoretext = this.add.text(this.scale.width/2, this.scale.height/2 + 100, "Score:", {fontSize: 32})
      this.scoretext.text = "Score: " + this.registry.get('score').toString()
    }
}