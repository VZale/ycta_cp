<template>
    <button :class="design.join(' ')" class="button red large" @click="$emit('update')">
        <span v-if="materialIcon" class="material-icons">{{ materialIcon }}</span>
        {{ title }}
    </button>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        icon: {
            type: String,
        },
        materialIcon: {
            type: String
        },
        design: {
            type: Array,
            default: []
        },
    },
    name: "ButtonBox"
}
</script>

<style scoped>

button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
}

.button {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    place-items: center center;
    gap: 5px;
    border-radius: 8px;
    font-weight: 500;
    transition: all .3s ease-in-out;
    position: relative;
    z-index: 3;
    place-content: center center;
}


.button.large {
    padding: 14px 24px;
}

.button.small {
    padding: 8px 16px;
}

.button.right {
    margin: 0 0 0 auto;
}

.button.red {
    background: var(--red-1);
    color: var(--white);
}

.button.white {
    background: var(--white);
    color: #32343B;
}

.button.black {
    background: #32343B;
    color: var(--white);
}

.button.gray {
    background: var(--gray-1);
    color: #32343B;
}

.button.gray-2 {
    background-color: var(--gray-2);
    color: var(--black);
}

@media (min-width: 1100px) {
    .button:active {
        transform: scale(.95);
    }
}
</style>
