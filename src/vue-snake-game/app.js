import Vue from 'vue';
import App from './App.vue';


function startApp() {
    return new Vue({
        el: '#app',
        render: h => h(App)
    });
}

startApp();
