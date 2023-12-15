import axios from "axios";

const API_URL = 'https://modeloproxyapi.interfocus.com.br:4443/api/'

export default class ClientController {

    async getAllClients(clientID) {
        console.log(clientID)
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Cliente/GetOData'
        try{
            const response = await axios.get(endpoint)
            
            var listAllClients = response.data.d.results
            return listAllClients;
        } catch (error) {
            console.error('Erro ao obter cliente:', error);
            throw error;
          }
    }

    async registerClient(client) {
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Cliente'

        console.log('client recebido ↓↓')
        console.log(client)

        console.log('tentando fazer post do cliente')

        try{
            const response = await axios.post(
                    endpoint,
                    {
                        "nome": client.nome,
                        "email": client.email,
                        "cpf": client.cpf,
                        "dataNascimento": client.dataNascimento
                    }
                )
            
                if (response.status >= 200 && response.status < 300) {
                    console.log('Requisição bem-sucedida');
                    console.log('Resposta da API (registrar cliente):', response.data);
                  } else {
                    console.error('Erro na requisição (registrar cliente):', response.status);
                  }
        } catch (error) {
            console.error('Erro ao registrar cliente:', error);
            throw error;
          }
    }

    async editClient(client) {
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Cliente'

        console.log('client recebido PUT ↓↓')
        console.log(client)

        console.log('tentando fazer put do cliente')

        try{
            const response = await axios.put(
                    endpoint,
                    {
                        "nome": client.nome,
                        "email": client.email,
                        "cpf": client.cpf,
                        "dataNascimento": client.dataNascimento,
                        "id": client.id
                    }
                )
            
                if (response.status >= 200 && response.status < 300) {
                    console.log('Requisição bem-sucedida');
                    console.log('Resposta da API (editar cliente):', response.data);
                  } else {
                    console.error('Erro na requisição (editar cliente):', response.status);
                  }
        } catch (error) {
            console.error('Erro ao registrar cliente:', error);
            throw error;
          }
    }
} 