<template>
    <header class="header">
        <div class="left">
            <span class="material-icons" v-if="!isDefaultMode" @click="turnBack()">west</span>
            <span class="current-page" :class="{active: currentPage === 'default'}"
                  @click="changePage('default')">{{ !isDefaultMode && addTitle ? addTitle : curPage }}</span>
            <span class="hide-page" :class="{active: currentPage === 'hide'}" v-if="isDefaultMode" @click="changePage('hide')">{{
                    hidePage
                }}</span>
        </div>
        <ButtonBox v-if="isDefaultMode" :design="['button','black','small']" @update="add()"
                   :title="btnText"
                   :material-icon="'add_circle'"
        />
    </header>
</template>

<script>
export default {
    props: {
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
    data() {
        return {
            isDefaultMode: true,
            currentPage: 'default'
        }
    },
    methods: {
        changePage(page) {
            this.currentPage = page

            this.$emit('change-page', this.currentPage)
        },
        add() {
            if (this.dynamicHeaderContent) {
                this.isDefaultMode = false
            }

            this.$emit('add')
        },

        turnBack() {
            this.isDefaultMode = true

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
