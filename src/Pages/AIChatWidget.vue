<template>
<button 
    v-if="!showChat" 
    class="ai-float-btn" 
    :class="{ 'is-shifted': isShifted }"
    @click="toggleChat"
  >
    <img :src="logoUrl" alt="Logo" />
  </button>

  <div v-if="showChat" class="ai-chatbox" :class="{ 'is-shifted': isShifted }">
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
        placeholder="Tanya kopi favoritmu..."
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
  props: {
    isShifted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Pastikan path ini sesuai dengan struktur folder kamu
      logoUrl: new URL('../../assets/Logo.png', import.meta.url).href,
      showChat: false,
      message: '',
      messages: [
        {
          role: 'ai',
          text: 'Halo ☕ Aku Synel AI. Mau rekomendasi kopi apa hari ini?'
        }
      ],
    }
  },
  computed: {
  
    authStore() {
      return useAuthStore();
    }
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
      if (this.showChat) {
        this.scrollToBottom();
      }
    },
    // Menyesuaikan tinggi textarea agar teks turun ke bawah (pindah baris)
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
      
      // Tambah pesan user
      this.messages.push({ role: 'user', text: userMessage });
      
      // Reset input teks dan tingginya
      this.message = '';
      if (this.$refs.inputResizer) {
        this.$refs.inputResizer.style.height = 'auto';
      }

      this.scrollToBottom();

      // Animasi Loading
      this.messages.push({ role: 'ai', text: '☕ ........' });

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
        console.error("Chat Error:", error);
        this.messages.pop();
        this.messages.push({ role: 'ai', text: 'Maaf ☕ Synel AI sedang error.' });
      } finally {
        this.scrollToBottom();
      }
    },
    // Selalu scroll ke pesan terbaru
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
.ai-float-btn, .ai-chatbox {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.ai-float-btn.is-shifted {
  bottom: 160px; /* Naik di atas cart-floater */
}
.ai-chatbox.is-shifted {
  bottom: 160px;
  height: calc(100vh - 190px); /* Sesuaikan tinggi agar tidak keluar layar */
}
/* FLOAT BUTTON */
.ai-float-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #d4a853, #f3d18b);
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 10px 40px rgba(212,168,83,0.4);
  
  /* Posisi Foto di Tengah Sempurna */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}

.ai-float-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Foto tajam dan penuh */
}

/* CHATBOX */
.ai-chatbox {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 380px;
  height: calc(100vh - 60px); 
  background: rgba(18, 10, 5, 0.98);
  border: 1px solid rgba(212, 168, 83, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 9999; /* Di atas header */
  animation: slideIn 0.3s ease-out;
  border-radius: 12px;
  overflow: hidden; /* Mencegah elemen keluar jalur */
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
.chat-header h3 { color: #d4a853; margin: 0; font-size: 1.2rem; }
.chat-header p { color: rgba(240,223,200,0.5); font-size: 12px; margin: 0; }

/* BODY (Hanya Scroll Vertikal) */
.chat-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* No horizontal scroll */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;
}

/* PESAN (Teks turun ke bawah) */
.chat-message {
  max-width: 85%;
  padding: 12px 16px;
  line-height: 1.5;
  border-radius: 12px;
  font-size: 14px;
  white-space: pre-wrap; /* Mengikuti baris baru */
  word-break: break-word; /* Memaksa teks panjang turun */
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

/* INPUT AREA (No Focus Border) */
.chat-input {
  display: flex;
  align-items: flex-end;
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
  overflow-x: hidden;
}

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
  transition: opacity 0.2s;
}

.chat-input button:hover {
  opacity: 0.9;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
}
</style>