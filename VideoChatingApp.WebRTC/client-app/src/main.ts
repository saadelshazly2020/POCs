import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/styles/main.css'

// Import views
import Home from './views/Home.vue'
import VideoChat from './views/VideoChat.vue'
import Room from './views/Room.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/video-chat',
      name: 'VideoChat',
      component: VideoChat
    },
    {
      path: '/room/:roomId',
      name: 'Room',
      component: Room,
      props: true
    }
  ]
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')
