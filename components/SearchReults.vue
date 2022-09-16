<!-- Please remove this file from your project -->
<template>
  <section class="container">
    <UiSearch @search="fetchRecipes()" @model="search = $event" />
    
    <div class="cards-container">
      <RecipeCard class="active-card" v-if="recipes && !lastScrolled"
        :class="{show: cardAnimation}"
        :img="recipes[cardId].image"
        :title="recipes[cardId].title"
        :usedIngredients="recipes[cardId].usedIngredients"
        :missedIngredients="recipes[cardId].missedIngredients"
        id="card"
        @touchstart.native="toucStartHandler($event)"
        @touchmove.native="toucMoveHandler($event)"
        @touchend.native="toucEndHandler($event)"
      />
      <RecipeCard class="next-card" :class="{show: showNextCard}" v-if="recipes && !lastRecipe"
        :img="recipes[backgroundCardId].image"
        :title="recipes[backgroundCardId].title"
        :usedIngredients="recipes[backgroundCardId].usedIngredients"
        :missedIngredients="recipes[backgroundCardId].missedIngredients"
        :secondaryCard="true"
      />
      <EmptyPlaceholder v-if="lastRecipe" />
    </div>
  </section>
</template>

<script>
import RecipeCard from './RecipeCard.vue';
import UiSearch from './ui/UiSearch.vue';
import EmptyPlaceholder from './placeholders/EmptyPlaceholder.vue';
export default {
    name: "SearchResults",
    components: { RecipeCard, UiSearch, EmptyPlaceholder },
    data() {
      return {
        recipes: null,
        cardId: 0,
        search: '',
        apiKey: '&apiKey=22d37f4ddb3649d1aa1ee372e930b27c',
        translateApi: '171a5d50ead88020c8a04c3468a822cbd4779d0c640784a1ddacae504ed7147b',
        cardAnimation: false,
        touch: {
          startX: null,
          startY: null,
          x: null,
          y: null,
          translate: 0,
        },
        showNextCard: false,
        backgroundCardId: 1,
        lastRecipe: false,
        lastScrolled: false,
      };
    },
    mounted() {
      fetch('/req.json')
        .then(r => r.json()).then(r => this.recipes = r)
    },
    computed: {
      queryString() {
        return this.search.split(' ').join(',+')
      },
    },
    methods: {
      toucStartHandler(e) {
        this.touch.startX = e.touches[0].screenX
        this.touch.startY = e.touches[0].screenY
        document.querySelector('#card').style.transition = 'none'
      },
      toucMoveHandler(e) {
        if (!this.touch.x) {
          this.touch.x = e.touches[0].screenX
          this.touch.y = e.touches[0].screenY
          return
        }
        this.touch.translate += e.touches[0].screenX-this.touch.x
        document.querySelector('#card').style.transform = `translateX(${this.touch.translate}px) rotate(${this.touch.translate/window.innerWidth*0.4 * 70}deg)`
        this.touch.x = e.touches[0].screenX
        this.touch.y = e.touches[0].screenY
        if (this.touch.x > this.touch.startX + window.innerWidth*0.2) {
          this.showNextCard = true
        } else if (this.touch.x < this.touch.startX - window.innerWidth*0.2) {
          this.showNextCard = true
        } else {
          this.showNextCard = false
        }
      },
      toucEndHandler(e) {
        const card = document.querySelector('#card')
        card.style.transition = '0.4s ease'
        if (this.touch.x > this.touch.startX + window.innerWidth*0.4) {
          card.style.transform = 'translateX(100vw)'
          this.resetCard(card, 200)
        } else if (this.touch.x < this.touch.startX - window.innerWidth*0.4) {
          card.style.transform = 'translateX(-100vw)'
          this.resetCard(card, 200)
        } else {
          card.style.transform = 'translateX(0)'
          this.showNextCard = false
        }
        this.touch = {
          startX: null,
          startY: null,
          x: null,
          y: null,
          translate: 0,
        }
      },
      resetCard(card, timeout = 0) {
        this.cardAnimation = true
        setTimeout(() => {
          this.cardAnimation = false
          if (this.recipes.length > this.cardId+1) {
            card.style.transition = 'none'
          }
          this.showNextCard = false
          if (this.recipes.length > this.cardId+2) this.backgroundCardId++
          else this.lastRecipe = true
          if (this.recipes.length > this.cardId+1) {
            this.cardId++
            card.style.transform = 'translateX(0)'
          } else {
            this.lastScrolled = true
          }
        }, timeout);
      },
       async fetchRecipes() {
        const translate = await this.translate()
        // const translate = this.search.split(' ').join(',+')
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ translate + this.apiKey }&number=20`)
            .then(r => r.json()).then(r => this.recipes = r)
      },
      async translate() {
        let result = null
        await fetch(`https://ai-translate.pro/api/${ this.translateApi }/ru-en`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({text: this.search.split(' ').join(',+')})
        } ).then(r => r.json()) .then(r => result = r.result)
        return await result
      }
    },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  height: -webkit-fill-available;
}

.cards-container {
  position: relative;
  max-width: 343px;
  margin: 0 auto;
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.active-card {
  position: absolute;
  z-index: 1;
  // top: 0;
  // left: 0;
}
.next-card {
  position: absolute;
  z-index: 0;
  // top: 0;
  // left: 0;
  opacity: 0.5;
  transform: scale(0.8);
  &.show {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
