var config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 840,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var stars;
var worldwidth = 9000;
var game = new Phaser.Game(config);
var score = 0;
var scoreText;
function preload() {

    this.load.image('tile', 'assets/2.png')
    this.load.image('BG+', 'assets/BG+.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('tileS', 'assets/14.png');
    this.load.image('tileM', 'assets/15.png');
    this.load.image('tileE', 'assets/16.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

var platforms;


function update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.setVelocityX(-320);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(320);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }
}
function create() {

    for (var bg1=900; bg1<worldwidth; bg1=bg1+1800){
        this.add.image(bg1, 420, 'BG+');
    }

    platforms = this.physics.add.staticGroup();
    for (var x = 0; x < worldwidth; x = x + 128) {
        platforms.create(x, 776, 'tile');
    }
    for (var x1 = 0; x1 < worldwidth; x1 = x1 + 128*6) {
        var y = Phaser.Math.Between(200, 500);
        platforms.create(x1, y, 'tileS');
        platforms.create(x1+128, y, 'tileM');
        platforms.create(x1+256, y, 'tileE');
    }
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0,0, worldwidth, 840);
    this.physics.world.setBounds(0,0, worldwidth, 840);
    this.cameras.main.startFollow(player);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);
    stars = this.physics.add.group({
        key: 'star',
        repeat: 200,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);

    function collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            gameover = true;

        }
    }
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
    function hitBomb(player, _bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;

    }
}
