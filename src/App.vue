<template>
  <div class="board">
    <Tabs>
      <template #tab-content-0>
        <Store />
      </template>
      <template #tab-content-1>
        <Settings />
      </template>
    </Tabs>
    <Messages />
    <p class="dev">
      <a
        href="https://github.com/Ricardofreitasdev"
        target="_blank"
        rel="noopener noreferrer"
        >Developer</a
      >
    </p>
  </div>
</template>

<script>
import Tabs from "./components/tabs.vue";
import Store from "./pages/store.vue";
import Settings from "./pages/settings.vue";
import Messages from "./components/messages.vue";

export default {
  components: {
    Tabs,
    Store,
    Settings,
    Messages,
  },
};
</script>

<style scoped>
.board {
  background: #0d1117;
  max-width: 300px;
  max-height: 400px;
  width: 400px;
  height: 400px;
  overflow-y: hidden;
  padding: 16px;
  position: relative;
}

.dev {
  text-align: center;
  font-size: 12px;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
