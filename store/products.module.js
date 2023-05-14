import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    chosenProducts: {},
    reletedProducts: {},
    products: {},
    sameProducts: {},
}

export const getters = {
    products() {
        return state.products
    },

    sameProducts() {
        return state.sameProducts
    },

    chosenProducts() {
        return state.chosenProducts
    },

    reletedProducts() {
        return state.reletedProducts
    },
}

export const mutations = {
    chooseProduct(context, data) {
        if (!state.chosenProducts[data.id]) {
            Vue.set(state.chosenProducts, data.id, {})
        }

        Vue.set(state.chosenProducts[data.id], 'data', data.data)
        Vue.set(state.chosenProducts[data.id], 'state', !data.state || false)
        if (!state.chosenProducts[data.id].state) {
            Vue.delete(state.chosenProducts, data.id)
        }
    },

    setReletedProducts(context, data) {
        Vue.set(state, 'reletedProducts', data)
    },

    removeReletedProducts(context, id) {
        state.reletedProducts.splice(id, 1)
    },

    removeProduct(context, data) {
        Vue.delete(state.products, data)
    },

    clearChosenProducts() {
        Vue.set(state, 'chosenProducts', {})
    },

    clearReletedProducts() {
        Vue.set(state, 'reletedProducts', {})
    },

    setProducts(context, data) {
        for (const item in data) {
            Vue.set(state.products, item, data[item])
        }
    },
    addProduct(context, data) {
        let count = state.products.length
        ++count
        Vue.set(state.products, count, {})
        for (const item in data) {
            state.products[count][item] = data[item]
        }
    },
    setSameproducts(context, data) {
        for (const item in data) {
            Vue.set(state.sameProducts, item, data[item])
        }
    },
    editProduct(context, data) {
        const productToUpdate = Object.values(state.products).find(product => product._id === data._id)
        if (productToUpdate) {
            Object.assign(productToUpdate, data)
        }
    }
}

const actions = {
    getProducts(context,data) {
        RestService.get(`/products?limit=18&offset=${data?.offset || 0}`)
            .then(ans => {
                this.commit('setProducts', ans)
                this.commit('initPage', 'products')
            })
    },
    getSameproducts(context, data) {
        RestService.get(`/same_product/${data}`)
            .then((ans) => {
                this.commit('chooseProduct', ans.products)
                let images = []
                for (const item in ans.products) {
                    images.push(ans.products[item].images[0])
                }
                this.commit('setReletedProducts', images)
            })
    },
    addSameproducts(context, data) {
        RestService.post('/same_products', data.sameproduct)
            .then((ans) => {
                data.data.same_products_id = ans._id
                this.dispatch('addProduct', data.data)
            })
    },
    addProduct(context, data) {
        const {file, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file && Object.keys(file).length) {
            for (const item in file) {
                formData.append('file', file[item])
            }
        }else {
            formData.append('file', '')
        }
        RestService.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(ans => {
                this.commit('addProduct', ans)
                this.commit('clearReletedProducts')
                this.commit('clearChosenProducts')
            })
    },
    removeProduct(context, data) {
        const item = data.item
        RestService.delete(`/product/${data._id}`)
            .then(() => {
                this.commit('removeProduct', item)
            })
    },

    editProduct(context, data) {
        const {file, _id, hidden, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file) {
            formData.append('file', file[0])
        } else {
            formData.append('file', '')
        }
        RestService.put(`/product/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(() => {
                this.commit('editProduct', data)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
