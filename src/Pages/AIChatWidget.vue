
<template>

  <!-- FLOAT BUTTON -->
  <button
    class="ai-float-btn"

    @click="toggleChat"
  >

    <img src="/Frontend/assets/Logo.png" alt="">

  </button>

  <!-- CHATBOX -->
  <div
    v-if="showChat"
    class="ai-chatbox"
  >

    <!-- HEADER -->
    <div class="chat-header">

      <div>

        <h3>

          Synel AI

        </h3>

        <p>

          AI Coffee Assistant

        </p>

      </div>

      <button
        class="close-btn"

        @click="toggleChat"
      >

        ✕

      </button>

    </div>

    <!-- BODY -->
    <div class="chat-body">

      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'chat-message',

          msg.role
        ]"
      >

        {{ msg.text }}

      </div>

    </div>

    <!-- INPUT -->
<div class="chat-input">
  <textarea
    v-model="message"
    placeholder="Tanya kopi favoritmu..."
    @keyup.enter.exact.prevent="sendMessage"
    rows="1"
  ></textarea>
  <button @click="sendMessage">Send</button>
</div>

  </div>

</template>

<script>
import axios
from '../api'
import {

  useAuthStore

}

from '../stores/auth'
export default {

  data() {

    return {

      showChat: false,

      message: '',

      messages: [

        {

          role: 'ai',

          text:
            'Halo ☕ Aku Synel AI. Mau rekomendasi kopi apa hari ini?'

        }

      ],
      authStore:
        useAuthStore()

    }

  },

  methods: {

    toggleChat() {

      this.showChat =
        !this.showChat

    },
async sendMessage() {

  if (!this.message) return

  // USER MESSAGE
  this.messages.push({

    role: 'user',

    text: this.message

  })

  // SIMPAN INPUT
  const userMessage =
    this.message

  // RESET INPUT
  this.message = ''

  // LOADING MESSAGE
  this.messages.push({

    role: 'ai',

    text:
      '☕ Synel AI sedang berpikir...'

  })

  try {

    const response =
      await axios.post(

       'https://synelcoffebackend-production.up.railway.app/api/ai-chat',

       { message: userMessage, email: this.authStore.user?.email }

      )

    // GEMINI RESPONSE
const aiReply =

response.data.reply

    // HAPUS LOADING
    this.messages.pop()

    // PUSH AI
    this.messages.push({

      role: 'ai',

      text: aiReply

    })

  }

  catch(error) {

    console.log(error)

    this.messages.pop()

    this.messages.push({

      role: 'ai',

      text:
        'Maaf ☕ Synel AI sedang error.'

    })

  }

}

  }

}

</script>

<style scoped>

/* FLOAT BUTTON */

.ai-float-btn {

  position: fixed;

  right: 30px;

  bottom: 30px;

  width: 72px;

  height: 72px;

  border-radius: 50%;

  border: none;

  background:
    linear-gradient(

      135deg,

      #d4a853,

      #f3d18b

    );

  color: #050301;

  font-size: 28px;

  cursor: pointer;

  z-index: 99;

  box-shadow:
    0 10px 40px
    rgba(212,168,83,0.4);

}

/* CHATBOX */

.ai-chatbox {
  position: fixed;
  right: 30px;
  bottom: 30px; /* Diubah agar nempel ke bawah atau sejajar float button */
  width: 380px;
  /* Gunakan vh agar responsif terhadap tinggi layar */
  height: calc(100vh - 60px); 
  background: rgba(18, 10, 5, 0.98);
  border: 1px solid rgba(212, 168, 83, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  /* KRITIKAL: Naikkan z-index agar di atas segalanya */
  z-index: 9999; 
  
  /* Opsional: Tambahkan animasi agar munculnya halus */
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* HEADER */

.chat-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 20px;

  border-bottom:
    1px solid
    rgba(255,255,255,0.06);

}

.chat-header h3 {

  color: var(--cream);

}

.chat-header p {

  color:
    rgba(240,223,200,0.5);

  font-size: 12px;

}

/* BODY */

.chat-body {

  flex: 1;

  overflow-y: auto;

  padding: 20px;

  display: flex;

  flex-direction: column;

  gap: 14px;

}

/* MESSAGE */

.chat-message {

  max-width: 80%;

  padding:
    12px 16px;

  line-height: 1.6;

}

.chat-message.user {

  align-self: flex-end;

  background:
    #d4a853;

  color: #050301;

}

.chat-message.ai {

  align-self: flex-start;

  background:
    rgba(255,255,255,0.06);

  color: white;

}

/* INPUT */

.chat-input {
  display: flex;
  align-items: flex-end; /* Tombol send tetap di bawah saat textarea meninggi */
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: transparent;
}

.chat-input textarea {
  flex: 1;
  border: none;
  background: transparent;
  padding: 18px;
  color: white;
  resize: none; /* User tidak bisa tarik manual ukurannya */
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  max-height: 150px; /* Batas tinggi maksimal sebelum muncul scrollbar */
  overflow-y: auto;
}

/* HILANGKAN BORDER SAAT DIKLIK */
.chat-input textarea:focus {
  outline: none;
  border: none;
  box-shadow: none;
}


.chat-input button {

  width: 90px;

  border: none;

  background: #d4a853;

  color: #050301;

  font-weight: 700;

}

.close-btn {

  background: none;

  border: none;

  color: white;

  cursor: pointer;

}
</style>
