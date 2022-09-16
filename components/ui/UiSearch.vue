<template>
  <div class="search" ref="header">
    <input 
      class="search__input" 
      type="text" 
      v-model="search"
      placeholder="Type your search" 
      @input="$emit('model', search)"
    >
    <button class="search__btn" @click="$emit('search')"></button>
  </div>
</template>

<script>
export default {
  name: 'UiSearch',
  data() {
    return {
      search: '',
      lastScroll: 0,
      changeScroll: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      const currentScroll = window.pageYOffset;
      const header = this.$refs.header;
      if (currentScroll > 80) {
        header.style.transform = "translateY(-100%)";
      } else if (currentScroll < 80) {
        header.style.position = "absolute";
        header.style.transform = "translateY(0px)";
      }

      if (currentScroll > 0 && currentScroll < this.lastScroll) {
        header.style.position = "fixed";
        header.style.transform = "translateY(0px)";
        this.changeScroll = true;
      } else {
        this.changeScroll = false;
      }

      this.lastScroll = currentScroll;
    },
  },
}
</script>

<style scoped lang="scss">
.search {
  background: linear-gradient(90deg, rgba(131, 131, 131, 0.25) 0%, rgba(147, 147, 147, 0.25) 100%);
  backdrop-filter: blur(4px);
  border-radius: 17px;
  display: flex;
  margin-bottom: 16px;
  transition: all 0.3s ease 0s;
  transform: translateY(0px);
  z-index: 2005;
  width: 343px;
  position: fixed;
  top: 16px;
  left: calc(50% - 171.5px);

  &__input {
    color: #f3f3f3;
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    background: transparent;
    max-width: 100%;
    flex-grow: 1;
    height: 40px;
    border: none;
    padding-left: 16px;
  }
  &__btn {
    background: no-repeat url('@/static/ic-search.svg') center/20px;
    width: 40px;
    height: 40px;
    border: none;
    flex-shrink: 0;
  }
}
</style>