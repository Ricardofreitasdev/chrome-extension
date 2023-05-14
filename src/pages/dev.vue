<template>
  <h3>EasyCheckout Ambientes</h3>
  <p class="item">
    <a @click="changeUrl('dev')">Desenvolvimento</a>
  </p>
  <p class="item">
    <a @click="changeUrl('tmk')">TMK</a>
  </p>
  <hr />
  <p class="item">
    <a @click="changeUrl('com1')">Commerce 1</a>
  </p>
  <p class="item">
    <a @click="changeUrl('com2')">Commerce 2</a>
  </p>
  <p class="item">
    <a @click="changeUrl('exc2')">Exclusive</a>
  </p>
</template>

<script>
import { onMounted, ref } from "vue";
import { changeEnvironment, getStoreData } from "../google/browser";
import { useStore } from "vuex";
export default {
  name: "Dev",
  components: {},

  setup() {
    const currentUrl = ref("");
    const vuex = useStore();

    onMounted(async () => {
      const storeData = await getStoreData();
      currentUrl.value = storeData.currentUrl;
    });

    const changeUrl = async (env) => {
      const response = await changeEnvironment({
        currentUrl: currentUrl.value,
        environment: env,
      });

      vuex.commit("setNotification", response);
    };

    return {
      changeUrl,
      currentUrl,
    };
  },
};
</script>

<style>
h3 {
  margin-bottom: 15px;
}
</style>
