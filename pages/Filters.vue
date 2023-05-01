<template>
    <div class="filters">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'filters'" :cur-page="'Фильтры'" :hide-page="'Скрытые фильтры'"
                        :btn-text="'Новый фильтр'"
                        @add="modalBox = true"
                />
                <div class="box" v-if="currentPage === 'default'" :class="{'filters-not-added': !Object.keys(filtersList).length}">
                    <div class="item main-item" v-if="Object.keys(filtersList).length">
                        <h2 class="subtitle">Название фильтра</h2>
                        <h2 class="subtitle">Пункты фильтрации</h2>
                    </div>
                    <template v-if="Object.keys(filtersList).length">
                        <div class="item" v-for="(filterItem, i) in filtersList" :key="i">
                            <h2 class="subtitle">{{ filterItem.title }}</h2>
                            <h2 class="subtitle">{{ filterItem.value.join(', ') }}</h2>
                            <Actions :item="i"/>
                        </div>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять фильтры и они появятся здесь'"/>
                </div>
                <HiddenBox class="box" v-if="currentPage === 'hide'"/>
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
import {mapGetters} from "vuex"

export default {
    name: "Filters",
    components: {
        AddFilter: () => import('@/components/AddFilter'),
        ModalBox: () => import('@/components/Forms/ModalBox'),
        SideBar: () => import('@/components/SideBar'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Actions: () => import('@/components/Actions')
    },
    data() {
        return {
            modalBox: false,
            filtersList: {}
        }
    },
    computed: {
        ...mapGetters(['showAddBox','currentPage'])
    },
}
</script>

<style scoped>

.box .item {
    display: grid;
    margin-bottom: 24px;
    grid-template-columns: repeat(3, 1fr);
    color: var(--black);
    align-items: center;
}
</style>
