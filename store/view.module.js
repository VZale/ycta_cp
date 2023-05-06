import Vue from "vue"

export const state = {
    showAddBox: false,
    showEditBox: false,
    currentPage: 'default'
}

export const getters = {
    showAddBox() {
        return state.showAddBox
    },
    showEditBox() {
        return state.showEditBox
    },
    currentPage() {
        return state.currentPage
    }
}

export const mutations = {
    setShowBox() {
        state.showAddBox = !state.showAddBox
    },
    setEditBox(_, boxState) {
        state.showEditBox = boxState
    },
    setPage(_, data) {
        Vue.set(state, 'currentPage', data)
    }
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}
