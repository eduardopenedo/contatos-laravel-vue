import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [],
    contact: null
  },
  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts;
    },
    SET_CONTACT(state, contact) {
      state.contact = contact;
    }
  },
  actions: {
    async fetchContacts({ commit }) {
      const response = await axios.get('/api/contacts');
      commit('SET_CONTACTS', response.data);
    },
    async saveContact({ dispatch }, contact) {
      await axios.post('/api/contacts', contact);
      dispatch('fetchContacts');
    }
  }
});
