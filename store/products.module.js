import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    chosenProducts: {},
    reletedProducts: {},
    products: [],
    sameProducts: {},
    currentSameProductId: null
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
        if (!data.data) {
            return
        }

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

    addToRelatedProducts(context, data) {
        for (const item in data) {
            state.reletedProducts.images.push(data[item])
        }
    },

    removeRelatedProducts(context, id) {
        state.reletedProducts.ids.splice(id, 1)
        state.reletedProducts.images.splice(id, 1)
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
            for (const n in data[item]) {
                if (n === 'images') {
                    data[item][n] = data[item][n]
                }
            }
            state.products.push(data[item])
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
    getProducts(context, data) {
        if (!data) {
            data = {}
            data.offset = 1
        }

        RestService.get(`/products?limit=15&offset=${data.offset}`)
            .then(ans => {
                this.commit('setProducts', ans)
                this.commit('initPage', 'products')
            })
    },
    getSameProducts(context, data) {
        Vue.set(state, 'currentSameProductId', data)
        RestService.get(`/same_product/${data}`)
            .then((ans) => {
                this.commit('chooseProduct', ans.products)
                let sameProducts = {
                    images: [],
                    ids: []
                }
                for (const item in ans.products) {
                    sameProducts.images.push(ans.products[item].images[0])
                    sameProducts.ids.push(ans.products[item]._id)
                }
                this.commit('setReletedProducts', sameProducts)
            })
    },
    addSameProducts(context, data) {
        RestService.post('/same_products', data.sameproduct)
            .then((ans) => {
                data.data.same_products_id = ans._id
                this.dispatch('addProduct', data.data)
            })
    },
    addToSameProducts(context, data) {
        let productData = {
            products: data,
            manager_id: context.rootGetters['user']._id
        }
        RestService.put(`/same_product/${state.currentSameProductId}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    },
    addProduct(context, data) {
        const {file, ...dataWithoutFile} = data
        const formData = new FormData()
        dataWithoutFile.price = dataWithoutFile.price.replace(/,/g, '.');
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file && Object.keys(file).length) {
            for (const item in file) {
                formData.append('file', file[item])
            }
        } else {
            formData.append('file', '')
        }
        RestService.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }, error => {
            switch (error) {
                case 'INVALID_FILE':
                    this.commit('setErrorMessage', 'Указан неверный файл изображения')
                    break
                case 'SERVER_ERROR':
                    this.commit('setErrorMessage', 'Server Error')
                    break
                case 'INVALID_DESCRIPTION':
                    this.commit('setErrorMessage', 'Описание не заполнено')
                    break
                default :
                    this.commit('setErrorMessage', 'Данный товар уже добавлен / ошибка сервера')
                    break
            }
            setTimeout(() => {
                this.commit('setErrorMessage', '')
            }, 100)
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
        const {file, _id, hidden, same_products_id, ...dataWithoutFile} = data
        const images = []

        data.file.forEach((item) => {
            if (/\.(png|jpg|jpeg)$/.test(item)) {
                images.push(item)
            }
        })

        dataWithoutFile.images = images

        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))

        if (file && Object.keys(file).length) {
            for (const item in file) {
                formData.append('file', file[item])
            }
        } else {
            formData.append('file', '')
        }
        RestService.put(`/product/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then((ans) => {
                this.commit('editProduct', ans)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
