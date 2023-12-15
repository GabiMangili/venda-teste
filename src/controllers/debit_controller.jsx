import axios from "axios";

export default class DebitController {
    async getDebitsOpen() {
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Divida/GetOData?%24filter=dataPagamento%20eq%20null';

        try {
            const response = await axios.get(endpoint)
            var listDebitsOpen = response.data.d.results
            return listDebitsOpen
        } catch (error) {
            console.error('Erro ao obter dívida: ', error)
            throw error
        }
    }

    async getDebitsByClientId(clientId) {
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Divida/GetOData?%24filter=cliente%2Fid%20eq%20' + clientId;

        try {
            const response = await axios.get(endpoint)
            var listDebits = response.data.d.results
            return listDebits
        } catch (error) {
            console.error('Erro ao obter dívida: ', error)
            throw error
        }
    }

    async payDebit(debitId) {
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Divida/Pagar'

        try{
            const response = await axios.put(endpoint, 
                {
                    "dividaId": debitId
                })
                if (response.status >= 200 && response.status < 300) {
                    console.log('Requisição bem-sucedida');
                    console.log('Resposta da API (pagar debito):', response.data);
                  } else {
                    console.error('Erro na requisição (pagar debito):', response.status);
                  }
        } catch (error) {
            console.error('Erro ao fazer a requisição PUT:', error);
        }
    }

    async createDebit(debit){
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Divida'

        try{
            const response = await axios.post(
                endpoint,
                {
                    "valor": debit.valor,
                    "dataPagamento": debit.dataPagamento,
                    "descricao": debit.descricao,
                    "clienteId": debit.clienteId
                  }
            )

            if (response.status >= 200 && response.status < 300) {
                console.log('Requisição bem-sucedida');
                console.log('Resposta da API (criar debito):', response.data);
              } else {
                console.error('Erro na requisição (criar debito):', response.json());
              }

        } catch (error){
                if (error.response) {
                    // O servidor retornou uma resposta com um código de status diferente de 2xx
                    console.error('Erro na requisição PUT:', error.response.status);
                    console.error('Detalhes do erro:', error.response.data);
                } else if (error.request) {
                    // A requisição foi feita, mas não recebeu resposta
                    console.error('Erro na requisição PUT: Sem resposta do servidor');
                } else {
                    // Algum outro erro ocorreu
                    console.error('Erro na requisição PUT:', error.message);
                }
                throw error
        }
    }
}