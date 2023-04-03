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
      </div>
      <div class="right">
        <div class="box">
          <h2>Авторизация</h2>
          <div class="item form">
            <div class="form-item" :class="{'is-focus': inputIsActive['login']}">
              <p>Ваше имя</p>
              <input v-model="userInfo.login" type="text" @focus="setFocus('login')" @blur="removeFocus()">
            </div>
            <div class="form-item" :class="{'is-focus': inputIsActive['password']}">
              <p>Номер телефона</p>
              <input v-model="userInfo.password" type="text" @focus="setFocus('password')"
                     @blur="removeFocus()">
            </div>
            <div class="autologin">
              <button class="button red large" @click="send()">Войти</button>
              <p>
                Запомнить меня на этом устройстве
              </p>
            </div>
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
  data() {
    return {
      inputIsActive: {
        login: false,
        password: false
      },
      userInfo: {
        login: '',
        password: ''
      },
    }
  },
  methods: {
    setFocus(item) {
      this.$set(this.inputIsActive, item, true)
    },
    removeFocus() {
      for (const item in this.inputIsActive) {
        if (!this.userInfo[item]) {
          this.$set(this.inputIsActive, item, false)
        }
      }
    },
    send() {
      Vue.set(this, 'applicationModal', true)
    },
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

.left::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  z-index: -1;
  background-size: cover;
  background-image: url("./assets/login-bg.png");
}

.left .box {
  display: grid;
  grid-template-rows: repeat(2, max-content);
  height: 100%;
  place-content: space-between;
  padding: 40px 0 60px;
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

.form-item {
  background: var(--gray-1);
  border-radius: 8px;
  height: 53px;
  position: relative;
  margin-bottom: 12px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item:focus {
  background-color: black;
}

.form-item p {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: var(--gray-4);
  z-index: 2;
  transition: all .3s ease-in-out;
}

.form-item.is-focus p {
  font-size: 12px;
  top: 17px;
}

input {
  height: 100%;
  width: 100%;
  outline: none;
  background-color: transparent;
  color: var(--white);
  font-size: 18px;
  position: relative;
  z-index: 3;
  font-weight: 400;
}

.autologin button {
  margin: 24px 0;
}

.autologin p {
  padding-left: 25px;
}

button {
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-weight: 500;
}
</style>
