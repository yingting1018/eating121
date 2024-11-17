class MainScene extends Phaser.Scene {
    constructor() {
      super("mainScene");
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("mouth", "mouth.png");
        this.load.image("good-food", "eg.png");
        this.load.image("trashcan", "trashcan.png");
        this.load.image("bad-food", "badeg.png");
    }
    create(){
        this.mouth = this.physics.add.sprite(this.scale.width / 4, this.scale.width /4, 'mouth', 0);
        this.trashcan = this.physics.add.sprite(this.scale.width / 2 + 300, this.scale.width / 4, 'trashcan', 0);
        this.trashcan.scale = 5;
        this.foodGroup = this.add.group({runChildUpdate: true,});
        this.badfoodGroup = this.add.group({runChildUpdate: true,});
        this.points = 0
        this.timeLimit =60000;
        this.startTime = new Date();
        this.score = this.add.text(80,40, "0", {fontSize: 18})
        this.registry.set('score', 0)
        this.timetext = this.add.text(80,80, "60", {fontSize: 18})
        for (let i = 0; i < 10; i += 1){
            this.addBadFood();
            this.addGoodFood();
        }

    }
    update(){
        this.newTime = new Date();
        this.totalTime = this.newTime - this.startTime;
        if(this.totalTime > this.timeLimit){
            this.scene.start("endScene");
        }
        this.timetext.text = Math.ceil((this.timeLimit - this.totalTime)/1000)
        console.log(Math.ceil((this.timeLimit - this.totalTime)/1000))
        this.physics.overlap(this.mouth, this.foodGroup, (mouth, food) => {
            this.points += 1;
            this.registry.set('score', this.points)
            this.score.text = this.points
            food.destroy();
            this.time.delayedCall(1000, () => {this.addGoodFood()});
        })
        this.physics.overlap(this.mouth, this.badfoodGroup, (mouth, food) => {
            this.points -= 1;
            this.registry.set('score', this.points)
            this.score.text = this.points
            food.destroy();
            this.time.delayedCall(1000, () => {this.addBadFood()});
        })
        this.physics.overlap(this.trashcan, this.foodGroup, (trash, food) => {
            this.points -= 1;
            this.registry.set('score', this.points)
            this.score.text = this.points
            food.destroy();
            this.time.delayedCall(1000, () => {this.addGoodFood()});
        })
        this.physics.overlap(this.trashcan, this.badfoodGroup, (trash, food) => {
            this.points += 1;
            this.registry.set('score', this.points)
            this.score.text = this.points
            food.destroy();
            this.time.delayedCall(1000, () => {this.addBadFood()});
        })

    }
    addGoodFood(){
        const food = this.physics.add.sprite(Math.random() * this.scale.width ,Math.random() * 100 + 700,'good-food', 0);
        this.makeItDrag(food)
        this.foodGroup.add(food)
    }
    addBadFood(){
        const food = this.physics.add.sprite(Math.random() * this.scale.width ,Math.random() * 100 + 700,'bad-food', 0);
        this.makeItDrag(food)
        this.badfoodGroup.add(food)
    }
    // code from https://www.youtube.com/watch?app=desktop&v=jWglIBp4usY
  makeItDrag(gameObject) {
    gameObject.setInteractive();

    const startDrag = () => {
      gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
      gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag);
      gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag);
    };

    const stopDrag = () => {
      gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
      gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag);
      gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag);
    };

    const onDrag = (pointer) => {
      gameObject.x = pointer.x;
      gameObject.y = pointer.y;
    };

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
  }
}