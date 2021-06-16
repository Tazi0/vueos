<template>
    <img id="backgroundIMG" src="http://s1.picswalls.com/wallpapers/2017/12/10/4k-screensaver_110629116_312.jpg" alt="BACKGROUND">
    <Bar :favorites="favorites" @open="openApp" />
    <div class="windows">
        <Window v-for="(v, i) in ActiveApps" :key="i" 
            :object="v"
            :options="v.options"
            :menu="v.menu"
            @close="closeApp(i)"
        />
    </div>
</template>

<script>
import Bar from "./components/System/Bar.vue"
import Window from "./components/System/Window.vue"

import Apps from "./assets/Apps.json"

export default {
    name: 'App',
    components: {
        Bar,
        Window,
    },
    methods: {
        openApp(obj) {
            if(!obj) return false
            var name = obj.id || obj

            if(!Apps[name]) return false // Future notification

            obj = Apps[name]

            this.ActiveApps[name] = obj
        },
        closeApp(obj) {
            if(!obj) return false
            var name = obj.id || obj

            if(!this.ActiveApps[name]) return false // Future notification

            delete this.ActiveApps[name]
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
            ActiveApps: {}
        }
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
}

#app {
    font-family: 'Kobe';
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
