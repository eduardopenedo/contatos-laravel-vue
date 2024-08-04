import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: false,
    user: {
      name: ''
    },
    token: null
  }),
  getters: {},
  actions: {
    async authenticate(email, password) {
      
      this.user = {
        name: 'Eduardo'
      }
      console.log(email,password)
      await axios.post('http://localhost:8000/api/auth/login/',{
        email,
        password,
      }
    )
      .then(response => {
        this.token=response.data.token;
        if(this.token){
          this.auth = true
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    },
    async register(pessoa){
      let errors = []
      
      await axios.post('http://localhost:8000/api/auth/register/', pessoa).then(
        data=> {this.user = data.data;this.auth=true},
        error=> {errors = error.response.data} 
      )
      
      return errors
    },
    logout() {
      this.auth = false
      this.token=null
    }
  },
  persist: true // Configura a persistência para essa store
})
