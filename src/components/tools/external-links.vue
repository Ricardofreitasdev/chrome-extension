<template>
  <div>
    <p class="item">
      <a :href="pageSpeedUrl" target="_blank">Pagespeed</a>
    </p>
    <p class="item">
      <a :href="searchConsole" target="_blank">Search Console</a>
    </p>
    <p class="item">
      <a :href="whatsMyDns" target="_blank">Whats My Dns</a>
    </p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { utils } from '../../mixin/utils'
import { getStoreData } from '../../google/browser'
export default {
  name: 'AppExternalLinks',
  mixins: [utils],

  setup() {
    const url = ref('')
    const currentUrl = ref('')

    onMounted(async () => {
      const storeData = await getStoreData()
      url.value = storeData.url
      currentUrl.value = storeData.currentUrl
    })

    const pageSpeedUrl = computed(() => {
      return `http://developers.google.com/speed/pagespeed/insights/?url=${url.value}`
    })

    const searchConsole = computed(() => {
      return `https://search.google.com/test/rich-results?url=${currentUrl.value}`
    })

    const whatsMyDns = computed(() => {
      return `https://www.whatsmydns.net/#A/${url.value}`
    })

    return { pageSpeedUrl, searchConsole, whatsMyDns }
  },
}
</script>

<style></style>
