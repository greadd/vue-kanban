<template>
  <div class="form-wrapper">
    <form @submit.prevent="submitForm">
      <input type="text" placeholder="Username" v-model="username" />
      <input
        v-if="mode === 'register'"
        type="email"
        placeholder="Email"
        v-model="email"
      />
      <input type="password" placeholder="Password" v-model="password" />
      <div class="buttons">
        <button class="submit-btn" type="submit">
          {{ submitButtonCaption }}
        </button>
        <button class="switch-btn" type="button" @click="switchAuthMode">
          {{ switchModeButtonCaption }}
        </button>
      </div>
      <div v-if="error.length">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Auth',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      mode: 'login',
      error: '',
    }
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login'
      } else {
        return 'Register'
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Register instead'
      } else {
        return 'Login instead'
      }
    },
  },

  methods: {
    ...mapActions(['login', 'register']),

    async submitForm() {
      try {
        if (this.mode === 'login') {
          await this.login({
            username: this.username,
            password: this.password,
          })
        } else {
          await this.register({
            username: this.username,
            email: this.email,
            password: this.password,
          })
        }
      } catch (error) {
        this.error = error.message || 'Something went wrong'
      }
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
    },
  },
}
</script>

<style scoped>
.form-wrapper {
  margin: 0 auto;
  max-width: 320px;
  margin-top: 50px;
}
form {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 720px;
  border-radius: 6px;
  box-shadow: 0px 0px 30px 4px rgba(0, 0, 0, 0.21);
  padding: 16px;
}

input {
  font-size: 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  width: 100%;
  padding: 6px 8px;
  transition: all 0.3s ease-in-out;
}
input:focus {
  background-color: #d5dcf9;
}
.buttons {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

button {
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  width: 200px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 6px;
  border: none;
}

.submit-btn {
  margin-bottom: 8px;
  background-color: #7587ec;
  color: #fff;
}
.submit-btn:hover {
  background-color: #d5dcf9;
  color: #7587ec;
  width: 240px;
}
.switch-btn {
  width: 150px;
  background-color: #fff;
  color: #7587ec;
  margin: 0 auto;
}
.switch-btn:hover {
  background-color: #d5dcf9;
  color: #7587ec;
  margin: 0 auto;
}
</style>
