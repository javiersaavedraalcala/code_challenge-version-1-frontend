<template>
  <div>
    <h2 class="text-center text-xl mt-28">Lista de Contactos</h2>
    <button
      class="block mx-auto underline text-[#FF8225]"
      @click="$router.push('create-contact')"
    >
      Crear contacto
    </button>
    <table class="mx-auto mt-10 table-auto">
      <thead>
        <tr>
          <th class="px-10">#</th>
          <th class="px-10">Nombre</th>
          <th class="px-10">Email</th>
          <th class="px-10">Phone</th>
          <th class="px-14 py-1">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in contacts" :key="item.id" class="text-center">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td class="py-1">
            <button
              @click="$router.push({ name: 'update', params: { id: item.id } })"
              class="bg-gray-100 px-2 py-1 rounded-md"
            >
              Editar
            </button>
            <button
              @click="deleteItem(item.id)"
              class="ml-2 bg-red-100 px-2 py-1 rounded-md"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "../api/config.js";

export default {
  data() {
    return {
      contacts: [],
    };
  },
  methods: {
    loadData() {
      axios
        .get(`${API_URL}/contacts`, {
          headers: {
            Authorization: localStorage.getItem("api-token"),
          },
        })
        .then((response) => {
          this.contacts = response.data.data;
        });
    },
    deleteItem(id) {
      let response = confirm("¿Estas seguro de eliminar este contacto?");

      if (response) {
        axios
          .delete(`${API_URL}/contacts/${id}`, {
            headers: {
              Authorization: localStorage.getItem("api-token"),
            },
          })
          .then((response) => {
            this.loadData();
          });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
