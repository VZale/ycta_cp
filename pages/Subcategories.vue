<template>
  <div class="subcategories">
    <div class="main container">
      <SideBar/>
      <div class="content">
        <Header :page="'subcategories'" :cur-page="'Подкатегории'" :hide-page="'Скрытые подкатегории'" :btn-text="'Новая подкатегория'"/>
        <Content class="view" :page="'subcategories'"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subcategories",
  components: {
    SideBar: () => import('@/components/SideBar'),
    Content: () => import('@/components/Content')
  }
}
</script>

<style scoped>

</style>
