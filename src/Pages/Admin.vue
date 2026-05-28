<template>

  <section class="admin-page">

    <!-- HERO -->
    <div class="admin-hero">

      <div class="admin-badge">
        — Synel Coffee Dashboard
      </div>

      <h1>
        Menu
        <em>Management</em>
      </h1>

      <p>
        Kelola seluruh koleksi menu premium Synel Coffee
        secara realtime langsung dari dashboard.
      </p>

    </div>

    <!-- PANEL -->
    <div class="admin-panel">

      <div class="panel-glow"></div>

      <form
        class="admin-form"
       @submit.prevent="saveMenu"
      >

        <!-- NAME -->
        <div class="input-group">

          <label>
            Menu Name
          </label>

          <input
            v-model="form.name"
            type="text"
            placeholder="Espresso Classico"
            required
          >

        </div>

        <!-- CATEGORY -->
        <div class="input-group">

          <label>
            Category
          </label>

          <input
            v-model="form.category"
            type="text"
            placeholder="Espresso"
            required
          >

        </div>

        <!-- PRICE -->
        <div class="input-group">

          <label>
            Price
          </label>

      <input
        v-model="form.price"
        type="number"
        placeholder="32000"
        required
        min="0"
        @keydown="blockInvalidChar"
      />
        </div>

        <!-- DESCRIPTION -->
        <div class="input-group full">

          <label>
            Description
          </label>

          <textarea
            v-model="form.description"
            placeholder="Short premium description..."
          ></textarea>

        </div>

        <!-- FULL DESCRIPTION -->
        <div class="input-group full">

          <label>
            Full Description
          </label>

          <textarea
            v-model="form.full_description"
            placeholder="Detailed storytelling description..."
          ></textarea>

        </div>

        <!-- TEMP -->
        <div class="input-group">

          <label>
            Temperature
          </label>

          <select v-model="form.temperature">

            <option value="hot">
              Hot
            </option>

            <option value="cold">
              Cold
            </option>

            <option value="both">
              Hot & Cold
            </option>

          </select>

        </div>
        <div class="input-group full">

        <label>
          Coffee Image
        </label>

    <label class="upload-box">

      <input
        type="file"
        @change="handleImage"
        class="hidden-file"
      >

      <div class="upload-content">

        <div class="upload-icon">
          ☕
        </div>

        <div class="upload-text">

          <strong>
            Upload Coffee Image
          </strong>

          <span>
            JPG, PNG, WEBP
          </span>

        </div>

      </div>

    </label>

      </div>
        <!-- BUTTON -->
        <button
          type="submit"
          class="btn-submit"
        >

        {{ editingId ? '☕ Update Menu' : '☕ Add Premium Menu' }}

        </button>

      </form>
      <div class="menu-list">

  <div
    class="menu-item"
    v-for="menu in menus"
    :key="menu.id"
  >

<div class="menu-thumb">

  <img
    v-if="menu.image"
    :src="`http://localhost:8000/storage/${menu.image}`"
  >

  <div
    v-else
    class="coffee-fallback"
  >
    ☕
  </div>

</div>
    <div class="menu-info">

      <h3>
        {{ menu.name }}
      </h3>

      <p>
        {{ menu.category }}
      </p>

      <strong>
        Rp {{ menu.price }}
      </strong>

    </div>

    <div class="menu-actions">

      <button
        class="btn-edit"
        @click="editMenu(menu)"
      >
        Edit
      </button>
    </div>
    
      <button
        class="btn-delete"
        @click="openDelete(menu.id)"
      >
        Delete
      </button>

  </div>

</div>

    </div>

  </section>
<div
  v-if="deleteId"
  class="delete-overlay"
>

  <div class="delete-modal">

    <h2>
      Hapus Menu?
    </h2>

    <p>
      Produk akan dihapus permanen.
    </p>

    <div class="delete-actions">

      <button
        class="cancel-btn"
        @click="deleteId = null"
      >
        Batal
      </button>

      <button
        class="delete-btn"
        @click="confirmDelete"
      >
        Hapus
      </button>

    </div>

  </div>

</div>
<template>

  <!-- CURSOR -->
  <div
    class="cursor"
    :style="{
      left: x + 'px',
      top: y + 'px',
    }"
  ></div>

  <!-- CURSOR RING -->
  <div
    class="cursor-ring"
    :style="{
      left: x + 'px',
      top: y + 'px'
    }"
  ></div>

</template>
<div
  v-if="loading"
  class="loading-overlay"
>

  <div class="premium-loader">

    <div class="ring ring-1"></div>

    <div class="ring ring-2"></div>

    <div class="ring ring-3"></div>

    <div class="coffee-core">
      ☕
    </div>

  </div>

  <div class="loading-text">

    Tunggu Sebentar...

  </div>

</div>
<div
  v-if="toast.show"
  class="toast"
  :class="toast.type"
>

  <div class="toast-icon">

    {{
      toast.type === 'success'
        ? '☕'
        : '⚠'
    }}

  </div>

  <div class="toast-message">

    {{ toast.message }}

  </div>

</div>
</template>

<script setup>
import axios from '../axios'
import { ref, onMounted } from 'vue'
const menus = ref([])
const fetchMenus = async () => {

  try {

    const response = await axios.get(
      'http://localhost:8000/api/menus'
    )

    menus.value = response.data

  }

  catch (error) {

    console.log(error)

  }

}
onMounted(() => {

  fetchMenus()

})
const blockInvalidChar = (e) => {

  if (
    ['e', 'E', '+', '-', '.'].includes(e.key)
  ) {

    e.preventDefault()

  }

}

const imageFile = ref(null)
const handleImage = (event) => {

  imageFile.value =
    event.target.files[0]

}
const form = ref({

  name: '',

  category: '',

  price: '',

  description: '',

  full_description: '',

  temperature: 'hot',
  deleteId: null,
})
const editingId = ref(null)
const deleteId = ref(null)
const loading = ref(false)
const toast = ref({

  show: false,

  message: '',

  type: 'success'

})
const showToast = (

  message,
  type = 'success'

) => {

  toast.value = {

    show: true,

    message,

    type

  }

  setTimeout(() => {

    toast.value.show = false

  }, 2600)

}
const openDelete = (id) => {

  deleteId.value = id

}

const confirmDelete = async () => {

  try {
    loading.value = true
    await axios.delete(

      `http://localhost:8000/api/menus/${deleteId.value}`

    )

    deleteId.value = null

    fetchMenus()

  }

  catch (error) {

    console.log(error)

  }finally {
    loading.value = false
  }

}
const saveMenu = async () => {
  loading.value = true
  try {

    // ======================
    // UPDATE
    // ======================

if (editingId.value) {

  await axios.put(

    `http://localhost:8000/api/menus/${editingId.value}`,

    form.value

  )

  // ======================
  // UPLOAD NEW IMAGE
  // ======================

  if (imageFile.value) {

    const formData = new FormData()

    formData.append(
      'image',
      imageFile.value
    )

    formData.append(
      'menu_id',
      editingId.value
    )

    await axios.post(

      'http://localhost:8000/api/menus/upload-image',

      formData,

          {

            headers: {

              'Content-Type':
                'multipart/form-data'

            }

          }

        )

      }

      showToast(
        'Menu berhasil diupdate ☕',
        'success'
      )

    }

    // ======================
    // CREATE
    // ======================

    else {

      const response = await axios.post(

        'http://localhost:8000/api/menus',

        form.value

      )

      const menuId =
        response.data.menu.id

      // upload image
      if (imageFile.value) {

        const formData = new FormData()

        formData.append(
          'image',
          imageFile.value
        )

        formData.append(
          'menu_id',
          menuId
        )

        await axios.post(

          'http://localhost:8000/api/menus/upload-image',

          formData,

          {

            headers: {

              'Content-Type':
                'multipart/form-data'

            }

          }

        )

      }

      showToast(
        'Menu berhasil dibuat ☕',
        'success'
      )

    }

    // ======================
    // RESET FORM
    // ======================

    editingId.value = null

    form.value = {

      name: '',
      category: '',
      price: '',
      description: '',
      full_description: '',
      temperature: 'hot'

    }

    imageFile.value = null

    fetchMenus()

  }

  catch (error) {

    showToast(
      'Terjadi kesalahan',
      'error'
    )

  }finally {
    loading.value = false
    previewImage.value = null
  }

}
const editMenu = (menu) => {

  editingId.value = menu.id

  form.value = {

    name: menu.name,
    category: menu.category,
    price: menu.price,
    description: menu.description,
    full_description: menu.full_description,
    temperature: menu.temperature

  }

}

</script>

<style scoped>

.admin-page {

  min-height: 100vh;

  padding:
    170px 24px 120px;

  position: relative;

}

/* =========================
   HERO
========================= */

.admin-hero {

  max-width: 900px;

  margin:
    0 auto 70px;

  text-align: center;

}

.admin-badge {

  display: inline-block;

  margin-bottom: 26px;

  font-size: 10px;

  letter-spacing: 4px;

  text-transform: uppercase;

  font-family: 'Space Mono', monospace;

  color: var(--gold);

}

.admin-hero h1 {

  font-size: clamp(60px,8vw,110px);

  line-height: 0.95;

  font-family: 'Playfair Display', serif;

  margin-bottom: 24px;

  color: var(--cream);

}

.admin-hero h1 em {

  color: var(--gold);

  font-style: italic;

}
.hidden-file {

  display: none;

}
.admin-hero p {

  max-width: 700px;

  margin: auto;

  line-height: 1.9;

  color:
    rgba(240,223,200,0.62);

}

/* =========================
   PANEL
========================= */

.admin-panel {

  position: relative;

  max-width: 1100px;

  margin: auto;

  padding: 60px;


  background:
    rgba(255,255,255,0.03);

  border:
    1px solid
    rgba(212,168,83,0.12);

  backdrop-filter: blur(18px);

}

.panel-glow {

  position: absolute;
    pointer-events: none;
  width: 500px;
  height: 500px;

  top: -250px;
  right: -250px;

  border-radius: 50%;

  background:
    radial-gradient(
      rgba(212,168,83,0.18),
      transparent 70%
    );

}

/* =========================
   FORM
========================= */

.admin-form {

  position: relative;

  z-index: 2;

  display: grid;

  grid-template-columns:
    repeat(2,1fr);

  gap: 28px;

}

.input-group {

  display: flex;

  flex-direction: column;

  gap: 14px;

}

.input-group.full {

  grid-column: 1/-1;

}

.input-group label {

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  font-family: 'Space Mono', monospace;

  color: var(--gold);

}

.input-group input,
.input-group textarea,
.input-group select {

  width: 100%;

  background:
    rgba(255,255,255,0.04);

  border:
    1px solid
    rgba(212,168,83,0.1);

  padding:
    18px 22px;

  color: var(--cream);

  outline: none;

  transition: 0.35s ease;

}

.input-group textarea {

  min-height: 160px;

  resize: vertical;

}

.input-group input:focus,
.input-group textarea:focus,
.input-group select:focus {

  border-color:
    rgba(212,168,83,0.32);

  box-shadow:
    0 0 25px
    rgba(212,168,83,0.08);

}

/* =========================
   BUTTON
========================= */

.btn-submit {

  grid-column: 1/-1;

  height: 62px;

  border: none;

  background: var(--gold);

  color: var(--espresso);

  font-weight: 800;

  font-size: 12px;

  letter-spacing: 3px;

  text-transform: uppercase;

  transition: 0.35s ease;

}

.btn-submit:hover {

  transform:
    translateY(-3px);

  background:
    var(--gold-light);

  box-shadow:
    0 20px 40px
    rgba(212,168,83,0.22);

}
/* =========================
   FILE UPLOAD
========================= */



.upload-box {

  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

  min-height: 180px;

  border:
    1px dashed
    rgba(212,168,83,0.22);

  background:
    rgba(255,255,255,0.02);

  transition: 0.35s ease;

  overflow: hidden;

  cursor: pointer;

}

.upload-box::before {

  pointer-events: none;
  content: '';

  position: absolute;

  inset: 0;

  background:
    radial-gradient(
      circle at center,
      rgba(212,168,83,0.08),
      transparent 70%
    );

  opacity: 0;

  transition: 0.35s ease;

}

/* HOVER */

.upload-box:hover {

  border-color:
    rgba(212,168,83,0.45);

  transform:
    translateY(-2px);

  box-shadow:
    0 20px 50px
    rgba(212,168,83,0.08);

}

.upload-box:hover::before {

  opacity: 1;

}

/* CONTENT */

.upload-content {

  position: relative;

  z-index: 2;

  text-align: center;

}

.upload-icon {

  font-size: 48px;

  margin-bottom: 18px;

}

.upload-text strong {

  display: block;

  font-size: 13px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color: var(--cream);

  margin-bottom: 10px;

}

.upload-text span {

  font-size: 12px;

  color:
    rgba(240,223,200,0.45);

}

/* CURSOR */

.upload-box *,
.upload-box:hover *,
.upload-box:focus *,
.upload-box:active * {

  cursor: pointer !important;

}
.menu-list {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(320px, 1fr));

  gap: 24px;

  margin-top: 40px;

}
.menu-card {

  display: flex;

  gap: 20px;

  align-items: center;

  padding: 20px;

  border-radius: 24px;

  background:
    rgba(255,255,255,0.04);

  border:
    1px solid rgba(212,168,83,0.12);

  backdrop-filter: blur(18px);

  transition: 0.35s ease;

}

.menu-card:hover {

  transform: translateY(-4px);

  border-color:
    rgba(212,168,83,0.32);

}
.menu-item {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 24px;

  padding: 20px;

  background:
    rgba(255,255,255,0.03);

  border:
    1px solid
    rgba(212,168,83,0.1);

}

.menu-thumb {

  width: 110px;
  height: 110px;

  border-radius: 18px;

  overflow: hidden;

  flex-shrink: 0;

  background:
    linear-gradient(
      135deg,
      #2b1709,
      #1a0d06
    );

  display: flex;

  align-items: center;

  justify-content: center;

}

.menu-thumb img {

  width: 100%;
  height: 100%;

  object-fit: cover;

}

.menu-info {

  flex: 1;

}

.menu-info h3 {

  color: var(--cream);

  margin-bottom: 8px;

}

.menu-actions {

  display: flex;

  gap: 12px;

}

.btn-edit,
.btn-delete {

  border: none;

  padding: 12px 18px;

  cursor: pointer;

}

.btn-edit {

  background: var(--gold);

}

.btn-delete {

  background: #ff5b5b;

  color: white;

}
.coffee-fallback {

  font-size: 42px;

  opacity: 0.7;

}
.delete-overlay {

  position: fixed;

  inset: 0;

  background:
    rgba(0,0,0,0.72);

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 9999;
  isolation: isolate;



}

.delete-modal {

  width: 100%;

  max-width: 420px;

  padding: 40px;

  border-radius: 28px;

  background:
    rgba(20,10,5,0.96);

  border:
    1px solid rgba(212,168,83,0.2);

  text-align: center;
  z-index:  99;

}

.delete-modal h2 {

  font-size: 32px;

  margin-bottom: 12px;

}

.delete-modal p {

  color:
    rgba(240,223,200,0.6);

  margin-bottom: 32px;

}

.delete-actions {

  display: flex;

  gap: 14px;

}

.cancel-btn,
.delete-btn {

  flex: 1;

  height: 54px;

  border: none;

  border-radius: 14px;

}

.cancel-btn {

  background:
    rgba(255,255,255,0.06);

  color: white;

}

.delete-btn {

  background: #ff5c5c;

  color: white;

  font-weight: 700;

}
.cancel-btn,
.delete-btn {

  transition:
    0.3s ease;

}

/* =========================
   CANCEL HOVER
========================= */

.cancel-btn:hover {

  background:
    rgba(255,255,255,0.12);

  transform:
    translateY(-2px);

  box-shadow:
    0 10px 24px
    rgba(0,0,0,0.22);

}

/* =========================
   DELETE HOVER
========================= */

.delete-btn:hover {

  background:
    linear-gradient(
      135deg,
      #ff6b6b,
      #ff3b3b
    );

  transform:
    translateY(-2px)
    scale(1.03);

  box-shadow:
    0 14px 34px
    rgba(255,80,80,0.35);

}
.loading-overlay {

  position: fixed;

  inset: 0;

  background:
    rgba(7,5,3,0.82);

  backdrop-filter: blur(12px);

  z-index: 99;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

}

/* =========================
   LOADER WRAPPER
========================= */

.premium-loader {

  position: relative;

  width: 140px;

  height: 140px;

  display: flex;

  align-items: center;

  justify-content: center;

}

/* =========================
   RINGS
========================= */

.ring {

  position: absolute;

  border-radius: 50%;

  border-style: solid;

  animation:
    rotateLoader linear infinite;

}


/* OUTER */

.ring-1 {

  width: 140px;

  height: 140px;

  border-width: 2px;

  border-color:
    rgba(212,168,83,0.15);

  border-top-color:
    var(--gold);

  animation-duration: 2.4s;

  box-shadow:
    0 0 40px rgba(212,168,83,0.22);

}

/* MIDDLE */

.ring-2 {

  width: 104px;

  height: 104px;

  border-width: 2px;

  border-color:
    rgba(124,74,30,0.15);

  border-right-color:
    var(--caramel);

  animation-duration: 1.8s;

  animation-direction: reverse;

}

/* INNER */

.ring-3 {

  width: 72px;

  height: 72px;

  border-width: 2px;

  border-color:
    rgba(240,223,200,0.08);

  border-bottom-color:
    var(--cream);

  animation-duration: 1.2s;

}

/* =========================
   CENTER ICON
========================= */

.coffee-core {

  width: 54px;

  height: 54px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

  background:
    radial-gradient(
      circle,
      rgba(212,168,83,0.18) 0%,
      rgba(124,74,30,0.12) 100%
    );

  border:
    1px solid rgba(212,168,83,0.22);

  box-shadow:
    0 0 25px rgba(212,168,83,0.18);

  animation:
    pulseCoffee 2s ease-in-out infinite;

}

/* =========================
   TEXT
========================= */

.loading-text {

  margin-top: 28px;

  font-family: 'Space Mono', monospace;

  font-size: 11px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

  opacity: 0.82;

}

@keyframes rotateLoader {

  from {

    transform: rotate(0deg);

  }

  to {

    transform: rotate(360deg);

  }

}
/* Chrome, Safari, Edge */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {

  -webkit-appearance: none;
  margin: 0;

}

/* Firefox */
input[type="number"] {

  -moz-appearance: textfield;

}
/* =========================
   PREMIUM TOAST
========================= */

.toast {

  position: fixed;

  top: 32px;
  right: 32px;

  z-index: 99;

  min-width: 320px;

  padding: 18px 22px;

  border-radius: 20px;

  display: flex;

  align-items: center;

  gap: 16px;

  backdrop-filter: blur(18px);

  animation:
    toastSlide 0.45s ease;

}

/* SUCCESS */

.toast.success {

  background:
    linear-gradient(
      135deg,
      rgba(20,40,20,0.95),
      rgba(10,20,10,0.92)
    );

  border:
    1px solid
    rgba(80,220,120,0.22);

  box-shadow:
    0 20px 50px
    rgba(80,220,120,0.12);

}

/* ERROR */

.toast.error {

  background:
    linear-gradient(
      135deg,
      rgba(50,10,10,0.96),
      rgba(25,5,5,0.92)
    );

  border:
    1px solid
    rgba(255,90,90,0.22);

}

.toast-icon {

  width: 42px;
  height: 42px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background:
    rgba(255,255,255,0.06);

  font-size: 18px;

}

.toast-message {

  font-size: 13px;

  letter-spacing: 1px;

  color: var(--cream);

}

/* =========================
   ANIMATION
========================= */

@keyframes toastSlide {

  from {

    opacity: 0;

    transform:
      translateY(-20px)
      scale(0.96);

  }

  to {

    opacity: 1;

    transform:
      translateY(0)
      scale(1);

  }

}
@keyframes toastShake {

  0% {

    transform: translateX(0);

  }

  20% {

    transform: translateX(-8px);

  }

  40% {

    transform: translateX(8px);

  }

  60% {

    transform: translateX(-6px);

  }

  80% {

    transform: translateX(6px);

  }

  100% {

    transform: translateX(0);

  }

}
/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .admin-panel {

    padding: 32px;

  }

  .admin-form {

    grid-template-columns: 1fr;

  }

}

</style>