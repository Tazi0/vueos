<template>
    <div class="container">
        <div class="left">
            <div class="menu">
                <div class="item" v-for="(v, i) in cookie" :key="i" v-bind:class="{'active': (i == active)}" @click.stop="updateNote(i)">
                    <h3>{{v.title}}</h3>
                    <p>{{v.description}}</p>
                </div>
                <div class="item" @click.stop="newNote()">
                    <p class="add">+</p>
                </div>
            </div>
        </div>
        <div class="right">
            <editor-content class="title" :editor="title" />
            <editor-content class="text" :editor="editor" />
        </div>
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import Placeholder from '@tiptap/extension-placeholder'

export default {
    name: "Notes",
    props: {
    },
    components: {
        EditorContent
    },
    methods: {
        updateText() {
            var editor = this.editor
            const json = editor.getJSON()
            var data = json.content

            this.cookie[this.active].content = data
            this.$cookie.setCookie('notes', JSON.stringify(this.cookie))
        },
        updateTitle() {
            var editor = this.title
            const json = editor.getJSON()
            var data = json.content

            this.cookie[this.active].title = data[0].content[0].text
            this.$cookie.setCookie('notes', JSON.stringify(this.cookie))

        },
        updateNote(newActive) {
            this.active = newActive
            var active = this.cookie[this.active]
            this.editor.commands.setContent(active.content)
            this.title.commands.setContent(active.title)
        },
        newNote() {
            this.cookie.push({title: 'Example Title', content: null})
            this.$cookie.setCookie('notes', JSON.stringify(this.cookie))
            this.active = this.cookie.length-1
            var active = this.cookie[this.active]
            this.editor.commands.setContent(active.content)
            this.title.commands.setContent(active.title)
        }
    },
    data() {
        var cookie = this.$cookie
        var notes = cookie.getCookie('notes')
        if(notes == null) {
            cookie.setCookie('notes', JSON.stringify([
                {
                    'title': "Welkom",
                    'content': [{"type":"paragraph","content":[{"type":"text","text":"Welkom bij dit nieuwe systeem!"}]},{"type":"paragraph","content":[{"type":"text","text":"Het is gemaakt volledige met Vue.JS en met genoeg extensies"}]},{"type":"paragraph","content":[{"type":"text","text":"Gemaakt door Tazio de Bruin :)"}]}]
                },
                {
                    'title': "Wat kan je gebruiken?",
                    'content': [{"type":"paragraph","content":[{"type":"text","text":"Bij deze notities kan je meerdere styles gebruiken, zoals:"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Bold"},{"type":"text","text":" - Control/Cmd B of ** en __  aan beide kanten van waar je wilt"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"code"}],"text":"Code"},{"type":"text","text":" - Control/Cmd E of `"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Italic"},{"type":"text","text":" - Control/Cmd I of * en _"},{"type":"hardBreak"},{"type":"text","text":"Strike - Control/Cmd Shift X of ~~"}]}]
                },
            ]))
            notes = cookie.getCookie('notes')
        }
        notes = JSON.parse(notes)

        for (let i = 0; i < notes.length; i++) {
            const e = notes[i];
            var desc = ""
            if (e && e.content) {
                var m = e.content[0]
                for (let i = 0; i < 5; i++) {
                    if(m.text) {
                        desc = m.text
                    } else {
                        m = m?.content?.[0]
                    }
                }
            }
            notes[i].description = desc
        }

        return {
            editor: null,
            cookie: notes,
            active: 0
        }
    },
    mounted() {
        var content = this.cookie[this.active].content

        this.editor = new Editor({
            extensions: [
                StarterKit,
                Placeholder,
            ],
            onUpdate: this.updateText.bind(this)
        })

        this.title = new Editor({
            extensions: [
                StarterKit
            ],
            onUpdate: this.updateTitle.bind(this)
        })

        this.title.commands.setContent(this.cookie[this.active].title)
        this.editor.commands.setContent(content)
    },
    beforeUnmount() {
        this.editor.destroy()
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


.right {
    background-color: #F3ECEF;

    flex-grow: 1;
    border-bottom-right-radius: 13px;
    border-top-right-radius: 13px;

    padding: 20px;
    padding-top: 40px;
}

.right .title {
    margin-top: 0;
    margin-bottom: 50px;

    color: black;
    
    font-style: italic;
    font-size: 40px;
    font-weight: bold;
}
.title ::v-deep(.ProseMirror) * {
    margin: 0 !important;
}

.right p {
    word-break: break-all;
}

/* Text */
::v-deep(.ProseMirror) > * + * {
    margin-top: 0.75em;
}

.text ::v-deep(.ProseMirror) {
    min-height: 100px !important;
}

.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
}
</style>