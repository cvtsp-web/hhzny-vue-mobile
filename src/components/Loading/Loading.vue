<template>
  <div class="loading-container" :class="{active:show,mask:mask}">
    <div class="loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  props: {
    show: {
      type: Boolean
    },
    mask: {
      type: Boolean
    }
  }
}
</script>
<style lang="scss" scoped>
  .loading-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    margin: 0;
    opacity: 0;
    visibility: hidden;
    transition: all .5s;
    .mask {
      background-color: hsla(0, 0%, 100%, .9)
    }
    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  .loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
    .circular {
      width: 42px;
      height: 42px;
      animation: loading-rotate 2s linear infinite;
    }

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2px;
      stroke: #20a0ff;
      stroke-linecap: round;
    }
  }

  @keyframes loading-rotate {
    to {
      transform: rotate(1turn)
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px
    }

    to {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px
    }
  }
</style>
