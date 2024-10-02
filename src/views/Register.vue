<template>
  <div class="bg-[#F8EDED] h-screen w-screen overflow-hidden">
    <!-- Tu contenido -->
    <div
      class="mt-40 mx-auto pt-16 pb-20 px-6 w-[500px] bg-white rounded-lg shadow-lg ring-2 ring-[#FF8225] ring-offset-2 neon-ring"
    >
      <h2 class="text-center text-xl text-[#ff8225] font-semibold">
        Crear cuenta
      </h2>
      <p
        class="mt-4 text-center bg-red-400 rounded-md py-2"
        v-if="errorMessage"
      >
        {{ this.errorMessage }}
      </p>
      <form @submit.prevent="register()">
        <div class="mt-12">
          <label for="name" class="text-[#173B45]">Nombre: </label>
          <input
            type="text"
            id="name"
            class="w-full bg-gray-50 py-1 px-4 border-2 border-[#173B45] rounded-md text-[#173B45] focus:outline-[#B43F3F]"
            required
            autocomplete="off"
            v-model="form.name"
          />
        </div>
        <div class="mt-2">
          <label for="email" class="text-[#173B45]">Email: </label>
          <input
            type="email"
            id="email"
            class="w-full bg-gray-50 py-1 px-4 border-2 border-[#173B45] rounded-md text-[#173B45] focus:outline-[#B43F3F]"
            required
            v-model="form.email"
          />
        </div>
        <div class="mt-2">
          <label for="password" class="text-[#173B45]">Contraseña: </label>
          <input
            type="text"
            id="password"
            class="w-full bg-gray-50 py-1 px-4 border-2 border-[#173B45] rounded-md text-[#173B45] focus:outline-[#B43F3F]"
            required
            minlength="8"
            v-model="form.password"
          />
        </div>
        <button
          class="mt-8 w-full px-4 py-3 bg-[#B43F3F] text-white rounded-md hover:opacity-95"
        >
          ¡Registrarme!
        </button>
      </form>
      <router-link to="/login" class="mt-3 block text-center text-[#173B45]"
        >Iniciar sesión</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../api/config.js";

export default {
  data() {
    return {
      errorMessage: "",
      form: {
        name: "Ramon",
        email: "ramon@gmail.com",
        password: "12345678",
      },
    };
  },
  methods: {
    register() {
      axios
        .post(`${API_URL}/register`, { ...this.form })
        .then((result) => {
          if (result.data.accessToken) {
            localStorage.setItem(
              "api-token",
              result.data.tokenType + " " + result.data.accessToken
            );
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.neon-ring {
  box-shadow: 0 0 10px #ff8225, 0 0 3px #ff8225, 0 0 4px #ff8225;
}
</style>
