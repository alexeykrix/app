<template>
  <section class="main">
    <SearchReults />
    <Navbar />
  </section>
</template>

<script>
import SearchReults from '../components/SearchReults.vue';
import Navbar from '../components/ui/Navbar.vue';
export default {
    name: "IndexPage",
    components: { SearchReults, Navbar }
}
</script>
<style lang="scss">
@import "@/assets/main.scss";

.main {
  background: #000;
  height: 100%;
  overflow: hidden;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
