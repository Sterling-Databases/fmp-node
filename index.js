require('dotenv').config()

const axios = require('axios');

class FmpDataApi{
  /*
      https://fmhelp.filemaker.com/docs/18/en/dataapi/
      containers, globals, and scripts not done yet - 2020-06-13 - JM
      
  */
    constructor(){
        this.headers = {
            'Content-Type': 'application/json', 
            'Authorization': null
        };
        this.token = null;
        this.layout = null;
        this.database = process.env.FMP_DATABASE;
        this.baseUrl = `${process.env.FMP_HOST}/fmi/data/v1/databases/${this.database}`;

        this.resetThisData();
    }

    resetThisData(){
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
    setThisError(error){
      this.error = true;
      this.response = error.response.data;
      this.message = error.response.data.messages;
      this.status = error.response.status;
      this.statusText = error.response.statusText;
      this.httpResponce = error;
    }
    setThisResponse(response){
      this.error = false;
      this.response = response.data.response;
      this.message = response.data.messages;
      this.status = response.status;
      this.statusText = response.statusText; 
    }

    async login() {
        this.resetThisData();
        const authBuffer = new Buffer.from(`${process.env.FMP_USERNAME}:${process.env.FMP_PASSWORD}`);
        const base64Auth = authBuffer.toString('base64');
    
        const axiosUrl = `${this.baseUrl}/sessions`;
      
        try {
          this.httpResponce = await axios
            .post(axiosUrl,null,{headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${base64Auth}`}})
            .then(response => {
                
              this.headers.Authorization = `Bearer ${response.data.response.token}`
              this.token = response.data.response.token;
              this.setThisResponse(response);
              return response.data;
            });
        } catch (error) {
          this.setThisError(error);
        } finally {
          return this.httpResponce;
        }
    }

    async logout(fmpToken) {
      this.resetThisData();

        const axiosUrl = `${this.baseUrl}/sessions/${this.token}`;
      
        try {
          this.httpResponce = await axios
            .delete(axiosUrl)
            .then(response => {
              this.setThisResponse(response);
              return response.data;
            });
        } catch (error) {
          this.setThisError(error);
        } finally {
          return this.httpResponce;
        }
    }

    async getRecord(fmpId) {
      this.resetThisData();
  
      const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records/${fmpId}`;
    
        try {
          this.httpResponce = await axios
            .get(
                axiosUrl,
                {headers:this.headers},
            )
            .then(response => {
              this.setThisResponse(response);
              return response.data;
            });
        } catch (error) {
          this.setThisError(error);
        } finally {
          return this.httpResponce;
        }
    }

    async findAllRecords() {
      this.resetThisData();
  
      const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records`;
    
        try {
          this.httpResponce = await axios
            .get(
                axiosUrl,
                {headers:this.headers},
            )
            .then(response => {
              this.setThisResponse(response);
              return response.data;
            });
        } catch (error) {
          this.setThisError(error);
        } finally {
          return this.httpResponce;
        }
    }

    async findRecords(recordData) {
      this.resetThisData();
 
      const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/_find`;
      try {
        this.httpResponce = await axios
          .post(
              axiosUrl,
              recordData,
              {headers:this.headers},
          )
          .then(response => {
            this.setThisResponse(response);
            return response.data;
          });
      } catch (error) {
        this.setThisError(error);
      } finally {
        return this.httpResponce;
      }
    }
    async addRecord(recordData) {
      this.resetThisData();
 
      const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records`;
      try {
        this.httpResponce = await axios
          .post(
              axiosUrl,
              recordData,
              {headers:this.headers},
          )
          .then(response => {
            this.setThisResponse(response);
            return response.data;
          });
      } catch (error) {
        this.setThisError(error);
      } finally {
        return this.httpResponce;
      }
    }

    async duplicateRecord(fmpId) {
      this.resetThisData();
  
      const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records/${fmpId}`;
    
        try {
          this.httpResponce = await axios
            .post(
                axiosUrl,
                null,
                {headers:this.headers},
            )
            .then(response => {
              this.setThisResponse(response);
              return response.data;
            });
        } catch (error) {
          this.setThisError(error);
        } finally {
          return this.httpResponce;
        }
    }

    async editRecord(fmpId, recordData) {
      this.resetThisData();
 
      const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records/${fmpId}`;
      try {
        this.httpResponce = await axios
          .patch(
              axiosUrl,
              recordData,
              {headers:this.headers},
          )
          .then(response => {
            this.setThisResponse(response);
            return response.data;
          });
      } catch (error) {
        this.setThisError(error);
      } finally {
        return this.httpResponce;
      }
    }

    async deleteRecord(fmpId) {
      this.resetThisData();
  
      const axiosUrl = `${this.baseUrl}/layouts/${this.layout}/records/${fmpId}`;
    
        try {
          this.httpResponce = await axios
            .delete(
                axiosUrl,
                {headers:this.headers},
            )
            .then(response => {
              this.setThisResponse(response);
              return response.data;
            });
        } catch (error) {
          this.setThisError(error);
        } finally {
          return this.httpResponce;
        }
    }

  async productInfo() {
      this.resetThisData();
      const authBuffer = new Buffer.from(`${process.env.FMP_USERNAME}:${process.env.FMP_PASSWORD}`);
      const base64Auth = authBuffer.toString('base64');
  
      const axiosUrl = `${process.env.FMP_HOST}/fmi/data/v1/productInfo`;
    
      try {
        this.httpResponce = await axios
          .get(axiosUrl,null,{headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${base64Auth}`}})
          .then(response => {
              
            this.headers.Authorization = `Bearer ${response.data.response.token}`
            this.token = response.data.response.token;
            this.setThisResponse(response);
            return response.data;
          });
      } catch (error) {
        this.setThisError(error);
      } finally {
        return this.httpResponce;
      }
  }

  async databaseNames() {
    this.resetThisData();
    const authBuffer = new Buffer.from(`${process.env.FMP_USERNAME}:${process.env.FMP_PASSWORD}`);
    const base64Auth = authBuffer.toString('base64');

    const axiosUrl = `${process.env.FMP_HOST}/fmi/data/v1/databases`;
  
    try {
      this.httpResponce = await axios
        .get(axiosUrl,{headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${base64Auth}`}})
        .then(response => {
            
          this.headers.Authorization = `Bearer ${response.data.response.token}`
          this.token = response.data.response.token;
          this.setThisResponse(response);
          return response.data;
        });
    } catch (error) {
      this.setThisError(error);
    } finally {
      return this.httpResponce;
    }
  }

  async layoutNames() {
    this.resetThisData();

    const axiosUrl = `${this.baseUrl}/layouts`;
  
      try {
        this.httpResponce = await axios
          .get(
              axiosUrl,
              {headers:this.headers},
          )
          .then(response => {
            this.setThisResponse(response);
            return response.data;
          });
      } catch (error) {
        this.setThisError(error);
      } finally {
        return this.httpResponce;
      }
  }
  async scriptNames() {
    this.resetThisData();

    const axiosUrl = `${this.baseUrl}/scripts`;
  
      try {
        this.httpResponce = await axios
          .get(
              axiosUrl,
              {headers:this.headers},
          )
          .then(response => {
            this.setThisResponse(response);
            return response.data;
          });
      } catch (error) {
        this.setThisError(error);
      } finally {
        return this.httpResponce;
      }
  }
  async layoutDetails() {
    this.resetThisData();

    const axiosUrl = `${this.baseUrl}/layouts/${this.layout}`;
  
      try {
        this.httpResponce = await axios
          .get(
              axiosUrl,

              {headers:this.headers},
          )
          .then(response => {
            this.setThisResponse(response);
            return response.data;
          });
      } catch (error) {
        this.setThisError(error);
      } finally {
        return this.httpResponce;
      }
  }
}

 export { FmpDataApi };
