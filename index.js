require('dotenv').config()

const axios = require('axios');

class FmpApi{

    constructor(){
        this.headers = {
            'Content-Type': 'application/json', 
            'Authorization': null
        };
        this.token = null;
        this.layout = null;
        this.baseUrl = `${process.env.FMP_BASE_URL}/databases/${process.env.FMP_DATABASE}`;
    }

    setLayout(layout){
        this.layout = layout;
    }

    async login() {
        const authBuffer = new Buffer.from(`${process.env.FMP_USERNAME}:${process.env.FMP_PASSWORD}`);
        const base64Auth = authBuffer.toString('base64');
    
        const axiosUrl = `${this.baseUrl}/sessions`;
        let httpResponce = {};
      
        try {
          httpResponce = await axios
            .post(axiosUrl,null,{headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${base64Auth}`}})
            .then(response => {
                this.headers.Authorization = `Bearer ${response.data.response.token}`
                this.token = response.data.response.token;
              return response.data.response.token;
            });
        } catch (error) {
          httpResponce = error;
        } finally {
          return httpResponce;
        }
    }
    async logout(fmpToken) {
    
        const axiosUrl = `${this.baseUrl}/sessions/${this.token}`;
        let httpResponce = {};
      
        try {
          httpResponce = await axios
            .delete(axiosUrl)
            .then(response => {
                return response.data;
            });
        } catch (error) {
          httpResponce = error;
        } finally {
          return httpResponce;
        }
    }
    async getRecord(fmpId) {
        const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records/${fmpId}`;
        let httpResponce = {};
    
        try {
          httpResponce = await axios
            .get(
                axiosUrl,
                {headers:this.headers},
            )
            .then(response => {
              return response.data;
            });
        } catch (error) {
          httpResponce = error;
        } finally {
          return httpResponce;
        }
    }
    async addRecord(recordData) {
        const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records`;
        let httpResponce = {};
    
        try {
          httpResponce = await axios
            .post(
                axiosUrl,
                recordData,
                {headers:this.headers},
            )
            .then(response => {
              return response.data;
            });
        } catch (error) {
          httpResponce = error;
        } finally {
          return httpResponce;
        }
    }
}

 export { FmpApi };
