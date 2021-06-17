<template>
    <div id="notifications">
        <div class="item blurred" v-for="(v, i) in not" :key="i" @click.stop="open(v.app, v.detail)">
            <img :src="getImg(v.app)" alt="image app">
            <div class="detail">
                <h2>{{v.title}}</h2>
                <p>{{v.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Notification",
    props: {
        Apps: Object,
        notfi: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    methods: {
        open(app, detail) {
            this.$emit('open', app, detail)
            this.remove(app)
        },
        getImg(app) {
            return this.Apps[app].icon
        },
        remove(app, all = true) {
            if(all) {
                this.not = this.not.filter(function(v){ 
                    return v.app !== app;
                });
            } else {
                for (let i = 0; i < this.not.length; i++) {
                    const e = this.not[i];
                    if(e.app === app) this.not.splice(i, 1)
                    break;
                }
            }
        }
    },
    data() {
        return {
            not: this.notfi
        }
    }
}
</script>

<style scoped>
#notifications {
    position: absolute;
    right: 10px;
    top: 10px;
}

.item {
    position: relative;
    
    width: 15vw;
    height: 74px;
    max-width: 200px;
    min-width: 100px;

    padding: 0 19px;
    margin-bottom: 15px;

    border-radius: 17px;

    cursor: pointer;
    user-select: none;
    z-index: 999;
}

.item * {
    pointer-events: none;
}

img {
    width: 50px;
    margin-top: calc((74px - 50px) / 2);
    float: left;
}

.detail {
    width: 65%;

    position: absolute;
    right: 5px;
    top: 15px;

    color: white !important;
}

h2, p {
    margin: 0;
    display: inline-block;

    max-width: 90%;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>