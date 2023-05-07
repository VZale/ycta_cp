import Vue from "vue"
import RestService from "~/common/rest.service";

export const state = {
    fields: {
        productFields: {
            baseFields: {
                name: {
                    label: 'Введите название товара',
                    placeholder: 'Название товара'
                },
                price: {
                    label: 'Введите стоимость товара',
                    placeholder: 'Стоимость товара'
                },
                categories: {
                    label: 'Выберите категорию',
                    placeholder: 'Категория товара',
                },
                subcategories: {
                    label: 'Выберите подкатегорию',
                    placeholder: 'Подкатегория товара',
                },
            },
            filterList: {},
            labels: {
                hot: {
                    title: 'Хит продаж',
                    state: false,
                },
                discount: {
                    title: 'Скидка на товар',
                    state: false
                }
            },
            images: {
                useDefault: false,
                images: []
            },
            relatedProducts: []
        },
        categoryFields: {
            baseFields: {
                name: {
                    label: 'Введите название категории',
                    placeholder: 'Название категории'
                },
            },
            images: {
                useDefault: false,
                images: []
            },
        },
        subcategoryFields: {
            baseFields: {
                name: {
                    label: 'Введите название подкатегории',
                    placeholder: 'Название подкатегории'
                },
                categories: {
                    label: 'Выберите в какой категории будет находиться эта подкатегория',
                    placeholder: 'Категория товара',
                    isSelect: true,
                },
            }
        },
        relatedProducts: []
    },
    pageData: {
        categories: {},
        subcategories: {},
        products: {}
    },
    initPages: {
        categories: false,
        subcategories: false,
        products: false,
    },
    user: {}
}

export const getters = {
    fields() {
        return state.fields
    },
    pageData() {
        return state.pageData
    },
    initPages() {
        return state.initPages
    },
    user() {
        return state.user
    },
}

export const mutations = {
    appInit() {
        let cToken = localStorage.get('token')
        if (cToken !== null && cToken !== 'undefined' && cToken !== undefined) {
            RestService.token(cToken)
            RestService.get('/user/self', {}, () => {
                // no, token invalid
                this.commit('clearToken')
                this.commit('setAccess', 'denied')
            })
                .then(ans => {
                    // yes, token valid
                    this.commit('user', ans)
                    this.commit('setAccess', 'granted')
                    this.commit('setTidioUserData', ans)
                    this.dispatch('fetchAllUserData')
                })
        } else {
            this.commit('clearToken')
        }
    },
    initPage(context, page) {
        Vue.set(state.initPages, page, true)
    },
    setPageData(context, data) {
        for (const item in data.data) {
            if (!state.pageData[data.page][data.data[item]._id]) {
                Vue.set(state.pageData[data.page], data.data[item]._id, {})
            }
            Vue.set(state.pageData[data.page], data.data[item]._id, data.data[item])
        }
    },
    removePageData(_, data) {
        Vue.delete(state.pageData[data.page], data._id)
    },
    hidePageData(_, data) {
        Vue.set(state.pageData[data.page][data.data._id], 'hidden', data.data.hidden)
    },
    user(context, data) {
        for (let n in data) {
            Vue.set(state.user, n, data[n])
        }
    },
    clearUser() {
        for (let n in state.user) {
            state.user[n] = ''
        }
    },

    clearToken() {
        state.user.token = ''
        RestService.token('')
    },
}

const actions = {
    auth(_, data) {
        RestService.post('/manager/auth', data)
            .then((ans) => {
                if (ans) {
                    RestService.token(ans.jwt_token)
                    localStorage.setItem('token', ans.jwt_token)
                    this.commit('user', ans)
                    this.dispatch('fetchAllUserData')
                    if (this.$router.currentRoute.name !== 'filters') {
                        this.$router.push('/filters')
                    }
                }
            })
    },
    logout() {
        this.commit('clearUser')
        this.commit('clearToken')
        if (this.$router.currentRoute.name !== '/') {
            this.$router.push('/')
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
