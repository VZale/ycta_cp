<template>
  <div class="categories">
    <div class="main container">
      <SideBar/>
      <div class="content">
        <Header :page="'products'" :cur-page="'Товары'" :hide-page="'Скрытые товары'"
                :btn-text="'Новый товар'"/>
        <Content class="view" :page="'products'"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products",
  components: {
    SideBar: () => import('@/components/SideBar'),
    Content: () => import('@/components/Content')
  }
}
</script>

<style scoped>

</style>
