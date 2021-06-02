<template>
    <div id="sys-bottom" class="blurred">
        <div class="favorites">
            <div class="app" v-for="(v, i) in favorites" :key="i" @click.stop="open(i)">
                <img v-if="v.icon" :src="v.icon" alt="Icon" :title="v.title">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Bottom",
    props: {
        ActiveApps: Array,
        favorites: Array
    },
    methods: {
        open(...obj) {
            this.$emit('open', ...obj)
        }
    },
    mounted() {
        console.log(this.favorites);
    }
}
</script>

<style scoped>
#sys-bottom {
    position: absolute;
    left: 50%;
    bottom: 7px;
    transform: translateX(-50%);

    width: 40vw;
    height: 74px;

    padding: 0 19px;

    border: 1px solid #707070;
    border-radius: 17px;
}

.favorites .app,
.favorites {
    position: relative;
    display: inline-block;

    cursor: pointer;
}

.favorites .app img {
    position: relative;
    width: 70px;
    height: 70px;
}
</style>