<template>
    <header class="header">
        <div class="left">
            <span class="material-icons" v-if="showAddBox || showEditBox" @click="turnBack()">west</span>
            <span class="current-page" :class="{active: currentPage === 'default' || showAddBox || showEditBox}"
                  @click="changePage('default')">{{ !showAddBox && addTitle ? addTitle : curPage }}</span>
            <span class="hide-page" :class="{active: currentPage === 'hide'}" v-if="!showAddBox && !showEditBox"
                  @click="changePage('hide')">{{
                    hidePage
                }}</span>
        </div>
        <ButtonBox v-if="!showAddBox && !showEditBox || page === 'filters'" :design="['button','black','small']"
                   @update="add()"
                   :title="btnText"
                   :material-icon="'add_circle'"
        />
    </header>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    props: {
        page: {
            type: String
        },
        curPage: {
            type: String
        },
        hidePage: {
            type: String
        },
        btnText: {
            type: String
        },
        filters: {
            type: String
        },
        addTitle: {
            type: String
        },
        dynamicHeaderContent: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ButtonBox: () => import('@/components/Forms/ButtonBox')
    },
    name: "Header",
    computed: {
        ...mapGetters(['showAddBox', 'currentPage', 'showEditBox'])
    },
    methods: {
        changePage(page) {
            this.$store.commit('setPage', page)
            this.$emit('change-page', page)
        },
        add() {
            if (this.page !== 'filters') {
                this.$store.commit('setShowBox', this.showAddBox)
            }
            this.$emit('add')
        },

        turnBack() {
            if (this.showEditBox) {
                this.$store.commit('setEditBox', false)
            } else {
                this.$store.commit('setShowBox', this.showAddBox)
            }

            this.$emit('turn-back')
        }
    }
}
</script>

<style scoped>
header {
    padding: 24px;
    border-radius: 12px;
    color: var(--gray-3);
    background-color: var(--white);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    place-content: space-between;
    place-items: center;
}

span.active {
    color: var(--black);
}

.left span {
    margin-right: 16px;
    font-weight: 500;
    font-size: 24px;
    line-height: 120%;
    cursor: pointer;
    vertical-align: middle;
}

.left span:last-child {
    margin-right: 0;
}
</style>
