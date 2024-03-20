var config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 840,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var lifeText
var enemyCount = 10
var livesHP;
var lives = 3;
var SkeletonA = 0;
var stars;
var worldwidth = 9000;
var game = new Phaser.Game(config);
var score = 0;
var scoreText;
function preload() {
    this.load.image('reset', 'assets/reset.png')
    this.load.image('enemy', 'assets/enemy.png')
    this.load.image('fire', 'assets/fire.png')
    this.load.image('HP', 'assets/HP.png')
    this.load.image('Bush', 'assets/Bush (1).png')
    this.load.image('Skeleton', 'assets/Skeleton.png')
    this.load.image('TombStone', 'assets/TombStone (1).png')
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
if (cursors.space.isDown) {
        console.log(player.body.velocity.x)
        //Створюємо постріл
        fire = this.physics.add.sprite (player.x, player.y, 'fire').setScale(0.5);
        fire
        .setVelocityX(player.body. velocity.x * 2)
        this.physics.add.collider (fire, platforms, () => {
        fire.disableBody (true, true);
        });
        //Колізія постріла та ворога
        //t h is.physics.add.collider (enemy, fire, hitEnemyFire, null, this);
        this.physics.add.collider (enemy, fire, (enemy, fire) => {
        fire.disableBody (true, true);
        enemy.disableBody (true, true);
        }, null, this);
    if (Math.abs(player.x - enemy.x) < 600) {
        enemy.moveTo(player, player.x, player.y, 300, 1)
        }
        //Зміна напрямку руху ворога
        enemy.children.iterate((child) => {
        if (Math.random() < 1) {
        child.setVelocityX(Phaser.Math.FloatBetween (-500,500))
              }
        })}}
        function showLife() {
            var lifeLine = ''
            for (var i = 0; i < lives; i++) {
            lifeLine = lifeLine + '<3'
            // lifeLine +=
            //console.log(life)
            }
            return lifeLine
            }
function create() {
    
    var resetButton = this.physics.add.image(100, 100, 'reset')
    .setInteractive()
    .setScrollFactor(0)

    resetButton.on('pointerdown', function() {
        refreshbody()
    } )

        for (var bg1 = 900; bg1 < worldwidth; bg1 = bg1 + 1800) {
        this.add.image(bg1, 420, 'BG+').setScrollFactor(0.2);
    }

    for (var x = 0; x < worldwidth; x = x + 1000) {
        if (Phaser.Math.Between(1, 2) === 1) {
            this.add.image(x, 690, 'TombStone');
        }
        if (Phaser.Math.Between(1, 2) === 1) {
            this.add.image(x + 500, 690, 'Bush');
        }
        if (Phaser.Math.Between(1, 2) === 1) {
            this.add.image(x + 250, 690, 'Skeleton');
        }
    }

    platforms = this.physics.add.staticGroup();
    for (var x = 0; x < worldwidth; x = x + 128) {
        platforms.create(x, 776, 'tile');
    }
    for (var x1 = 0; x1 < worldwidth; x1 = x1 + 128 * 6) {
        SkeletonA = 0;
        var y = Phaser.Math.Between(200, 500);
        platforms.create(x1, y, 'tileS');
        platforms.create(x1 + 128, y, 'tileM');
        platforms.create(x1 + 256, y, 'tileE');
        if (Phaser.Math.Between(1, 2) === 1) {
            this.add.image(Phaser.Math.Between(x1 + 100, x1 + 256), y - 68, 'Skeleton');
            SkeletonA = 1;
        }
        if (SkeletonA === 0) {
            this.add.image(Phaser.Math.Between(x1 + 100, x1 + 256), y - 72, 'TombStone');
        }
    }
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    enemy = this.physics.add.group({
        key: 'enemy',
        repeat: worldwidth/300,
        setXY: { x: 300, y: 700 - 150, stepX: Phaser.Math. FloatBetween (300, 500) }
        });
        enemy.children.iterate (function (child) {
        child
        //.setBounce (Phaser.Math. FloatBetween(0, 1))
        .setCollideWorldBounds (true)
        .setVelocityX(Phaser.Math. FloatBetween(-500, 500))
        });
        
    this.cameras.main.setBounds(0, 0, worldwidth, 840);
    this.physics.world.setBounds(0, 0, worldwidth, 840);
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
        repeat: worldwidth / 12,
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
        
        var bomb = bombs.create(Phaser.Math.Between(0, worldwidth), 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            gameover = true;

        }
    }
        //Колізія ворогів та платформ
this.physics.add.collider (enemy, platforms);
//Колізія ворогів та гравця
this.physics.add.collider (player, enemy, () => {
//fire.disableBody (true, true);
player.x = player.x + Phaser.Math.FloatBetween (-200, 200);
player.y = player.y - Phaser.Math.FloatBetween (200, 400);
//lifeText.setText(showTextSymbols ('', life))
}, null, this);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFFFF' }).setOrigin(0, 0).setScrollFactor(0);

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
    function hitBomb(player, _bomb) {

        lives = lives - 1;
        if (lives === 0) {
            player.setTint(0xff0000);
            this.physics.pause();
            player.anims.play('turn');

            gameOver = true;
        }
    }
    
}
function refreshbody() {
    window.location.reload();
}
