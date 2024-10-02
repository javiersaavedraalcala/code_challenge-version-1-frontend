<template>
  <div>
    <h2 class="text-center text-xl mt-28">Editar Contacto</h2>
    <form
      @submit.prevent="saveContact()"
      class="mx-auto w-[600px] bg-[#F8EDED] px-6 pt-14 pb-20 rounded-lg mt-6"
    >
      <div>
        <label for="name" class="text-[#173B45]">Nombre: </label>
        <input
          type="text"
          id="name"
          class="w-full bg-gray-50 py-1 px-4 border-2 rounded-md text-[#173B45] focus:outline-[#B43F3F]"
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
          class="w-full bg-gray-50 py-1 px-4 border-2 rounded-md text-[#173B45] focus:outline-[#B43F3F]"
          required
          autocomplete="off"
          v-model="form.email"
        />
      </div>
      <div class="mt-2">
        <label for="phone" class="text-[#173B45]">Phone: </label>
        <input
          type="text"
          id="phone"
          class="w-full bg-gray-50 py-1 px-4 border-2 rounded-md text-[#173B45] focus:outline-[#B43F3F]"
          required
          autocomplete="off"
          minlength="10"
          maxlength="12"
          v-model="form.phone"
        />
      </div>
      <button
        class="mt-8 w-full px-4 py-3 bg-[#B43F3F] text-white rounded-md hover:opacity-95"
      >
        Guardar
      </button>
      <router-link to="/" class="block mt-2 w-full text-center underline"
        >Volver atrás</router-link
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../api/config.js";

export default {
  data() {
    return {
      id: null,
      form: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    saveContact() {
      axios
        .put(
          `${API_URL}/contacts/${this.id}`,
          { ...this.form },
          {
            headers: {
              Authorization: localStorage.getItem("api-token"),
            },
          }
        )
        .then((response) => {
          alert("Contacto actualizada exitosamente...");
        });
    },
    loadContact() {
      axios
        .get(`${API_URL}/contacts/${this.id}`, {
          headers: {
            Authorization: localStorage.getItem("api-token"),
          },
        })
        .then((response) => {
          this.form = response.data.data;
        });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.loadContact();
  },
};
</script>
