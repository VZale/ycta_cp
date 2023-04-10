<template>
  <div class="categories">
    <div class="main container">
      <SideBar/>
      <div class="content">
        <Header :page="'categories'" :cur-page="'Категории'" :hide-page="'Скрытые категории'"
                :btn-text="'Новые категории'"/>
        <Content class="view" :page="'categories'"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  components: {
    SideBar: () => import('@/components/SideBar'),
    Content: () => import('@/components/Content')
  }
}
</script>

<style scoped>

</style>
