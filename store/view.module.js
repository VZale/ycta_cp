import Vue from "vue"

export const state = {
    showAddBox: false,
    currentPage: 'default'
}

export const getters = {
    showAddBox() {
        return state.showAddBox
    },
    currentPage() {
        return state.currentPage
    }
}

export const mutations = {
    setShowBox() {
        state.showAddBox = !state.showAddBox
    },
    setPage(_, data) {
        Vue.set(state,'currentPage', data)
    }
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}
