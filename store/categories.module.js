import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    categories: {}
}

export const getters = {
    categories() {
        return state.categories
    }
}

export const mutations = {
    setCategories(context, data) {
        for (const item in data) {
            Vue.set(state.categories, item, data[item])
        }
    },
    addCategory(context, data) {
        Object.values(state.categories).push(data)
    },
    removeCategory(context, data) {
        Vue.delete(state.categories, data)
    },
    editCategory(context, data) {
        const categoryToUpdate = Object.values(state.categories).find(category => category._id === data._id)
        if (categoryToUpdate) {
            Object.assign(categoryToUpdate, data)
        }
    }
}

const actions = {
    getCategories() {
        RestService.get('/categories')
            .then(ans => {
                this.commit('setCategories', ans)
                this.commit('initPage', 'categories')
            })
    },
    addCategory(context, data) {
        const {file, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file) {
            formData.append('file', file[0])
        }
        RestService.post('/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(ans => {
                this.commit('addCategory', ans)
            })
    },
    removeCategory(context, data) {
        const item = data.item
        RestService.delete(`/category/${data._id}`)
            .then(() => {
                this.commit('removeCategory', item)
            })
    },
    editCategory(context, data) {
        const {file, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file) {
            formData.append('file', file[0])
        }
        RestService.put(`/category/${data._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(() => {
                this.commit('editCategory', data)
            })
    },
    updateCategory(context, data) {
        RestService.put(`/category/${data._id}`, {
            hidden: data.hidden
        })
            .then(() => {
                this.commit('editCategory', data)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
