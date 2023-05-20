<template lang="html">
    <div class="gc">
        <canvas ref="canvas"
            tabindex="1"
            @blur="onBlur"
            @keydown="onKeyDown"
        ></canvas>


        <!-- <canvas ref="canvas"
            tabindex="1"
            @blur="onBlur"
            @keydown.space="onKeySpace"

            @keydown.up="onChangeDirection(direction.up)"
            @keydown.down="onChangeDirection(direction.down)"
            @keydown.left="onChangeDirection(direction.left)"
            @keydown.right="onChangeDirection(direction.right)"
            @keydown="onKeyDown"
        ></canvas> -->

        <!-- <div class="" style="text-align: left;">
            SCORES {{scores}} <br>
            LEVEL {{level}} <br>
            {{running ? "running" : "paused"}} <br>
            <hr>
            DEBUG <br>
            UPDATE INTERVAL <strong>{{interval}}</strong> TOLEVELUP <strong>{{tolevelup}}</strong>
        </div> -->
    </div>
</template>

<script src="./vuesnake.js"></script>
