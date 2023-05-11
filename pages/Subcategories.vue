<template>
    <div class="subcategories" v-if="userAuth">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'subcategories'" :cur-page="'Подкатегории'" :hide-page="'Скрытые подкатегории'"
                        :btn-text="'Новая подкатегория'" :dynamic-header-content="true"
                        :add-title="'Новая подкатегория'"
                />
                <div class="box" v-if="!showAddBox && !showEditBox && currentPage === 'default'"
                     :class="{'filters-not-added': !Object.keys(subcategories).length}">
                    <ScrollPanel style="width: 100%; height: 700px">

                        <template v-if="Object.keys(subcategories).length">
                            <template v-if="subcategory && !subcategory.hidden"
                                      v-for="(subcategory, i) in subcategories">
                                <div class="item">
                                    <h2 class="subtitle">{{ subcategory.name }}</h2>
                                    <Actions :item="i" @remove="remove(subcategory, i)" @hide="hide(subcategory)"
                                             @edit="edit(subcategory)"/>
                                </div>
                            </template>
                        </template>
                        <WarningMessage v-else :warning-message="'Начните добавлять фильтры и они появятся здесь'"/>
                    </ScrollPanel>
                </div>
                <div class="hidden-box box" v-if="currentPage === 'hide' && !showEditBox">
                    <template v-if="Object.keys(subcategories).length">
                        <template v-if="subcategory && subcategory.hidden"
                                  v-for="(subcategory, i) in subcategories">
                            <div class="item">
                                <h2 class="subtitle">{{ subcategory.name }}</h2>
                                <Actions :item="i" @remove="remove(subcategory._id)" @hide="hide(subcategory)"
                                         @edit="edit(subcategory)"/>
                            </div>
                        </template>
                    </template>

                </div>
                <AddSubcategories v-if="showAddBox" @add="addSubcategory" :btn-title="'Добавить подкатегорию'"/>
                <EditSubcategory @save-changes="saveSubcategory" :data="currentSubcategories" v-if="showEditBox"
                                 :type="'subcategory'" :btnText="'Сохранить'"/>
            </div>
        </div>
    </div>
    <PageNotFound v-else/>
</template>

<script>
import {mapGetters} from "vuex"
import ScrollPanel from "primevue/scrollpanel";
import PageNotFound from "@/pages/pageNotFound";


export default {
    name: "Subcategories",
    components: {
        ScrollPanel,
        PageNotFound,
        EditSubcategory: () => import('@/components/Forms/EditSubcategory'),
        SideBar: () => import('@/components/SideBar'),
        AddSubcategories: () => import('@/components/Forms/AddSubcategories'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage')
    },
    data() {
        return {
            currentSubcategories: []
        }
    },
    computed: {
        ...mapGetters(['userAuth','showAddBox', 'showEditBox', 'currentPage', 'subcategories', 'initPages'])
    },
    methods: {
        saveSubcategory(data) {
            this.$store.dispatch('updateSubcategory', data)
            this.$store.commit('setEditBox', false)
        },
        edit(subcategory) {
            this.currentSubcategories = subcategory
            this.$store.commit('setEditBox', true)
        },
        addSubcategory(subcategoryData) {
            this.$store.commit('setEditBox', false)
            this.$store.dispatch('addSubcategory', subcategoryData)
        },

        remove(subcategory, i) {
            this.$store.dispatch('removeSubcategory', {
                _id: subcategory._id,
                item: i
            })
        },
        hide(subcategori) {
            let subState = subcategori.hidden
            this.$store.dispatch('updateSubcategory', {
                hidden: !subState,
                _id: subcategori._id
            })
        }
    },
}
</script>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--gray-1);
    padding-bottom: 15px;
    margin-bottom: 15px;
}
</style>
