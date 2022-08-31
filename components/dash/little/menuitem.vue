<script>
export default {
  props: {
    menu: Object,
  },
};
</script>
<template>
  <NuxtLink
    v-if="!menu.sub"
    :to="menu.link"
    :class="[useRoute().path == menu.link && 'active', menu.sub && 'has-arrow']"
    class="waves-effect"
  >
    <i v-if="menu.icon" :class="menu.icon"></i>
    <span class="menu-item">{{ menu.text }}</span>
    <span
      v-if="menu.count"
      class="badge rounded-pill"
      :class="`bg-${menu.count.color}`"
      >{{ menu.count.int }}</span
    >
  </NuxtLink>
  <a v-else href="#" :class="menu.sub ? 'has-arrow' : ''" class="waves-effect">
    <i v-if="menu.icon" :class="menu.icon"></i>
    <span class="menu-item">{{ menu.text }}</span>
    <span
      v-if="menu.count"
      class="badge rounded-pill"
      :class="`bg-${menu.count.color}`"
      >{{ menu.count.int }}</span
    >
  </a>
</template>
