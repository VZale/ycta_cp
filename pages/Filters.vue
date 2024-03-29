<template>
    <div class="filters" v-if="userAuth">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'filters'" :cur-page="'Фильтры'" :hide-page="'Скрытые фильтры'"
                        :btn-text="'Новый фильтр'"
                        @add="modalBox = true"
                />
                <div class="box" v-if="currentPage === 'default'"
                     :class="{'filters-not-added': !Object.keys(filtersList).length}">
                    <div class="item main-item" v-if="Object.keys(filtersList).length">
                        <h2 class="subtitle">Название фильтра</h2>
                        <h2 class="subtitle">Пункты фильтрации</h2>
                    </div>
                    <template v-if="Object.keys(filtersList).length">
                        <template v-for="(filterItem, i) in filtersList">
                            <div class="item" v-if="!filterItem.hidden">
                                <h2 class="subtitle">{{ filterItem.name }}</h2>
                                <h2 class="subtitle">{{ filterItem.options?.join(' ') }}</h2>
                                <Actions :item="i" @edit="editFilter(filterItem)" @hide="hideFilter(filterItem)"
                                         @remove="removeFilter(filterItem, i)"/>
                            </div>
                        </template>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять фильтры и они появятся здесь'"/>
                </div>
                <HiddenFilters class="box" v-if="currentPage === 'hide'"/>
            </div>
        </div>
        <ModalBox v-if="modalBox" :title="'Новый фильтр'" @close="modalBox = false">
            <template #modalContent>
                <AddFilter @add="addFilter"/>
            </template>
        </ModalBox>
        <ModalBox v-if="editBox" :title="'Редактировать фильтр'" @close="editBox = false">
            <template #modalContent>
                <EditFilter @add="saveFilter"/>
            </template>
        </ModalBox>
        <Toast/>
    </div>
    <PageNotFound v-else/>
</template>

<script>
import {mapGetters} from "vuex"
import PageNotFound from "@/pages/pageNotFound"
import Toast from 'primevue/toast';


export default {
    name: "Filters",
    mounted() {
      this.$store.dispatch('getFilters')
    },
    components: {
        PageNotFound,
        Toast,
        AddFilter: () => import('@/components/AddFilter'),
        ModalBox: () => import('@/components/Forms/ModalBox'),
        SideBar: () => import('@/components/SideBar'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Actions: () => import('@/components/Actions')
    },
    data() {
        return {
            modalBox: false,
            editBox: false
        }
    },
    computed: {
        ...mapGetters(['filtersList','init', 'userAuth', 'showAddBox', 'currentPage', 'filtersList', 'errorMessage'])
    },
    methods: {
        addFilter(data) {
            this.$store.dispatch('addFilter', data)
            this.modalBox = false
        },
        saveFilter(data) {
            this.$store.dispatch('changeState', data)
            this.editBox = false
        },
        hideFilter(filter) {
            const hiddenState = filter.hidden
            this.$store.dispatch('changeState', {
                hidden: !hiddenState,
                _id: filter._id
            })
        },
        removeFilter(filter, i) {
            this.$store.dispatch('removeFilter', {
                _id: filter._id,
                item: i
            })
        },
        editFilter(filter) {
            this.$store.commit('setEditedFilter', filter)
            this.editBox = true
        }
    },
    watch: {
        deep: true,
        errorMessage(val) {
            if (val) {
                this.$toast.add({severity: 'error', summary: 'Error Message', detail: `${val}`, life: 3000})
            }
        }
    }
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
