<template>
  <div>
    <div class="tab-buttons">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <div
      v-for="(tab, index) in tabs"
      v-show="activeTab === index"
      :key="index"
      class="tab-content"
    >
      <slot :name="tabName(index)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      activeTab: 0,
      tabs: ['Loja', 'Ferramentas'],
    }
  },

  methods: {
    tabName(index) {
      return `tab-content-${index}`
    },
  },
}
</script>

<style>
.tab-buttons {
  display: flex;
}
.tab-buttons button {
  background-color: #161b22;
  color: #7d8590;
  border: none;
  border: 2px solid #21262d;
  padding: 16px 24px;
  cursor: pointer;
  flex: 1;
}

.tab-buttons button.active {
  border-bottom: 2px solid #21262d;
  font-weight: bold;
  color: #2f81f7;
}

.tab-content {
  padding: 16px;
  background: #161b22;
  border: 2px solid #21262d;
  border-top: 0;
}
</style>
