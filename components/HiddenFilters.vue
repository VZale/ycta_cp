<template>
    <div class="hidden-box box">
        <div class="item main-item">
            <h2 class="subtitle">Название фильтра</h2>
            <h2 class="subtitle">Пункты фильтрации</h2>
        </div>
        <template v-if="Object.keys(filtersList).length">
            <template v-for="(filterItem, i) in filtersList">
                <div class="item" v-if="filterItem.hidden">
                    <h2 class="subtitle">{{ filterItem.name }}</h2>
                    <h2 class="subtitle">{{ filterItem.options?.join(' ') }}</h2>
                    <Actions :item="i" @edit="editFilter(filterItem)" @hide="hideFilter(filterItem)"
                             @remove="removeFilter(filterItem, i)"/>
                </div>
            </template>
        </template>
        <ModalBox v-if="editBox" :title="'Редактировать фильтр'" @close="editBox = false">
            <template #modalContent>
                <EditFilter @add="saveFilter"/>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "HiddenFilter",
    components: {
        ModalBox: () => import('@/components/Forms/ModalBox'),
        Actions: () => import('@/components/Actions')
    },
    data() {
        return {
            editBox: false
        }
    },
    computed: {
        ...mapGetters(['filtersList'])
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
            this.$store.dispatch('changeState', {
                hidden: !filter.hidden,
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
