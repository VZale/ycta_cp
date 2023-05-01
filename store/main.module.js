import Vue from "vue"

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
                    isSelect: true,
                    select: []
                },
                subcategories: {
                    label: 'Выберите подкатегорию',
                    placeholder: 'Подкатегория товара',
                    isSelect: true,
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
        categories: {
            0: {
                name: 'Test 2'
            }
        },
        subcategories: {},
        products: {}
    },
    initPages: {
        categories: false,
        subcategories: false,
        products: false,
    }
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
    }
}

export const mutations = {
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

        // this.dispatch('sendCategory', data.data)

        // Vue.set(state.pageData['categories'],'products', [])
        // state.pageData['categories'].products.push(data.data)
        //
        // Vue.set(state.pageData['categories'][data.data.id], 'total', ++state.pageData['categories'][data.data.id].total || 1)
    },
    removePageData(_, data) {
        Vue.delete(state.pageData[data.page], data._id)
    },
    hidePageData(_, data) {
        Vue.set(state.pageData[data.page][data.data._id], 'hidden', data.data.hidden)
    }
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}
