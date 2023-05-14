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
            })
    },
    addCategory(context, data) {
        const {file, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file){
            formData.append('file', file[0])
        }else {
            formData.append('file', '')
        }
        RestService.post('/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        },error => {
            switch (error){
                case 'INVALID_FILE':
                    this.commit('setErrorMessage', 'Указан неверный файл изображения')
                    break
                default :
                    this.commit('setErrorMessage', 'Данная категория уже добавлена')
                    break
            }
            setTimeout(() => {
                this.commit('setErrorMessage', '')
            }, 100)
        })
            .then(ans => {
                this.commit('setCategories', {ans})
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
        if (file){
            formData.append('file', file[0])
        }else {
            formData.append('file', '')
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
        const {_id, ...dataWithoutId} = data

        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutId))
        formData.append('file', '')

        RestService.put(`/category/${data._id}`, formData)
            .then((ans) => {
                this.commit('editCategory', ans)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
