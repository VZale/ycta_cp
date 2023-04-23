<template>
    <div class="categories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'categories'" :cur-page="'Категории'" :hide-page="'Скрытые категории'"
                        :btn-text="'Новые категории'" :dynamic-header-content="true" :add-title="'Новая категория'"
                        @add="showAddBox = true" @turn-back="showAddBox = false" @change-page="changePage"/>
                <Content class="view" :page="'categories'" v-if="!showAddBox && currentPage === 'default'"/>
                <AddBox :page="'category'" v-if="showAddBox" @add="addCategory" :btn-title="'Добавить категорию'"/>
                <HiddenBox class="view" :page="'categories'" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Categories",
    components: {
        SideBar: () => import('@/components/SideBar'),
        Content: () => import('@/components/Content'),
        AddBox: () => import('~/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox')
    },
    data() {
        return {
            showAddBox: false,
            currentPage: 'default'
        }
    },
    methods: {
        addCategory(categoryData) {
            this.$store.commit('setPageData', {
                data: categoryData,
                page: 'categories'
            })
        },
        changePage(page) {
            this.currentPage = page
        }
    }
}
</script>

<style scoped>

</style>
