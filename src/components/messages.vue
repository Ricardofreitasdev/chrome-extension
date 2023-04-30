<template>
  <div v-if="notification" class="messages">
    <span>{{ notification }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AppMessages',
  setup() {
    const store = useStore()
    const notification = computed(() => store.state.notification)
    return {
      notification,
    }
  },
}
</script>

<style lang="scss">
.messages {
  font-size: 14px;
  display: flex;
  text-align: center;
  background: #0d1117;
  opacity: 0.95;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:empty) {
    margin: 10px 0;
  }
}
</style>
