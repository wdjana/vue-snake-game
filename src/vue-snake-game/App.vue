<template lang="html">
<div id="app" class="container">
    <h2>Vue Snake Game</h2>
    <div class="game-container">
        <vue-snake
            @start="onGameStart"
            @over="onGameOver"

            @pause="onGamePause"
            @resume="onGameResume"

            @score="onGameScore"
            @levelup="onGameLevelUp"

            key-pause="Space"
            key-down="ArrowDown"
            key-Up="ArrowUp"
            key-left="ArrowLeft"
            key-Right="ArrowRight"
        />

    </div>
</div>
</template>

<script>

import VueSnake from 'snake/vue-snake/VueSnake.vue';
// import key_mixins from './keys.mixins';

export default {

    components: {
        VueSnake
    },

    methods: {
        onGameStart() {
            console.log('on game start');
        },

        onGameOver() {
            console.log('on game over');
        },

        onGameScore(score) {
            console.log('on game score', { score });
        },

        onGameLevelUp(level) {
            console.log('on game level up', { level });
        },

        onGamePause() {
            console.log('on game pause');
        },

        onGameResume() {
            console.log('on game resume');
        },
    },

    // mixins: [key_mixins],

    // created() {
    //     let { keyDown, keyUp,
    //         keyLeft, keyRight,
    //         keyPause } = this;
    //
    //         console.log({ keyDown, keyUp,
    //             keyLeft, keyRight,
    //             keyPause });
    // },
}
</script>

<style>
html, body, #app {
    padding: 0;
    margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


.game-container {
    margin: 5px auto;
    text-align: center;
}

</style>
