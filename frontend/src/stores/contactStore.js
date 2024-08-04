import { defineStore } from 'pinia';
import instance from '@/service/axios.js';
import { useAuthStore } from './authStore';

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [],
    contact: null,
    errors:[]
  }),
  actions: {
    async fetchContacts() {
      const authStore = useAuthStore();
      const token = authStore.token;
      
      const response = await instance.get('secure/contacts/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
  
      this.contacts = response.data;
    },
    async fetchContact(id) {
      const authStore = useAuthStore();
      const token = authStore.token;

      const response = await instance.get(`/secure/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      this.contact = response.data;
    },
    async addContact(contact) {
      try {
        const authStore = useAuthStore();
        const token = authStore.token;

        await instance.post('/secure/contacts', contact, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        await this.fetchContacts();
      } catch (error) {
        this.errors= []
        this.errors.push(error.response.data.message);
      }
      
      
      await this.fetchContacts();
    },
    async updateContact(contact) {
      const authStore = useAuthStore();
      const token = authStore.token;

      await instance.put(`/secure/contacts/${contact.id}`, contact, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      await this.fetchContacts();
    },
    async deleteContact(id) {
      const authStore = useAuthStore();
      const token = authStore.token;

      await instance.delete(`/secure/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      await this.fetchContacts();
    },
  },
});
