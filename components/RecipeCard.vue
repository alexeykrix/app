<template>
  <div class="recipe-card"
    :style="`background: no-repeat url(${img}) center/cover;`"
    :class="{secondaryCard: secondaryCard}"
  >
    <div class="recipe-card__inner">
      <img class="recipe-card__img" :src="img" :alt="title">
      <p class="recipe-card__title p">{{ title }}</p>

      <div class="chips-container">
        <Chips v-for="el in usedIngredients" :key="el.id" :title="el.name" />
        <Chips v-for="el in missedIngredients" :key="el.id" :title="el.name" :isAvailable="false" />
      </div>
    </div>
  </div>
</template>

<script>
import Chips from './Chips.vue';
export default {
    name: "RecipeCard",
    props: {
      img: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      secondaryCard: {
        type: Boolean,
        default: false,
      },
      usedIngredients: {
        type: Array,
        default: () => []
      },
      missedIngredients: {
        type: Array,
        default: () => []
      },
    },
    components: { Chips }
}
</script>

<style scoped lang="scss">
.recipe-card {
  transition: 0.4s ease;
  border-radius: 17px;
  margin-bottom: 16px;
  max-width: 343px;
  transform-origin: center bottom;
  &.secondaryCard {
    transform-origin: center center;
  }
  &__inner {
    box-shadow: inset 0 0 0px 1px #000, 0 0 0px 1px #000;
    border-radius: 17px;    
    background: rgb(41 41 41 / 84%);
    backdrop-filter: contrast(23) blur(28px);
    min-height: 600px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 16px;
  }
  &__img {
    width: 311px;
    height: 311px;
    border-radius: 17px;
    object-fit: cover;
  }
  &__title {
    
  }
  .chips-container {
    margin-top: auto;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
}
</style>