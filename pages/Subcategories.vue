<template>
    <div class="subcategories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'subcategories'" :cur-page="'Подкатегории'" :hide-page="'Скрытые подкатегории'"
                        :btn-text="'Новая подкатегория'" :dynamic-header-content="true"
                        :add-title="'Новая подкатегория'"
                />
                <div class="box" v-if="!showAddBox && currentPage === 'default'"
                     :class="{'filters-not-added': !Object.keys(pageData['subcategories']).length}">
                    <template v-if="Object.keys(pageData['subcategories']).length">
                        <template v-if="subcategory && subcategory.hidden"
                                  v-for="(subcategory, i) in pageData['subcategories']">
                            <div class="item">
                                <h2 class="subtitle">{{ subcategory?.name }}</h2>
                                <!--                            <h2 class="subtitle">{{ subcategory.value.join(', ') }}</h2>-->
                                <Actions :item="i" @remove="remove(subcategory._id)" @hide="hide(subcategory)"/>
                            </div>
                        </template>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять фильтры и они появятся здесь'"/>
                </div>
                <AddBox :avaliable-image-box="false" :page="'subcategory'" v-if="showAddBox" @add="addSubcategory"
                        :btn-title="'Добавить подкатегорию'"/>
                <div class="hidden-box box" v-if="currentPage === 'hide'">
                    <template v-if="Object.keys(pageData['subcategories']).length">
                        <template v-if="subcategory && !subcategory.hidden"
                                  v-for="(subcategory, i) in pageData['subcategories']">
                            <div class="item">
                                <h2 class="subtitle">{{ subcategory?.name }}</h2>
                                <!--                            <h2 class="subtitle">{{ subcategory.value.join(', ') }}</h2>-->
                                <Actions :item="i" @remove="remove(subcategory._id)" @hide="hide(subcategory)"/>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "Subcategories",
    mounted() {
        if (!this.initPages['subcategories']) {
            this.$store.dispatch('getSubcategories')
        }
    },
    components: {
        SideBar: () => import('@/components/SideBar'),
        AddBox: () => import('@/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage')
    },
    computed: {
        ...mapGetters(['showAddBox', 'currentPage', 'pageData', 'initPages'])
    },
    methods: {
        addSubcategory(subcategoryData) {
            this.$store.dispatch('addSubcategory', {
                data: subcategoryData,
                page: 'subcategories'
            })
        },

        remove(id) {
            this.$store.dispatch('removeSubcategory', {
                page: 'subcategories',
                _id: id
            })
        },
        hide(subcategori) {
            subcategori.hidden = !subcategori.hidden
            this.$store.dispatch('updateSubcategory', {
                page: 'subcategories',
                data: subcategori
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
