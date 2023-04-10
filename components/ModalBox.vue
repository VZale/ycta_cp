<template>
  <div class="modal">
      <h2 class="title">{{title}}</h2>
      <span class="material-icons">close</span>
      <slot #modalContent/>
  </div>
</template>

<script>
export default {
  name: "ModalBox",
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
