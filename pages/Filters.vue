<template>
    <div class="filters">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'filters'" :cur-page="'Фильтры'" :hide-page="'Скрытые фильтры'"
                        :btn-text="'Новый фильтр'"
                        @add="modalBox = true"
                />
                <Content class="view" :page="'filters'"/>
            </div>
        </div>
        <ModalBox v-if="modalBox" :title="'Новый фильтр'" @close="modalBox = false">
            <template #modalContent>
                <AddFilter/>
            </template>
        </ModalBox>
    </div>
</template>

<script>
export default {
    name: "Filters",
    components: {
        AddFilter: () => import('@/components/AddFilter'),
        ModalBox: () => import('~/components/Forms/ModalBox'),
        SideBar: () => import('@/components/SideBar')
    },
    data() {
        return {
            modalBox: false
        }
    }
}
</script>

<style scoped>

</style>
