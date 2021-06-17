<template>
    <div class="container">
        <div class="left">
            <div class="menu">
                <div class="item" v-for="(v, i) in cookie" :key="i" v-bind:class="{'active': (i == active)}" @click.stop="update(i)">
                    <h3>{{v.user}}</h3>
                    <p>{{v.content[v.content.length-1].message}}</p>
                </div>
            </div>
        </div>
        <div class="right">
            <h3>{{cookie[active].user}}</h3>
            <div class="conv">
                <div class="item" :class="{'incoming': v.incomming, 'outgoing': v.outgoing}" v-for="(v, i) in cookie[active].content" :key="i">
                    <p>{{v.message}}</p>
                </div>
            </div>
            <div class="send">
                <p contenteditable="true" aria-placeholder="Type something here" @keydown="enter"></p>
                <button type="submit" @click.stop="send">Send</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "sms",
    props: {
        extra: Proxy
    },
    components: {
    },
    methods: {
        newMessage(message) {
            var active = this.cookie[this.active]
            active.content.push({
                outgoing: true,
                message
            })
            this.$cookie.setCookie('sms', JSON.stringify(this.cookie))
        },
        update(i) {
            this.active = i
        },
        send(ev) {
            var p = ev.target.previousSibling

            var text = p.innerText

            if(text == "" && !text) return

            p.innerText = ""

            this.newMessage(text)
        },
        enter(ev) {
            if(ev.code == "Enter") {
                if(ev.target.innerText == "") return ev.preventDefault();
                this.newMessage(ev.target.innerText)
                ev.target.innerText = ""
                return ev.preventDefault();
            }
        }
    },
    data() {
        var cookie = this.$cookie
        var sms = cookie.getCookie('sms')
        var active = 0
        if(sms == null) {
            cookie.setCookie('sms', JSON.stringify([
                {
                    'user': "Tazio de Bruin",
                    'content': [
                        {
                            outgoing: true,
                            message: 'Heb jij dit gemaakt?'
                        }, 
                        {
                            incomming: true,
                            message: 'Yes i did :)'
                        },
                        {
                            incomming: true,
                            message: 'wacht hoe message ik naar mijzelf?'
                        }
                    ]
                },
                {
                    'user': "Beau Vroegh",
                    'content': [
                        {
                            incomming: true,
                            message: 'wassap bro'
                        },
                        {
                            outgoing: true,
                            message: 'wassap broski'
                        },
                        {
                            incomming: true,
                            message: 'check ff mn sollicitatie brief'
                        },
                        {
                            outgoing: true,
                            message: 'meer alinia\'s'
                        },
                        {
                            incomming: true,
                            message: 'moet toch n korte tekst zijn'
                        },
                        {
                            incomming: true,
                            message: '?'
                        },
                        {
                            outgoing: true,
                            message: 'je moet wel motivatie etc erin hebben'
                        },
                        {
                            incomming: true,
                            message: 'okay'
                        },
                        {
                            incomming: true,
                            message: 'zal ik doen'
                        },
                        {
                            outgoing: true,
                            message: 'love'
                        },
                    ]
                },
                {
                    'user': "Jake Posthouwer",
                    'content': [
                        {
                            incomming: true,
                            message: 'Yoo bro'
                        },
                        {
                            outgoing: true,
                            message: 'wassap bro'
                        },
                        {
                            incomming: true,
                            message: 'kan je me helpen met mn opdarcht'
                        }, 
                        {
                            outgoing: true,
                            message: 'tuurlijk gap, wat is het probleem?'
                        },
                        {
                            incomming: true,
                            message: 'ik probeer wat met Three.js te doen maar werkt dat eigenlijk'
                        },
                        {
                            incomming: true,
                            message: 'het idee is om dan een persoon rond te laten draaien met text etc'
                        },
                        {
                            outgoing: true,
                            message: 'jaman da kan, ts alleen misschien irritant om de posities nzo te krijgen maar het kan wel ja'
                        },
                        {
                            incomming: true,
                            message: 'less goo, thanks gap'
                        },
                        {
                            outgoing: true,
                            message: 'zullen we deze vrijdag met de boys naar n restaurant ofzo na examens?'
                        },
                        {
                            incomming: true,
                            message: 'is goed man, moet alleen nog ff kijke want heb wel ervoor nog wat'
                        },
                        {
                            outgoing: true,
                            message: 'top, laat maar weten hoelaat je komt dan gaan wij alvast zitten n wa drinken'
                        },
                        {
                            incomming: true,
                            message: 'no worries'
                        },
                        {
                            outgoing: true,
                            message: 'love'
                        }
                    ]
                },
                {
                    user: 'Will Smith',
                    content: [
                        {
                            incomming: true,
                            message: "You are doing great stuff with designing, coding!"
                        },
                        {
                            incomming: true,
                            message: "Don't build a wall, place a brick as good as you can and soon you will have a wall"
                        }
                    ]
                }
            ]))
            sms = cookie.getCookie('sms')
        }
        sms = JSON.parse(sms)

        if(this.extra) {
            var extra = JSON.parse(this.extra)
            if(extra.id) active = extra.id
        }

        return {
            cookie: sms,
            active
        }
    },
    mounted() {
    },
    beforeUnmount() {
    }
}
</script>

<style scoped>
.container {
    display: flex;
    position: relative;
}
.left {
    width: 25%;
    max-width: 400px;
    min-width: 250px;
    
    background-color: rgba(71, 71, 71, 0.34);
    backdrop-filter: blur(16px) brightness(115%);

    border-bottom-left-radius: 13px;
    border-top-left-radius: 13px;
}

.menu {
    padding-top: 20% !important;
    padding: 0 10px;
    overflow-x: hidden;
    overflow-y: auto;

    max-height: 500px;
}

.menu::-webkit-scrollbar {
    display: none;
}

.item {
    margin-bottom: 10px;
    background-color: white;
    padding: 5px 10px;

    border-radius: 13px;

    cursor: pointer;
}

.item.active {
    background-color: #C9C9C9;
}

.item.active h3 {
    color: white;
}

.item * {
    pointer-events: none;
    user-select: none;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.item:last-child {
    margin-bottom: 0;
}

.item h3 {
    margin: 0;
    color: black;

    cursor: pointer;
}

.item p {
    margin: 3px 0;
    color: #787878;
    margin-left: 30px;

    font-size: 13px;

    cursor: pointer;
}

.item .add {
    text-align: center;
    font-size: 25px;
    color: black;
    margin-left: 0;
}

/* ------------ */
.conv {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-25%);

    padding-top: 75px;

    max-height: 375px;
    width: 500px;
    overflow-x: hidden;
    overflow-y: auto;
}

.conv::-webkit-scrollbar {
    display: none;
}

.right h3 {
    font-weight: bold;
    font-style: italic;
    color: black;
    font-size: 30px;
    margin-top: 0;
}

.right {
    background-color: #F3ECEF;

    flex-grow: 1;
    border-bottom-right-radius: 13px;
    border-top-right-radius: 13px;

    padding: 20px;
    padding-top: 40px;
}

.right .item {
    width: 100%;
    padding: 0;
    background-color: transparent;
    display: inline-block;
    cursor: default;
}

.right .item p {
    margin: 0;
    width: fit-content;
}

.right p {
    padding: 10px 20px;
    border-radius: 25px;
}

.item.incoming {
    display: inline-block;
}
.item.incoming p {
    color: black;
    background-color: white;
}

.item.outgoing p {
    background-color: blue;
    color: white;
    font-weight: 300;
    text-align: right;

    float: right;
}
/* ------------- */

.send {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-25%);

    width: 500px;
}

.send p {
    width: 80%;

    background-color: white;
    color: #787878;
    border: 1px solid #787878;
    border-radius: 25px;

    float: left;
    margin: 0;
    padding: 5px 10px;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.send button {
    display: inline-block;

    float: right;
    padding: 5px 10px;

    border: 2px solid rgb(166, 255, 200);
    border-radius: 25px;
    background-color: transparent;
    /* width: 10%; */
    height: 100%;

    cursor: pointer;
}
</style>