<template>
  <div v-if="isEasy">
    <h3>EasyCheckout Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="easy in urlsEasy"
      :key="easy.environment"
      :environment="easy.environment"
      :text="easy.text"
    />
  </div>
  <div v-else-if="isCentral">
    <h3>Central Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="central in urlsCentral"
      :key="central.environment"
      :environment="central.environment"
      :text="central.text"
    />
  </div>
  <div v-else>Não existem recursos de dev nessa pagina</div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { getStoreData } from "../google/browser";
import AppEnvironmentLink from "../components/environment-link.vue";
export default {
  name: "Dev",
  components: {
    AppEnvironmentLink,
  },

  setup() {
    const currentUrl = ref("");

    const urlsEasy = reactive([
      { environment: "dev", text: "Desenvolvimento" },
      { environment: "tmk", text: "TMK" },
      { environment: "com1", text: "Commerce 1" },
      { environment: "com2", text: "Commerce 2" },
      { environment: "exc2", text: "Exclusive" },
    ]);

    const urlsCentral = reactive([
      { environment: "devCentral", text: "Desenvolvimento" },
      { environment: "tmkCentral", text: "TMK" },
      { environment: "stg1", text: "Staging 1" },
      { environment: "stg2", text: "Staging 2" },
      { environment: "stg3", text: "Staging 3" },
    ]);

    onMounted(async () => {
      const storeData = await getStoreData();
      currentUrl.value = storeData.currentUrl;
    });

    const isCentral = computed(() => currentUrl.value.includes("my-account"));
    const isEasy = computed(() => currentUrl.value.includes("checkout"));

    return {
      urlsEasy,
      urlsCentral,
      isCentral,
      isEasy,
    };
  },
};
</script>

<style lang="scss">
h3 {
  margin-bottom: 15px;
}
</style>
