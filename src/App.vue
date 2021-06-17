<template>
    <img id="backgroundIMG" src="http://s1.picswalls.com/wallpapers/2017/12/10/4k-screensaver_110629116_312.jpg" alt="BACKGROUND">
    <Bar :favorites="favorites" @open="openApp" />
    <Notification :Apps="this.Apps" :notfi="this.notifications" @open="openApp" />
    <div class="windows">
        <Window v-for="(v, i) in ActiveApps" :key="i" 
            :object="v"
            :options="v.options"
            :menu="v.menu"
            :extra="v.extra"
            @close="closeApp(i)"
        />
    </div>
</template>

<script>
import Bar from "./components/System/Bar.vue"
import Window from "./components/System/Window.vue"

import Apps from "./assets/Apps.json"
import Notification from './components/System/Notification.vue'

export default {
    name: 'App',
    components: {
        Bar,
        Window,
        Notification,
    },
    methods: {
        openApp(obj, ...extra) {
            if(!obj) return false
            var name = obj.id || obj

            if(!Apps[name]) return false // Future notification

            obj = Apps[name]

            this.ActiveApps[name] = {...obj, extra}
        },
        closeApp(obj) {
            if(!obj) return false
            var name = obj.id || obj

            if(!this.ActiveApps[name]) return false // Future notification

            delete this.ActiveApps[name]
        },
        newNotification(app, title, message, detail) {
            this.notifications.push({
                app,
                title,
                description: message,
                detail
            })
        }
    },
    data() {
        // Filter and render of all apps
        var favorites = {}
        for (let key in Apps) {
            var obj = Apps[key]
            obj.id = key
            if(obj.icon) { // Icon grabber
                obj.icon = require(`./assets/images/${obj.icon}`)
            }
            if (obj.menu) {
                var activeMenu = false
                for (let i = 0; i < obj.menu.length; i++) {
                    const e = obj.menu[i];
                    obj.menu[i].icon = require(`./assets/images/${e.icon}`)
                    if(e.active) activeMenu = true
                }
                if(!activeMenu) obj.menu[0].active = true
            }

            
            if(obj.child) {
                obj.child = require(`./components/Apps/${obj.child}.vue`)
            }

            if(obj.favorite) { // Always do this last
                favorites[key] = obj
            }
        }

        return {
            Apps,
            favorites,
            notifications: [],
            ActiveApps: {}
        }
    },
    created() {
        this.newNotification("sms", "Will Smith", "Don't build a wall, place a brick as good as you can and soon you will have a wall", {id: 3})
    }
}
</script>

<style>
@font-face {
    font-family: 'Kobe';
    font-weight: normal;
    font-style: normal;
    src: url('../public/Kobe Regular.woff');
}
@font-face {
    font-family: 'Kobe';
    font-weight: normal;
    font-style: normal;
    font-style: italic;
    src: url('../public/Kobe Oblique.woff');
}
@font-face {
    font-family: 'Kobe';
    font-weight: 500;
    src: url('../public/Kobe Bold.woff');
}
@font-face {
    font-family: 'Kobe';
    font-weight: 500;
    font-style: italic;
    src: url('../public/Kobe Bold Oblique.woff');
}
@font-face {
    font-family: 'Kobe';
    font-weight: 800;
    src: url('../public/Kobe Black.woff');
}
@font-face {
    font-family: 'Kobe';
    font-weight: 800;
    font-style: italic;
    src: url('../public/Kobe Black Oblique.woff');
}


html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

* {
    user-select: none;
    font-family: 'Kobe';
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    width: 100vw;
    height: 100vh;

    padding: 0;
    margin: 0;

    position: relative;
}

#backgroundIMG {
    display:block;
    width: 100%; height: 100%;
    object-fit: cover;
}

.blurred {
    background-color: rgba(71, 71, 71, 0.34);
    backdrop-filter: blur(16px) brightness(115%);
}
</style>
