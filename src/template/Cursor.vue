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
<style>
    .cursor {
      position: fixed; width: 12px; height: 12px;
      background: var(--gold); border-radius: 50%;
      pointer-events: none; z-index: 9999;
      transform: translate(-50%,-50%);
      transition: width .3s, height .3s;
      mix-blend-mode: difference;
      z-index: 100000000000000000000;
    }
    .cursor-ring {
      position: fixed; width: 36px; height: 36px;
      border: 1px solid var(--gold); border-radius: 50%;
      pointer-events: none; z-index: 9998;
      transform: translate(-50%,-50%);
      transition: transform .15s ease;
      opacity: .5;
      z-index: 100;
    }
</style>

<script>

export default {

  data() {

    return {

      x: 0,
      y: 0

    }

  },

  mounted() {

    window.addEventListener(
      'mousemove',
      this.handleMouseMove
    );

  },

  beforeUnmount() {

    window.removeEventListener(
      'mousemove',
      this.handleMouseMove
    );

  },

  methods: {

    handleMouseMove(e) {

      this.x = e.clientX;
      this.y = e.clientY;

    }

  }

}

</script>
