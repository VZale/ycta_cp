<template>
    <div class="modal-wrapper" @click.stop="$emit('close')" :class="{grid: grid}">
        <div class="modal" @click.stop>
            <h2 class="title">{{ title }}</h2>
            <span class="material-icons close" @click="$emit('close')">close</span>
            <div class="modal-content">
                <div class="modal-items">
                    <slot name="modalContent"/>
                </div>
                <slot name="button"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalBox",
    props: {
        title: {
            type: String
        },
        grid: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.modal-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
}

.modal-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .3;
    z-index: 3;
}

.modal {
    width: 675px;
    min-height: 300px;
    position: absolute;
    background: #FFFFFF;
    border-radius: 12px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px;
    z-index: 4;
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-rows:max-content;
}

.close {
    cursor: pointer;
}

.title {
    font-size: 24px;
    font-weight: 500;
}

.grid .modal {
    width: calc(100% - 360px);
    height: calc(100% - 200px);
}

.grid .close {
    text-align: end;
}

.grid .modal-content {
    display: grid;
    grid-template-rows: 1fr max-content;
    height: 100%;
    overflow: auto;
    gap: 40px;
}

.modal-items {
    overflow: auto;
    max-height: 100%;
}
</style>
