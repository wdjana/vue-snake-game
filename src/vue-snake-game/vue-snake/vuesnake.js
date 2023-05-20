import input_mixins from './input.mixins';
import event_mixins from './event.mixins';


// const MIN_SIZE = 400;
// const MAX_SIZE = 1024;
//
const DIRECTION = {
    up: 1,
    down: 2,
    left: 3,
    right: 4
};

const VERTICAL_MOVEMENT = [DIRECTION.up, DIRECTION.down];
const HORIZONTAL_MOVEMENT = [DIRECTION.left, DIRECTION.right];

const TILES_COUNT = 32 ;
const MIN_BLOCK_SIZE = 2;

const DEFAULT_SNAKE_POSITION = {
    x: 5,
    y: 5,
};

const DEFAULT_SNAKE_DIRECTION = DIRECTION.right;
const DEFAULT_SNAKE_BODY_COUNT = 3;

const DEFAULT_UPDATE_INTERVAL = 150;
const MIN_UPDATE_INTERVAL = 80;


const SPAWN_INTERVAL = 20;

let intervalId = null;
// let spawn_span = 0;
let SPAWN_RANGE = 5;
const LEVELUP_SCORE = 10;


// let intervalId;

// const BLOCK_HALF_SIZE = 5;

// function pointToRect(x, y) {
//
// }

export default {


    mixins: [input_mixins, event_mixins],

    props: {
        // CWidth: {
        //     type: Number,
        //     default: 640,
        // },
        // CHeight: {
        //     type: Number,
        //     default: 360,
        // },

        CInterval: {
            type: Number,
            default: 100
        },
        CSize: {
            type: Number,
            default: 500
        },

        foodBorderWidth: {
            type: Number,
            default: 0,
        },

        backgroundColor: {
            type: String,
            default: '#1A1A2E',
        },

        foodColor: {
            type: String,
            default: '#7FFF00',
        },

        foodBorderColor: {
            type: String,
            // default: '#FFFFFF',
            default: '#7FFF00',
        },

        snakeColor: {
            type: String,
            default: '#FF5733'
        },

        snakeHeadColor: {
            type: String,
            // default: '#9c2c00',
            default: '#FF8C69',
        },

        gameOverText: {
            type: String,
            default: 'GAME OVER',
        },
    },

    data() {
        return {
            canvas: null,
            ctx: null,
            snake: [],
            running: false,
            cinterval: null,
            tempDirection: DIRECTION.right,
            gameover: true,
            boxes: [],
            tailbox: null,
            scores: 0,
            level: 1,
            tolevelup: 0,
            nextBox: 0,
        };
    },

    mounted(){
        this.initCanvas();
        this.resizeCanvas();

        this.initGame();


        // test drawbloxk
        // this.drawBox(0, 10);
    },

    beforeDestroy() {
        this.clearCanvas();
    },

    computed: {
        direction() {
            return DIRECTION;
        },

        blocksize(){
            let { CSize } = this;

            let blocksize = CSize / TILES_COUNT;

            if (blocksize < MIN_BLOCK_SIZE) {
                blocksize = MIN_BLOCK_SIZE;
            } else {
                let isize = parseInt(blocksize);
                if (isize != blocksize) {
                    blocksize = isize + 1;
                }

                if (blocksize % 2 > 0) {
                    blocksize += 1;
                }
            }

            return blocksize;
        },

        dsize() {
            let { blocksize } = this;
            return blocksize * TILES_COUNT;

            // let { CSize } = this;
            //
            // CSize = CSize < MIN_SIZE ? MIN_SIZE :
            //     CSize > MAX_SIZE ? MAX_SIZE : CSize;
            //
            // CSize = CSize % 2 > 0 ? CSize + 1 : CSize;
            //
            // return CSize;
        },

        // CWidth() {
        //     return this.CSize * 2;
        // },
        //
        // CHeight() {
        //     return this.CWidth;
        // }
    },

    methods: {

        onKeySpace() {
            let { running, gameover } = this;

            if (running) {
                this.pauseGame();
            } else {
                if (gameover) {
                    this.startGame();
                } else {
                    this.resumeGame();
                }
            }

            // if (this.running) {
            //     this.pauseGame();
            // } else {
            //     if (this.gamveover) {
            //         this.startGame();
            //     } else {
            //         this.resumeGame();
            //     }
            // }
        },

        onBlur() {
            if (this.running) {
                this.pauseGame();
            }
        },

        onChangeDirection(direction) {
            this.tempDirection = direction;
            // let { snake } = this;
            // let head = snake[0];
            //
            // // console.log('change direction to', direction);
            //
            // if (this.validateDirection(direction)) {
            //     head.direction = direction;
            // }
        },

        initCanvas() {
            if (!this.canvas) {
                this.canvas = this.$refs.canvas;
            }

            if (!this.ctx) {
                this.ctx = this.canvas.getContext('2d');
            }

            // this.clearCanvas();
            this.canvas.focus();
        },

        initGame() {
            this.interval = DEFAULT_UPDATE_INTERVAL;
            this.gameover = false;
            this.scores = 0;
            this.level = 1;
            this.tolevelup = 0;
            this.nextBox = 0;
            this.initSnake();
            this.initBoxes();
        },

        endGame() {
            let { interval } = this;
            this.gameover = true;
            this.running = false;

            clearInterval(interval);

            // ctx.fillStyle = '#FFF';
            // ctx.font = 'bold 48px Arial';
            // ctx.fillText('Game Over', 15, 35);

            this.drawGameOver();

            // this.$emit('gaveover');
            this.eventGameOver();
        },

        initSnake() {
            let snake = [];
            snake.length = DEFAULT_SNAKE_BODY_COUNT;


            // snake.push(DEFAULT_SNAKE_POSITION);
            // snake[0].direction = DEFAULT_SNAKE_DIRECTION;


            for(let i = 0; i < DEFAULT_SNAKE_BODY_COUNT; i++) {
                let x = DEFAULT_SNAKE_POSITION.x - i;
                let y = DEFAULT_SNAKE_POSITION.y;
                let direction = DEFAULT_SNAKE_DIRECTION;

                snake[i] = { x, y, direction };

                // snake[i] = DEFAULT_SNAKE_POSITION;
                // snake[i].direction = DEFAULT_SNAKE_DIRECTION;
                //
                // if (i > 0) {
                //     snake[i].x += -1;
                //     console.log(i, snake[i]);
                // } else {
                //     console.log(i, snake[i]);
                // }
            }

            // console.log('init snake', { snake });

            this.snake = snake;
            this.tempDirection = DEFAULT_SNAKE_DIRECTION;
            this.drawSnake();
        },

        initBoxes() {
            let boxes = [];
            let { x, y } = this.generateRandomPoint();

            boxes.push({ x, y });
            this.boxes = boxes;

            // this.drawBoxes();
        },

        startGame() {
            this.clearCanvas();
            this.initGame();

            // this.running = true;
            //
            this.resumeGame();
            // this.$emit('start')

            this.eventGameStart();
        },

        pauseGame() {
            // console.log('game paused');

            this.running = false;
            if (intervalId) {
                clearInterval(intervalId);
            }

            // this.$emit('pause');
            this.eventGamePause();
        },

        resumeGame() {
            this.running = true;
            if (intervalId) {
                clearInterval(intervalId);
            }

            intervalId = setInterval(this.update, this.interval);

            // this.$emit('resume');
            this.eventGameResume();
        },

        update() {
            if (intervalId) {
                clearInterval(intervalId);
            }

            let { running, interval } = this;

            if (running && interval > 0) {


                this.moveSnake();

                if (this.overcheck()) {
                    this.nextBox -= 1;

                    this.crossboxcheck();

                    if (this.nextBox < 1) {
                        this.generateBox();
                        this.nextBox = SPAWN_INTERVAL;
                    }

                    this.clearCanvas();
                    this.drawSnake();
                    this.drawBoxes();
                    intervalId = setInterval(this.update, interval);


                } else {
                    this.endGame();
                }


            }
        },

        levelUp() {
            // console.log('level up');

            let { level, interval } = this;
            level += 1;
            // interval -= 2;

            if (interval < MIN_UPDATE_INTERVAL) {
                interval = MIN_UPDATE_INTERVAL;
            }

            this.level = level;
            this.interval = interval;
            // this.tolevelup = 1;

            // this.$emit('tolevelup', level);

            this.eventGameLevelUp(level);
        },

        addScore() {
            let { scores, tolevelup } = this;

            scores += 1;
            tolevelup += 1;

            if (tolevelup > LEVELUP_SCORE) {
                this.levelUp();
                tolevelup = 1;
            }

            this.scores = scores;
            this.tolevelup = tolevelup;

            // this.$emit('addscore', scores);

            this.eventGameScore(scores);
        },

        drawBoxes() {
            let { boxes } = this;
            for(let box of boxes ) {
                let c = box.y + box.x;

                if (c % 2 == 0) {
                    this.drawBox(box.x, box.y);
                } else {
                    this.drawCircle(box.x, box.y);
                }


            }
        },

        clearCanvas() {
            let { ctx, dsize } = this;
            if (ctx) {
                ctx.clearRect(0, 0, dsize, dsize);
            }

            this.fillBackground();
        },

        resizeCanvas() {
            let { canvas, dsize } = this;
            if (canvas) {
                canvas.width = dsize;
                canvas.height = dsize;
                // if (CWidth > 0 && canvas.width != CWidth) {
                //     canvas.width = CWidth;
                // }
                //
                // if (CHeight > 0 && canvas.height != CHeight) {
                //     canvas.height = CHeight;
                // }
            }

            this.clearCanvas();

            // this.fillBackground();
        },

        fillBackground() {
            let { ctx, dsize, backgroundColor } = this;

            // console.log('fillBackground', { dsize });

            if (ctx) {
                ctx.fillStyle = backgroundColor; // biru muda
                ctx.fillRect(0,0, dsize, dsize);
            } else {
                console.log('ctx empty');
            }
        },

        drawBox(x, y, ccolor) {
            // const lineWidth = 2;
            let { ctx, blocksize, foodColor, foodBorderColor, foodBorderWidth } = this;
            let pt = this.convertPoint(x, y);

            // console.log('draw box', { x, y, cx: pt.x, cy: pt.y });

            ccolor = ccolor || foodColor;


            ctx.beginPath();
            ctx.fillStyle = ccolor;
            ctx.fillRect(pt.x, pt.y, blocksize, blocksize);

            if (foodBorderWidth > 0) {
                ctx.lineWidth = foodBorderWidth;
                ctx.strokeStyle = foodBorderColor;
                ctx.stroke();
            }


        },

        drawCircle(x, y, color) {
            let { ctx, blocksize, foodColor, foodBorderColor, foodBorderWidth } = this;
            let radius = parseInt(blocksize/2);
            color = color || foodColor;
            // let pt = this.convertPoint(x, y);

            let cx = ((x +0.5 )  * (blocksize));
            let cy = ((y +0.5  ) * (blocksize));

            // console.log('draw circle', { x, y, cx, cy });

            radius -= foodBorderWidth;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();

            if (foodBorderWidth > 0) {
                ctx.lineWidth = foodBorderWidth;
                ctx.strokeStyle = foodBorderColor;
                ctx.stroke();
            }
        },

        drawGameOver() {
            let { canvas, ctx, gameOverText } = this;

            // ctx.beginPath();
            ctx.font = "Bold 48px Arial";
            ctx.fillStyle = "#FF0C0C";
            const textWidth = ctx.measureText(gameOverText).width;
            const x = canvas.width / 2 - textWidth / 2;
            const y = canvas.height / 2;

            ctx.fillText(gameOverText, x, y);

            // ctx.strokeStyle = '#252a41';
            // ctx.strokeStyle = '#FFFF00';
            // ctx.lineWidth = 1;
            // ctx.strokeText(gameOverText, x, y);
        },

        moveSnake() {
            let { snake, tempDirection } = this;
            let head = {};
            head.direction = this.validateDirection(tempDirection) ?
                tempDirection : snake[0].direction;

            switch(head.direction) {
                case DIRECTION.left:
                    head.x = snake[0].x -1;
                    head.y = snake[0].y;
                break;

                case DIRECTION.up:
                    head.x = snake[0].x;
                    head.y = snake[0].y -1;
                break;

                case DIRECTION.down:
                    head.x = snake[0].x;
                    head.y = snake[0].y +1;
                break;

                default:
                    head.x = snake[0].x +1;
                    head.y = snake[0].y;
                break;
            }

            let nsnake = [head];
            for( let i = 0; i < snake.length -1; i++) {
                nsnake.push(snake[i]);
            }

            // console.log({ nsnake });


            this.snake = nsnake;
            this.tailbox = snake.pop();
        },

        drawSnake() {
            let { snake, snakeColor, snakeHeadColor } = this;
            // console.log({ snake });

            for(let i = 0; i < snake.length; i++) {
                let sbox = snake[i];
                if (i > 0) {
                    this.drawBox(sbox.x, sbox.y, snakeColor);
                } else {
                    this.drawBox(sbox.x, sbox.y, snakeHeadColor);
                }
            }
        },

        convertPoint(x, y) {
            let { blocksize } = this;

            // x = (x * blocksize) + parseInt(blocksize );
            // y = (y * blocksize) + parseInt(blocksize );

            x = (x * blocksize);
            y = (y * blocksize);

            return { x, y};
        },

        validateDirection(direction) {
            let { snake } = this;
            let head = snake[0];
            let retval = false;


            if (VERTICAL_MOVEMENT.indexOf(head.direction) > -1) {
                retval = HORIZONTAL_MOVEMENT.indexOf(direction) > -1;
            } else {
                retval = VERTICAL_MOVEMENT.indexOf(direction) > -1;
            }


            return retval;
        },

        overcheck() {
            // let result = false;
            let { snake } = this;
            let { x, y } = snake[0];

            let result = !(x < 0 || x >= TILES_COUNT || y < 0 || y >= TILES_COUNT );

            if (result) {
                for(let i = 1; i < snake.length; i++) {
                    let cbody = snake[i];

                    if (cbody.x == x && cbody.y == y) {
                        result = false;
                        break;
                    }
                }
            }

            return result;
        },

        crossboxcheck() {
            let { boxes, snake } = this;
            let { x, y } = snake[0];

            for(let i = 0; i < boxes.length; i++) {
                let box = boxes[i];

                if (box.x == x && box.y == y) {
                    this.boxcrossed(i);
                    break;
                }
            }
        },

        boxcrossed(boxIndex) {

            let { boxes, snake, tailbox } = this;

            boxes.splice(boxIndex, 1);
            snake.push(tailbox);

            this.addScore();

            // this.scores += 1;
            // this.tolevelup += 1;
            // // if (nextBox != SPAWN_INTERVAL) {
            // //     this.generateBox();
            // // }
            //
            //
            // if (tolevelup > 0
            // && tolevelup % LEVELUP_SCORE == 0) {
            //     this.levelUp();
            // }
        },

        snakeBodyCollisionCheck(x, y) {
            let retval = false;
            let { snake } = this;

            for(let box of snake ) {
                if (box.x == x && box.y == y) {
                    retval = true;
                    break;
                }
            }

            return retval;
        },

        generateRandomNumber(value, boxValues) {
            let cvalue = Math.floor(Math.random() * (TILES_COUNT -1));
            let cspan = Math.abs(cvalue - value);

            let coke = cspan > SPAWN_RANGE;

            if (coke && boxValues) {
                coke = !(boxValues.indexOf(cvalue) > -1);
            }

            if (coke) {
                return cvalue;
            } else {
                return this.generateRandomNumber(value, boxValues);
            }
        },

        generateRandomPoint() {
            let { snake, boxes } = this;
            let { x, y } = snake[0];

            let tx = [];
            let ty = [];

            for(let box of boxes) {
                tx.push(box.x);
                ty.push(box.y);
            }

            let cx = this.generateRandomNumber(x, tx);
            let cy = this.generateRandomNumber(y, ty);

            return this.snakeBodyCollisionCheck(cx, cy) ?
                this.generateRandomPoint() :
                { x: cx, y: cy };
        },

        generateBox() {
            let { x, y } = this.generateRandomPoint();
            this.boxes.push({ x, y });
        },

    },

}
