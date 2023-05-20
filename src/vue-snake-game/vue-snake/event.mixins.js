export default {

    methods: {
        eventGameStart() {
            this.$emit('start');
        },

        eventGameOver() {
            this.$emit('over');
        },

        eventGamePause() {
            this.$emit('pause');
        },

        eventGameResume() {
            this.$emit('resume');
        },

        eventGameScore(score) {
            this.$emit('score', score);
        },

        eventGameLevelUp(level) {
            this.$emit('levelup', level);
        }
    }

};
