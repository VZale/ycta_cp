<template>
  <div class="filters">
    <div class="main container">
      <SideBar/>
      <div class="content">
        <Header :page="'filters'" :cur-page="'Фильтры'" :hide-page="'Скрытые фильтры'" :btn-text="'Новый фильтр'"/>
        <Content class="view" :page="'filters'"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  components: {
    SideBar: () => import('@/components/SideBar')
  }
}
</script>

<style scoped>
.view {
  border-radius: 12px;
  background-color: var(--white);
}
</style>
