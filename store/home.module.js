import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    mainSlider: {},
    aboutSlider: {}
}

export const getters = {
    mainSlider() {
        return state.mainSlider
    },
    aboutSlider() {
        return state.aboutSlider
    }
}

export const mutations = {
    setMainSlider(_, data) {
        state.mainSlider = data
    },
    addMainSlider(_, data) {
        let count = state.mainSlider.length
        ++count
        Vue.set(state.mainSlider, count, {})
        for (const item in data) {
            state.mainSlider[count][item] = data[item]
        }
    },
    editMainSlider(context, data) {
        const mainSliderToUpdate = Object.values(state.mainSlider).find(slide => slide._id === data._id)
        if (mainSliderToUpdate) {
            Object.assign(mainSliderToUpdate, data)
        }
    },
    setAboutSlider(_, data) {
        for (const item in data) {
            Vue.set(state.aboutSlider, item, data[item])
        }
    },
    addAboutSlider(_, data) {
        let count = state.mainSlider.length
        ++count
        Vue.set(state.mainSlider, count, {})
        for (const item in data) {
            state.mainSlider[count][item] = data[item]
        }
    },
    removeMainSlide(context, data) {
        Vue.delete(state.mainSlider, data)
    },
}

const actions = {
    getMainSlider() {
        RestService.get('/sliders/main')
            .then(ans => {
                this.commit('setMainSlider', ans)
                this.commit('initPage', 'slider')
            })
    },
    getAboutSlider() {
      RestService.get('/sliders/about')
          .then(ans => {
              this.commit('setAboutSlider', ans)
              this.commit('initPage', 'slider')
          })
    },
    addMainSlider(_, data) {
        const {file, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file && Object.keys(file).length) {
            for (const item in file) {
                formData.append('file', file[item])
            }
        } else {
            formData.append('file', '')
        }
        RestService.post('/sliders/main', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }, error => {
            switch (error) {
                case 'INVALID_FILE':
                    this.commit('setErrorMessage', 'Указан неверный файл изображения')
                    break
                default :
                    this.commit('setErrorMessage', 'Данный товар уже добавлен')
                    break
            }
            setTimeout(() => {
                this.commit('setErrorMessage', '')
            }, 100)
        })
            .then(ans => {
                this.commit('addMainSlider', ...ans)
            })
    },
    addAboutSlider(_, data) {
        data.position = "0"
        const {file, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file && Object.keys(file).length) {
            for (const item in file) {
                formData.append('file', file[item])
            }
        } else {
            formData.append('file', '')
        }

        RestService.post('/sliders/about', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }, error => {
            switch (error) {
                case 'INVALID_FILE':
                    this.commit('setErrorMessage', 'Указан неверный файл изображения')
                    break
                default :
                    this.commit('setErrorMessage', 'Данный товар уже добавлен')
                    break
            }
            setTimeout(() => {
                this.commit('setErrorMessage', '')
            }, 100)
        })
            .then(ans => {
                this.commit('addAboutSlider', ans)
            })
    },
    editMainSlider(_, data) {
        const {file, _id, ...dataWithoutFile} = data
        const formData = new FormData()
        formData.append('data', JSON.stringify(dataWithoutFile))
        if (file) {
            formData.append('file', file[0])
        } else {
            formData.append('file', '')
        }
        RestService.put(`/slider/main/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then((ans) => {
                this.commit('editMainSlider', ans)
            })
    },
    removeMainSlider(context, data) {
        const item = data.item
        RestService.delete(`/slider/main/${data._id}`)
            .then(() => {
                this.commit('removeMainSlide', item)
            })
    },
    removeAboutSlider(context, data) {
        const item = data.item
        RestService.delete(`/slider/about/${data._id}`)
            .then(() => {
                this.commit('removeMainSlide', item)
            })
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
