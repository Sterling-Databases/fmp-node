require('dotenv').config()

const axios = require('axios');

class FmpDataApi{

    constructor(){
        this.headers = {
            'Content-Type': 'application/json', 
            'Authorization': null
        };
        this.token = null;
        this.layout = null;
        this.database = process.env.FMP_DATABASE;
        this.baseUrl = `${process.env.FMP_HOST}/fmi/data/v1/databases/${this.database}`;
        this.httpResponce = {};
        this.error = null;
        this.message = null;
        this.response = null;
        this.status = null;
        this.statusText = null;
    }

    setLayout(name){
        this.layout = name;
    }
    setDatabase(name){
      this.database = name;
  }
    async login() {
        const authBuffer = new Buffer.from(`${process.env.FMP_USERNAME}:${process.env.FMP_PASSWORD}`);
        const base64Auth = authBuffer.toString('base64');
    
        const axiosUrl = `${this.baseUrl}/sessions`;
        // let httpResponce = {};
      
        try {
          this.httpResponce = await axios
            .post(axiosUrl,null,{headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${base64Auth}`}})
            .then(response => {
                this.headers.Authorization = `Bearer ${response.data.response.token}`
                this.token = response.data.response.token;

                this.message = response.data.messages;
                this.response = response.data.response;
  
              return response.data.response.token;
            });
        } catch (error) {
          this.httpResponce = error;
        } finally {
          return this.httpResponce;
        }
    }
    async logout(fmpToken) {
    
        const axiosUrl = `${this.baseUrl}/sessions/${this.token}`;
      
        try {
          this.httpResponce = await axios
            .delete(axiosUrl)
            .then(response => {
                this.message = response.data.messages;
                this.response = response.data.response;
                return response.data;
            });
        } catch (error) {
          this.httpResponce = error;
        } finally {
          return this.httpResponce;
        }
    }
    async getRecord(fmpId) {
        const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records/${fmpId}`;
    
        try {
          this.httpResponce = await axios
            .get(
                axiosUrl,
                {headers:this.headers},
            )
            .then(response => {
              this.message = response.data.messages;
              this.response = response.data.response;
              return response.data;
            });
        } catch (error) {
          this.httpResponce = error;
        } finally {
          return this.httpResponce;
        }
    }
    async addRecord(recordData) {
        const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records`;
    
        try {
          this.httpResponce = await axios
            .post(
                axiosUrl,
                recordData,
                {headers:this.headers},
            )
            .then(response => {
              this.message = response.data.messages;
              this.response = response.data.response;
              return response.data;
            });
        } catch (error) {
          this.httpResponce = error;
        } finally {
          return this.httpResponce;
        }
    }
}

 export { FmpDataApi };
