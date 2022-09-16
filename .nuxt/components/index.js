export const Chips = () => import('../..\\components\\Chips.vue' /* webpackChunkName: "components/chips" */).then(c => wrapFunctional(c.default || c))
export const RecipeCard = () => import('../..\\components\\RecipeCard.vue' /* webpackChunkName: "components/recipe-card" */).then(c => wrapFunctional(c.default || c))
export const SearchReults = () => import('../..\\components\\SearchReults.vue' /* webpackChunkName: "components/search-reults" */).then(c => wrapFunctional(c.default || c))
export const PlaceholdersEmptyPlaceholder = () => import('../..\\components\\placeholders\\EmptyPlaceholder.vue' /* webpackChunkName: "components/placeholders-empty-placeholder" */).then(c => wrapFunctional(c.default || c))
export const UiNavbar = () => import('../..\\components\\ui\\Navbar.vue' /* webpackChunkName: "components/ui-navbar" */).then(c => wrapFunctional(c.default || c))
export const UiSearch = () => import('../..\\components\\ui\\UiSearch.vue' /* webpackChunkName: "components/ui-search" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
