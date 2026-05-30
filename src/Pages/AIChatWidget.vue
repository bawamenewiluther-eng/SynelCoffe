<template>
  <button class="ai-float-btn" @click="toggleChat">
    <img :src="logoUrl" alt="Synel Logo" />
  </button>

  <div v-if="showChat" class="ai-chatbox">
    <div class="chat-header">
      <div>
        <h3>Synel AI</h3>
        <p>AI Coffee Assistant</p>
      </div>
      <button class="close-btn" @click="toggleChat">✕</button>
    </div>

    <div class="chat-body" ref="chatBody">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['chat-message', msg.role]"
      >
        {{ msg.text }}
      </div>
    </div>

    <div class="chat-input">
      <textarea
        v-model="message"
        ref="inputResizer"
        placeholder="Apa kabar hari ini..."
        rows="1"
        @input="adjustHeight"
        @keyup.enter.exact.prevent="sendMessage"
      ></textarea>
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from '../api'
import { useAuthStore } from '../stores/auth'


export default {
  data() {
    return {
      logoUrl: new URL('../../assets/Logo.png', import.meta.url).href,
      showChat: false,
      message: '',
      messages: [
        {
          role: 'ai',
          text: 'Halo ☕ Aku Synel AI. Mau rekomendasi kopi apa hari ini?'
        }
      ],
      authStore: useAuthStore()
    }
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
      if (this.showChat) {
        this.scrollToBottom();
      }
    },
    // Fungsi agar textarea otomatis bertambah tinggi ke bawah
    adjustHeight() {
      const textarea = this.$refs.inputResizer;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    },
    async sendMessage() {
      if (!this.message.trim()) return;

      const userMessage = this.message;
      
      // Push pesan user
      this.messages.push({ role: 'user', text: userMessage });
      
      // Reset input dan tingginya
      this.message = '';
      if (this.$refs.inputResizer) {
        this.$refs.inputResizer.style.height = 'auto';
      }

      this.scrollToBottom();

      // Loading state
      this.messages.push({ role: 'ai', text: '☕ Synel AI sedang berpikir...' });

      try {
        const response = await axios.post(
          'https://synelcoffebackend-production.up.railway.app/api/ai-chat',
          { 
            message: userMessage, 
            email: this.authStore.user?.email 
          }
        );

        const aiReply = response.data.reply;
        this.messages.pop(); // Hapus pesan loading
        this.messages.push({ role: 'ai', text: aiReply });
      } catch (error) {
        console.error(error);
        this.messages.pop();
        this.messages.push({ role: 'ai', text: 'Maaf ☕ Synel AI sedang error.' });
      } finally {
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatBody;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
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
  background: linear-gradient(135deg, #d4a853, #f3d18b);
  cursor: pointer;
  z-index: 10000; /* Tetap di atas chatbox */
  box-shadow: 0 10px 40px rgba(212,168,83,0.4);
}
.ai-float-btn img { width: 40px; }

/* CHATBOX */
.ai-chatbox {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 380px;
  /* Menghitung tinggi agar menutupi area header */
  height: calc(100vh - 60px); 
  background: rgba(18, 10, 5, 0.98);
  border: 1px solid rgba(212, 168, 83, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 9999; /* Angka tinggi agar menutupi header */
  animation: slideIn 0.3s ease-out;
  border-radius: 12px;
  overflow: hidden;
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
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.chat-header h3 { color: #d4a853; margin: 0; }
.chat-header p { color: rgba(240,223,200,0.5); font-size: 12px; margin: 0; }

/* BODY */
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* MESSAGE BUBBLES */
.chat-message {
  max-width: 85%;
  padding: 12px 16px;
  line-height: 1.5;
  border-radius: 12px;
  font-size: 14px;
}
.chat-message.user {
  align-self: flex-end;
  background: #d4a853;
  color: #050301;
  border-bottom-right-radius: 2px;
}
.chat-message.ai {
  align-self: flex-start;
  background: rgba(255,255,255,0.08);
  color: white;
  border-bottom-left-radius: 2px;
}

/* INPUT AREA */
.chat-input {
  display: flex;
  align-items: flex-end; /* Tombol send tetap di bawah saat textarea meninggi */
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 10px;
}

.chat-input textarea {
  flex: 1;
  border: none !important;
  outline: none !important;
  background: transparent;
  padding: 12px;
  color: white;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  max-height: 120px;
  overflow-y: auto;
}

/* Menghilangkan border biru saat fokus */
.chat-input textarea:focus {
  box-shadow: none !important;
}

.chat-input button {
  padding: 12px 20px;
  border: none;
  background: #d4a853;
  color: #050301;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
</style>