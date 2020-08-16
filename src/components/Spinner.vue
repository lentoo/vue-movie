<template>
  <transition name="fade">
    <div class="spinner" v-if="show">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Spinner',
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    show() {
      console.log('show', this.show);
    }
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.spinner {
  width: 60px;
  height: 60px;
  margin: 100px auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #67cf22;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: bounce 2s infinite ease-in-out;
  animation: bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>