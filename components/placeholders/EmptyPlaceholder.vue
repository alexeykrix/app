<template>
  <div class="placeholder placeholder-empty">
    <h2 class="h2">Ooops..</h2>
    <p class="description p">It seems to be the last recipe</p>
    <button class="btn p">find more</button>
  </div>
</template>

<script>
export default {
  name: 'EmptyPlaceholder',
}
</script>

<style lang="scss" scoped>
.placeholder {
  min-height: 343px;
  width: 100%;
  margin: 0 auto;
  border-radius: 17px;
  box-shadow: inset 0 0 0px 1px #000, 0 0 0px 1px #000;
  border-radius: 17px;    
  background: rgb(41 41 41 / 84%);
  backdrop-filter: contrast(23) blur(28px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .h2 {
    margin-top: auto;
  }

  .description {
    margin-top: 20px;
    color: #d3d3d3;
    margin-bottom: -16px;
  }
}

.btn {
  margin-top: auto;

  border-radius: 0 0 17px 17px ;
  width: 100%;
  padding: 16px;
  text-transform: uppercase;
  color: #000;
  background: #d3d3d3;
  border: none;
}
</style>