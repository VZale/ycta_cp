<template>
    <div class="box" :class="{'filters-not-added': !Object.keys(filtersList).length}">
        <div class="item main-item" v-if="Object.keys(filtersList).length">
            <h2 class="subtitle">Название фильтра</h2>
            <h2 class="subtitle">Пункты фильтрации</h2>
        </div>
        <template v-if="Object.keys(filtersList).length">
            <div class="item" v-for="(filterItem, i) in filtersList" :key="i">
                <h2 class="subtitle">{{ filterItem.title }}</h2>
                <h2 class="subtitle">{{ filterItem.value.join(', ') }}</h2>
                <Actions :item="i"/>
            </div>
        </template>
        <WarningMessage v-else :warning-message="'Начните добавлять фильтры и они появятся здесь'"/>
    </div>
</template>

<script>
export default {
    name: "FilterView",
    components: {
        WarningMessage: () => import('@/components/WarningMessage'),
        Actions: () => import("@/components/Actions"),
    },
    data() {
        return {
            filtersList: {
                color: {
                    title: "Цвет",
                    value: ['Коричневый', 'Серый', 'Белый', 'Бежевый', 'Красный']
                },
                format: {
                    title: "Формат",
                    value: ['1 NF', '2 NF', '12', '3 NF', '10', '8 NF', '11', '5 NF']
                },
                size: {
                    title: "Размер",
                    value: ['500*200*250', '500*250*250', '500*300*200', '500*300*250', '500*400*250', '625*100*250', '625*125*250',
                        '625*150*250']
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
