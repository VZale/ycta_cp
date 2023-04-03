<template>
  <div class="view-content">
    <FilterView v-if="page==='filters'"/>
  </div>
</template>

<script>

export default {
  components: {
    FilterView: () => import('~/components/ViewsContent/FilterView')
  },
  props: {
    page: {
      type: String
    }
  },
  name: "Content"
}
</script>

<style scoped>
  .view-content {
    padding: 24px;
  }
</style>
