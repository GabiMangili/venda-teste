import axios from "axios";

const API_URL = 'https://modeloproxyapi.interfocus.com.br:4443/api/'

export default class clientController {

    async getAllClients(clientID) {
        console.log(clientID)
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Cliente/GetOData'
        try{
            const response = await axios.get(endpoint)
            
            var listAllClients = response.data.d.results
            console.log('listAllClients')
            /* console.log(listAllClients) */
            return listAllClients;
        } catch (error) {
            console.error('Erro ao obter cliente:', error);
            throw error;
          }
    }
} 