class Cliente {
    constructor(id, ultimaAlteracao, criadoEm, nome, email, cpf, dataNascimento) {
      this.id = id || 0;
      this.ultimaAlteracao = ultimaAlteracao || new Date().toISOString();
      this.criadoEm = criadoEm || new Date().toISOString();
      this.nome = nome || '';
      this.email = email || '';
      this.cpf = cpf || '';
      this.dataNascimento = dataNascimento || new Date().toISOString();
    }

    static fromMap(clienteMap) {
        return new Cliente(
          clienteMap.id,
          clienteMap.ultimaAlteracao,
          clienteMap.criadoEm,
          clienteMap.nome,
          clienteMap.email,
          clienteMap.cpf,
          clienteMap.dataNascimento
        );
      }
    
      toMap() {
        return {
          id: this.id,
          ultimaAlteracao: this.ultimaAlteracao,
          criadoEm: this.criadoEm,
          nome: this.nome,
          email: this.email,
          cpf: this.cpf,
          dataNascimento: this.dataNascimento,
        };
      }
    }
  
  export default Cliente;