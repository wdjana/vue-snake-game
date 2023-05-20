export default {
    props: {
        keyDown: {
            type: String,
            default: 'ArrowDown'
        },
        keyUp: {
            type: String,
            default: 'ArrowUp'
        },
        keyLeft: {
            type: String,
            default: 'ArrowLeft'
        },
        keyRight: {
            type: String,
            default: 'ArrowRight'
        },
        keyPause: {
            type: String,
            default: 'Space'
        }
    },

    methods: {
        onKeyDown(event) {
            // let { altKey, ctrlKey, shiftKey,
            //     keyCode, code, key } = event;

            let { direction } = this;
            let { keyDown, keyUp,
                keyLeft, keyRight,
                keyPause } = this;

            // console.log({ keyDown, keyUp,
            //     keyLeft, keyRight,
            //     keyPause });

            if (this.matchKey(event, keyPause)) {
                this.onKeySpace();
            } else {
                if (this.matchKey(event, keyDown)) {
                    this.onChangeDirection(direction.down);
                } else if ( this.matchKey(event, keyUp)) {
                    this.onChangeDirection(direction.up);
                } else if ( this.matchKey(event, keyLeft)) {
                    this.onChangeDirection(direction.left);
                } else if ( this.matchKey(event, keyRight)) {
                    this.onChangeDirection(direction.right);
                }
            }


            // if (keyCode == keyPause || code == keyPause ||
            //     key == keyPause ) {
            //     this.onKeySpace();
            // }
            //
            // console.log({ altKey, ctrlKey, shiftKey,
            //     keyCode, code, key,
            //     keyDown, keyUp,
            //     keyLeft, keyRight,
            //     keyPause});
        },

        matchKey(event, keyValue) {
            let { keyCode, code, key } = event;
            return keyCode == keyValue ||
                code == keyValue ||
                key == keyValue;
        },
    }
};
