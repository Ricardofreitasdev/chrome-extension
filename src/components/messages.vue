<template>
  <div v-if="notification" class="messages">
    <span>{{ notification }}</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "AppMessages",
  setup() {
    const store = useStore();
    const notification = computed(() => store.state.notification);
    return {
      notification,
    };
  },
};
</script>

<style lang="scss">
.messages {
  font-size: 14px;
  text-align: center;
  background: #0d1117;
  opacity: 0.95;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 5px;
  z-index: 1;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:empty) {
    margin: 0;
  }
}
</style>
