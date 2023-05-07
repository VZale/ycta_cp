<template>
    <div class="login">
        <div class="container">
            <div class="left">
                <div class="box">
                    <a class="logo" href="">
                        <img :src="require('@/assets/ycta-logo-white.png')" alt="">
                    </a>
                    <div class="content">
                        <h1>Добро пожаловать!</h1>
                        <p>Чтобы начать работу в панели администратора, необходимо авторизоваться</p>
                    </div>
                </div>
                <img class="login-bg" :src="require('@/assets/login-bg.png')" alt="">
            </div>
            <div class="right">
                <div class="box">
                    <h2>Авторизация</h2>
                    <div class="item form">
                        <InputBox @update="setField" :title="'Логин'" :field="'login'"/>
                        <InputBox @update="setField" :title="'Пароль'" :field="'password'"/>
                        <ButtonBox :design="['button','red','large']" :title="'Войти'" @update="send()"/>
                        <CheckBox @update="updateCheckboxState" :title="'Запомнить меня на этом устройстве'"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue"

export default {
    name: "Login",
    components: {
        InputBox: () => import('~/components/Forms/InputBox'),
        CheckBox: () => import('@/components/Forms/CheckBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox')
    },
    data() {
        return {
            userInfo: {},
            checked: false,
        }
    },
    methods: {
        send() {
            this.$store.dispatch('auth', this.userInfo)
        },
        setField(inputData) {
            this.$set(this.userInfo, inputData.field, inputData.inputData)
        },
        updateCheckboxState(checkboxState) {
            this.checked = checkboxState
        }
    }
}
</script>

<style scoped>
.login .container {
    grid-template-columns: repeat(2, 1fr);
}

.login h2 {
    font-weight: 500;
    font-size: 40px;
    line-height: 110%;
    text-align: center;
    width: 100%;
    margin-bottom: 40px;
}

.right,
.left {
    display: grid;
    align-items: center;
    border-radius: 12px;
}

.right {
    background-color: var(--white);
    padding: 0 140px;
}

.left {
    position: relative;
    color: var(--white);
    padding: 0 40px;
    overflow: hidden;
}

.login-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
}

.left .box {
    display: grid;
    grid-template-rows: repeat(2, max-content);
    height: 100%;
    place-content: space-between;
    padding: 40px 0 60px;
    position: relative;
    z-index: 5;
}

h1 {
    font-weight: 500;
    font-size: 72px;
    line-height: 105%;
    margin-bottom: 24px;
}

.left p {
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
}

button {
    font-size: 18px;
    width: 100%;
    text-align: center;
    font-weight: 500;
    margin: 24px 0;
}
</style>
