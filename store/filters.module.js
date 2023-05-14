import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    filtersList: {},
    filtersAll: {},
    editingFilter: {}
}

export const getters = {
    filtersList() {
        return state.filtersList
    },

    filtersAll() {
        return state.filtersAll
    },

    editingFilter() {
        return state.editingFilter
    }
}

export const mutations = {
    setFiltersList(context, data) {
        for (const item in data) {
            Vue.set(state.filtersList, item, data[item])
        }
    },
    editFilter(context, data) {
        const filterToUpdate = Object.values(state.filtersList).find(filter => filter._id === data._id)
        if (filterToUpdate) {
            Object.assign(filterToUpdate, data)
        }
    },
    setAllFilters(context, data) {
        Vue.set(state, 'filtersAll', data)
    },
    removeFilter(context, data) {
        Vue.delete(state.filtersList, data)
    },
    setEditedFilter(context, data) {
        Vue.set(state, 'editingFilter', {})
        for (const item in data) {
            Vue.set(state.editingFilter, item, data[item])
        }
        console.log(state.editingFilter)
    }
}

const actions = {
    getFilters() {
        RestService.get('/filters')
            .then((ans) => {
                this.commit('setFiltersList', ans)
            })
    },
    addFilter(context, data) {
        RestService.post('/filters', data)
            .then((ans) => {
                this.commit('setFiltersList', {ans})
            })
    },
    removeFilter(context, data) {
        const {_id, item, ...dataWithoutId} = data
        RestService.delete(`/filter/${data._id}`)
            .then(() => {
                this.commit('removeFilter', item)
            })
    },
    changeState(context, data) {
        const {_id, ...dataWithoutId} = data
        RestService.put(`/filter/${data._id}`, dataWithoutId)
            .then(() => {
                this.commit('editFilter', data)
            })
    },
    getAllFilter() {
        RestService.get('/filters/list')
            .then((ans) => {
                this.commit('setAllFilters', ans)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
