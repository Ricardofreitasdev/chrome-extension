<template>
  <div>
    <div v-if="isTray">
      <div v-for="(prop, key) in store" :key="key" class="item">
        <p v-if="prop.value">
          {{ prop.label }}:
          <b @click="copy(prop.value)">{{ limitString(prop.value) }}</b>
        </p>
      </div>
      <hr />
      <p class="item">
        <a @click="removeTheme">Remover Tema</a>
      </p>
      <p class="item">
        <a @click="removeExternalScripts">Remover Scripts Externos</a>
      </p>
      <hr />
      <p class="item">
        <a :href="sitemap" target="_blank">Sitemap</a>
      </p>
      <p class="item">
        <a :href="robots" target="_blank">Robots</a>
      </p>
    </div>
    <div v-else>Não parece ser uma loja tray</div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
  getStoreData,
  getStoreIntegrations,
  jsOff,
  layoutOff,
} from "../google/browser";
import { utils } from "../mixin/utils";
import { useStore } from "vuex";

export default {
  name: "Store",
  mixins: [utils],

  setup() {
    const store = ref({});
    const url = ref("");
    const isTray = ref(false);
    const vuex = useStore();

    onMounted(async () => {
      const storeData = await getStoreData();
      const storeIntegrations = await getStoreIntegrations();

      store.value = {
        id: { value: storeData.id, label: "loja" },
        session: { value: storeData.session, label: "Sessão" },
        gtm: { value: storeIntegrations.gtm, label: "Gtm" },
        ga4: { value: storeIntegrations.analyticsGa4, label: "Ga4" },
        ua: { value: storeIntegrations.analyticsUa, label: "UA" },
        pixel: { value: storeIntegrations.facebookPixel, label: "Pixel" },
      };

      url.value = storeData.url;
      isTray.value = storeData.isTray;
    });

    const sitemap = computed(() => {
      return `${url.value}/sitemap.xml`;
    });

    const robots = computed(() => {
      return `${url.value}/robots.txt`;
    });

    const limitString = (text) => {
      const limit = 20;
      if (text.length > limit) {
        return text.substring(0, limit) + "...";
      } else {
        return text;
      }
    };

    const removeTheme = async () => {
      const response = await layoutOff();
      vuex.commit("setNotification", response);
    };

    const removeExternalScripts = async () => {
      const response = await jsOff();
      vuex.commit("setNotification", response);
    };

    return {
      store,
      sitemap,
      robots,
      isTray,
      limitString,
      removeTheme,
      removeExternalScripts,
    };
  },
};
</script>

<style lang="scss">
code {
  font-family: monospace;
  font-size: 14px;
  margin: 10px;
}

.item {
  margin: 5px 0;
  font-size: 14px;
}
hr {
  border: 1px solid $bg-color-2;
  margin: 10px 0;
}

b {
  cursor: copy;
}
</style>
