<template>
    <div class="chips" @click="focusInput">
        <div class="fields base-input">
            <p class="custom-label" v-if="!search && chip === '' && !chipsList?.[focused]?.length">Пункты фильтрации</p>
            <p v-if="search">{{ focused }}</p>
            <ul>
                <template v-for="(chip, index) in chipsList" v-if="chip.length">
                    <li v-for="(word, i) in chip" :key="i">
                        {{ word }}
                        <span class="material-icons" @click="remove(i)">close</span>
                    </li>
                </template>
                <li>
                    <input
                        v-if="currentFocused"
                        ref="chipsInput"
                        type="text"
                        @keypress.enter="add()"
                        @input="updateChip($event.target.value)"
                    />
                </li>
            </ul>
        </div>
        <div class="helper" v-if="search">
            <div class="filters-help" v-if="chip !== ''">
                <span v-for="(filterItem, j) in filteredList" :key="j" @click="addFromHelper(filterItem)">
                  {{ filterItem }}
                </span>
                <span v-if="!filteredList?.length">Такого фильтра нет</span>
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    props: {
        chips: {
            type: Object
        },
        focused: {
            type: String
        },
        index: {
            type: Number
        },
        slug: {
            type: String
        },
        search: {
            type: Boolean,
            default: true
        }
    },
    name: "Chips",
    mounted() {
        for (const item in this.filtersAll) {
            this.$set(this.chipsList, this.filtersAll[item].name, [])
        }

        if (this.chips && Object.keys(this.chips).length) {
            this.chips.map((el, i) => {
                this.chipsList[this.focused].push(el)
            })
        }
    },
    data() {
        return {
            chip: '',
            chipsList: {},
            currentFocused: ''
        }
    },
    computed: {
        ...mapGetters([
            'filtersList',
            'filtersAll'
        ]),
        filteredList() {
            for (const item in this.filtersList) {
                if (this.filtersList[item].name === this.focused) {
                    const options = this.filtersList[item].options
                    return options.filter((item) => item.toLowerCase().includes(this.chip.toLowerCase()))
                }
            }
        },
    },
    methods: {
        remove(index) {
            if (this.currentFocused) {
                this.chipsList[this.currentFocused].splice(index, 1)
                this.$emit('add', this.chipsList[this.currentFocused])
            }
        },
        add() {
            if (this.chip.trim() !== '' && this.currentFocused) {
                this.chipsList[this.currentFocused]?.push(this.chip)
                this.chip = ''
                this.$nextTick(() => {
                    this.$refs.chipsInput.value = ''
                })
                this.$emit('add', this.chipsList[this.currentFocused])
            }
        },
        addFromHelper(helper) {
            if (helper.trim() !== '' && this.currentFocused) {
                this.chipsList[this.currentFocused]?.push(helper)
                this.chip = ''
                this.$nextTick(() => {
                    this.$refs.chipsInput.value = ''
                })
                this.$emit('add', this.chipsList[this.currentFocused])
            }
        },
        focusInput() {
            this.currentFocused = this.focused
            if (this.currentFocused) {
                this.$nextTick(() => {
                    this.$refs.chipsInput?.focus()
                })
            }
            this.$emit("focused", this.slug)
        },
        updateChip(value) {
            this.chip = value
            this.$emit('search', this.chip)
        }
    }
}
</script>

<style scoped>
.chips {
    position: relative;
}

.base-input {
    align-items: center;
    cursor: text;
}

.chips .fields {
    display: flex;
    gap: 10px;
}

.custom-label {
    position: absolute;
}

.chips ul {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    height: 100%;
}

.chips li {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--black);
    color: var(--white);
    border-radius: 8px;
    padding: 5px 12px;
}

.chips li span {
    color: var(--gray-4);
    cursor: pointer;
    transition: all .3s ease-in-out;
}

.chips li span:hover {
    color: var(--white);
}

.chips li:last-child {
    background-color: transparent;
    color: var(--black);
    padding: 0;
    gap: 0;
    display: inline-block;
}

.chips input {
    border: 0;
    outline: none;
    display: inline-block;
    height: 100%;
    width: 100%;
    background: transparent;
}

.filters-help {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 20px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(55, 57, 64, 0.2);
}

.filters-help span {
    border-radius: 8px;
    background-color: var(--black);
    color: var(--white);
    padding: 6px;
    cursor: pointer;
}
</style>
