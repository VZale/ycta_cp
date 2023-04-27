import Vue from "vue"

export const state = {
    fields: {
        productFields: {
            baseFields: {
                title: {
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
            filterList: {
                color: 'Цвет',
                size: 'Размеры',
                format: 'Формат',
            },
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
                title: {
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
                title: {
                    label: 'Введите название подкатегории',
                    placeholder: 'Название подкатегории'
                },
                categories: {
                    label: 'Выберите в какой категории будет находиться эта подкатегория',
                    placeholder: 'Категория товара',
                    isSelect: true,
                },
            }
        }
    },
    pageData: {
        categories: {
            0: {
                title: 'test',
                total: 10
            }
        },
        subcategories: {
            0: {
                title: 'test (sub)',
                total: 10
            }
        },
        products: {}
    }
}

export const getters = {
    fields() {
        return state.fields
    },
    pageData() {
        return state.pageData
    }
}

export const mutations = {
    setPageData(_, data) {
        console.log('data',data)
        if (!state.pageData[data.page][data.data.id]) {
            Vue.set(state.pageData[data.page], data.data.id, {})
        }
        Vue.set(state.pageData[data.page], data.data.id, data.data)

        // Vue.set(state.pageData['categories'],'products', [])
        // state.pageData['categories'].products.push(data.data)
        //
        // Vue.set(state.pageData['categories'][data.data.id], 'total', ++state.pageData['categories'][data.data.id].total || 1)
    },
    removePageData(_, data) {
        Vue.delete(state.pageData[data.page], data.id)
    },
    hidePageData(_, data) {
        console.log(data)
        console.log(state.pageData)
        if (state.pageData[data.page][data.data.id].isHidden) {
            Vue.set(state.pageData[data.page][data.data.id], 'isHidden', false)
        } else {
            Vue.set(state.pageData[data.page][data.data.id], 'isHidden', true)
        }
    }
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}
