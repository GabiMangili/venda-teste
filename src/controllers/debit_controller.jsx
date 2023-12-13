import axios from "axios";

export default class DebitController {
    async getDebitsOpen() {
        const endpoint = 'https://modeloproxyapi.interfocus.com.br:4443/api/Divida/GetOData?%24filter=dataPagamento%20eq%20null';

        try {
            const response = await axios.get(endpoint)
            var listDebitsOpen = response.data.d.results
            console.log('listDebitsOpen')
            /* console.log(listDebitsOpen) */
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
}