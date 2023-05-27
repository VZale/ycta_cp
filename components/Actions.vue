<template>
    <div class="actions">
        <i class="material-icons" v-if="edit" @click="$emit('edit')">edit</i>
            <i class="material-icons" v-if="hide" @click="$emit('hide')">visibility</i>
            <i class="material-icons" v-if="remove" @click="$emit('remove')">delete</i>
    </div>
</template>

<script>
export default {
    props: {
        edit: {
            type: Boolean,
            default: true
        },
        hide: {
            type: Boolean,
            default: true
        },
        remove: {
            type: Boolean,
            default: true
        },
        item: {
            type: [String, Number]
        }
    },
    name: "Actions"
}
</script>

<style scoped>
.actions {
    text-align: end;
}

.actions i {
    cursor: pointer;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid var(--gray-1);
    font-size: 18px;
    transition: all .3s ease-in-out;
}

.actions i:hover {
    background-color: var(--gray-1);
}
</style>
