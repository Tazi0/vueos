<template>
    <div class="window" :class="((active) ? 'active ' : '') + classes.window.join(' ')" v-on:mousemove="move">
        <div class="header" v-on:mousedown="down" v-on:mouseup="up" v-on:mouseleave="up">
            <h3 class="title" v-if="!object.noTitle && object.name">{{object.name}}</h3>
            <div class="buttons">
                <span class="close" v-on:click="close"></span>
                <span class="min" v-on:click="min"></span>
                <span class="max"></span>
            </div>
        </div>
        <div class="container">
            <div class="menu" v-if="menu">
                <!-- A optional side menu can be here -->
                <div class="item" v-for="(v, i) in menu" :key="i">
                    <img class="icon" :src="v.icon" alt="icon holder">
                    <p>{{v.title}}</p>
                </div>
            </div>

            <div class="child"></div>
            <!-- A child class will be run here -->
        </div>
        <span class="resize" v-on:drag="resize"></span>
    </div>
</template>

<script>
export default {
    name: "Window",
    props: {
        object: Object,
        options: {
            type: Object,
            default: () => {return {
                backdrop: 'solid' || 'sides'  || 'big',
                size: 'small' || 'medium' || 'big'
            }}
        },
        menu: Array
    },
    methods: {
        // * Button events * //
        close() {
            this.$emit('close')
        },

        // * Resize event * //
        resize(event) {
            console.log(event);
        },

        // * Drag events * //
        down(event) {
            if (event.target.localName == "span") return;
            if (!event.target.parentNode.classList.contains("window")) return;
            event = event || document.event;
            event.preventDefault();

            var d = this.dragging

            d.mousePos.x = event.clientX
            d.mousePos.y = event.clientY

            d.active = true
            d.el = event.target.parentNode
        },
        move(event) {
            var d = this.dragging,
                el = d.el
            if(!d.active) return

            var mousePos = d.mousePos
            
            var pos1 = mousePos.x - event.clientX;
            var pos2 = mousePos.y - event.clientY;

            mousePos.x = event.clientX;
            mousePos.y = event.clientY;
            
            var top = el.offsetTop - pos2
            var left = el.offsetLeft - pos1
            var offset = [el.offsetWidth, el.offsetHeight]

            if (left <= 0) {
                left = 0
            } else if (left >= document.innerWidth - offset[0]) {
                left = document.innerWidth - offset[0]
            }

            if (top <= 0) {
                top = 0
            } else if (top >= document.innerHeight - offset[1]) {
                top = document.innerHeight - offset[1]
            }

            el.style.top = top + "px";
            el.style.left = left + "px";
        },
        up() {
            if(!this.dragging.active) return
            
            this.dragging.active = false
            this.dragging.el = null
        }
        // * ----------- * //
    },
    data() {
        return {
            dragging: {
                active: false,
                el: null,
                mousePos: {
                    x: 0,
                    y: 0
                }
            },
            classes: {
                window: []
            },
            active: true,
            cursor: "grab"
        }
    },
    mounted() {
        var options = this.$props.options

        if (options.backdrop) {
            var b = options.backdrop
            if (b == "sides") {
                this.classes.window.push("blurSides")
            } else if (b == "big") {
                this.classes.window.push("blurBig")
            } else if (b == "solid") {
                this.classes.window.push("blurSolid")
            }
        }
    }
}
</script>

<style scoped>
.window {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    position: absolute;
    top: 100px;
    left: 100px;

    width: 750px;
    height: 500px;

    border-radius: 13px;
}

.window.blurSolid {
    background-color: #F3ECEF;
}

.window.blurBig,
.window.blurSides {
    background-color: rgba(71, 71, 71, 0.34);
    backdrop-filter: blur(16px) brightness(115%);
}

.window.blurSides .header {
    background-color: #F3ECEF;
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
}
.window.blurSides .child {
    position: relative;
    border-top-left-radius: 0;
}
.window.blurSides .child::before {
    content: "";
    position: absolute;

    background-color: transparent;
    top: 0;
    left: 0;
    height: 50px;
    width: 25px;
    border-top-left-radius: 25px;
    box-shadow: 0 -25px 0 0 #F3ECEF; /* does the magic */
    /*     box-shadow: 0 -25px 0 0 #000000;  */
    transform: rotate(90deg) translate(-50%, 75%); /* rotation and positioning */
}

.buttons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 20px;

    cursor: default;
}

.menu {
    position: relative;

    min-width: 50px;
    width: 30%;
    max-width: 150px;
    height: 100%;
    float: left;

    color: white;
}
.menu img.icon {
    width: 24px;
    height: 24px;
    float: left;
}
.menu .item.active {
    background-color: #F3ECEF;
    border-radius: 23px;
}
.menu .item {
    padding: 10px;
    height: 24px;
}
.menu .item p {
    float: left;
    margin: 0;
    padding: 0;
    line-height: 24px;
    margin-left: 15px;
}

.menu ~ .child {
    border-top-left-radius: 23px;
    border-bottom-left-radius: 0;
}

.child {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    
    background-color: #F3ECEF;

    border-bottom-right-radius: 13px;
    border-bottom-left-radius: 13px;
}

.container {
    flex-grow: 1;
    display: flex;
}

.header {
    position: relative;
    height: 7%;
    width: 100%;
    min-height: 40px;
    max-height: 150px;

    cursor: grab;
    user-select: none;
}

.header .title {
    mix-blend-mode: difference;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    margin: 0;
    padding: 0;

    pointer-events: none;
}

.buttons>span {
    display: inline-block;

    width: 12px;
    height: 12px;
    background-color: gray;

    margin-right: 7px;

    cursor: pointer;

    border-radius: 100%;
}

span.close {
    background-color: #FF6052;
}

span.min {
    background-color: #FFBE05;
}

span.max {
    background-color: #15CC37;
}
</style>