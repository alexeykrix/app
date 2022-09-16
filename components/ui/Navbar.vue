<template>
  <div class="navbar">
    <button class="navbar__btn btn">
      <img class="btn__icon btn__icon-search" src="../../static/ic-search.svg" alt="">
    </button>
    <button class="navbar__btn btn">
      <img class="btn__icon" src="../../static/ic-heart.svg" alt="">
    </button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  width: 100%;
  background: #000;
  border-top: 0.1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.btn {
  padding: 5px;
  height: 40px;
  &__icon {
    width: 30px;
    height: 30px;
    &-search {
      width: 25px;
      height: 25px;
    }
  }
}
</style>