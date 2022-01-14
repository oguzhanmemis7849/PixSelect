import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Live from '@/views/Live.vue'
import Photos from '@/views/Photos.vue'


Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/live',
            name: 'live',
            component: Live
        },
        {
            path: '/photos',
            name: 'photos',
            component: Photos
        }
    ]
})