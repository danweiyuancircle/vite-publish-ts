import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {dateUtils} from "./bridge/date-utils";

console.log("@", dateUtils.getDate());

createApp(App).mount('#app')
