<script>
import SocketioService from './services/socketio.service.js';

export default {
    name: 'App',
    components: {
    },
    data() {
        return {
            token: 'user-'+ Date.now(),
            inputMessageText: '',
            messages: [],
        };
    },
    methods: {
    submitToken() {
        console.log(this.token);
        SocketioService.setupSocketConnection(this.token);
        SocketioService.subscribeToMessages((err, data) => {
            this.messages.push(data);
        });
    },
    submitMessage() {
        const CHAT_ROOM = "myRandomChatRoomId";
        const message = this.inputMessageText;
        SocketioService.sendMessage({message, roomName: CHAT_ROOM}, cb => {
            this.messages.push({
                message,
                ...{
                    id: this.token,
                    name: this.token,
                }
            })
        });
        this.inputMessageText = "";
    }
    },
    beforeUnmount() {
        SocketioService.disconnect();
    },
    beforeMount() {
        this.submitToken()
    },
}
</script>

<template>
    <div class="title-box">#General - You are {{ this.token }}</div>
    <div class="box">
        <div class="messages" style="overflow-y: scroll; height:400px;">
            <div v-for="user in messages" :key="user.id">
            {{user.name}}: {{user.message}}
            </div>
        </div>
        <div class="messages"></div>
        <form class="input-div" @submit.prevent="submitMessage">
            <input type="text" placeholder="Type in text" 
            v-model="inputMessageText" />
            <button type="submit">Submit</button>
        </form>
    </div>
</template>