<template>
  <p class="chips" :class="{notAvailavle: !isAvailable}">
    {{ title }}
  </p>
</template>

<script>
export default {
  name: 'Chips',
  props: {
    isAvailable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped lang="scss">
.chips {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #f3f3f3;
  padding: 4px 17px 4px;
  background: #a0cb5c62;
  border-radius: 17px;
  width: fit-content;
  &.notAvailavle {
    background: #d137375f;
  }
}
</style>