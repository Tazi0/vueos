<template>
    <img id="backgroundIMG" src="http://s1.picswalls.com/wallpapers/2017/12/10/4k-screensaver_110629116_312.jpg" alt="BACKGROUND">
    <Bar :favorites="favorites" @open="openApp" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import Apps from "./assets/Apps.json"

export default {
    name: 'App',
    components: {
        Bar,
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
html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    width: 100vw;
    height: 100vh;

    padding: 0;
    margin: 0;
}

#backgroundIMG {
    display:block;
    width:100%; height:100%;
    object-fit: cover;
}

.blurred {
    background-color: rgba(71, 71, 71, 0.34);
    backdrop-filter: blur(16px) brightness(115%);
}
</style>
