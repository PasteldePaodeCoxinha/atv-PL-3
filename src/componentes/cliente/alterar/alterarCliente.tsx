import { Component } from "react";
import Cliente from "../../../modelo/cliente";
import "./alterarCliente.css"
import Telefone from "../../../modelo/telefone";

type props = {
    cliente: Cliente
}

type state = {
    cliente: Cliente
    menuTel: Boolean
    novoDdd: string
    novoTel: string
}

export default class AlterarCliente extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: props.cliente,
            menuTel: false,
            novoDdd: "",
            novoTel: ""
        }
        this.menuAdicionarTelefone = this.menuAdicionarTelefone.bind(this)
        this.adicionarTelefone = this.adicionarTelefone.bind(this)
        this.deletarTelefone = this.deletarTelefone.bind(this)

        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorNomeSocial = this.mudarValorNomeSocial.bind(this)

        this.mudarValorEmail = this.mudarValorEmail.bind(this)

        this.formatarData = this.formatarData.bind(this)
    }

    adicionarTelefone() {
        this.state.cliente.getTelefones.push(new Telefone(this.state.novoDdd, this.state.novoTel))
        this.setState({
            menuTel: false
        })
    }

    deletarTelefone(numero: string) {
        this.state.cliente.getTelefones.splice((this.state.cliente.getTelefones.findIndex(t => t.getNumero === numero)), 1)
        this.setState({
            cliente: this.state.cliente
        })
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        const cliente = this.state.cliente
        cliente.nome = e.target.value
        this.setState({
            cliente: cliente
        })
    }

    mudarValorNomeSocial(e: React.ChangeEvent<HTMLInputElement>) {
        const cliente = this.state.cliente
        cliente.nomeSocial = e.target.value
        this.setState({
            cliente: cliente
        })
    }

    mudarValorEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const cliente = this.state.cliente
        cliente.setEmail = e.target.value
        this.setState({
            cliente: cliente
        })
    }

    menuAdicionarTelefone() {
        return (
            <div className="menuAddTel">
                <input type="text" placeholder="DDD" className="inputAddNovoTelDDD" onChange={e => this.setState({ novoDdd: e.target.value })} />
                <input type="text" placeholder="Telefone" className="inputAddNovoTelNum" onChange={e => this.setState({ novoTel: e.target.value })} />
                <button className="botaoConfirmarTel" onClick={this.adicionarTelefone}>Confirmar</button>
            </div>
        )
    }

    formatarData(data: Date): string {
        const dataPartes = (data.toISOString().split("T")[0]).split("-")
        const dataCerta = dataPartes[2] + "/" + dataPartes[1] + "/" + dataPartes[0]
        return dataCerta
    }

    render() {
        return (
            <div className="containerInformacoesCliente">
                <div className="campoClienteEditavel">
                    <label>Nome:</label>
                    <input type="text" value={this.state.cliente.nome} onChange={this.mudarValorNome} />
                </div>

                <div className="campoClienteEditavel">
                    <label>Nome Social:</label>
                    <input type="text" value={this.state.cliente.nomeSocial} onChange={this.mudarValorNomeSocial} />
                </div>

                <div className="campoClienteEditavel">
                    <label>Email:</label>
                    <input type="email" value={this.state.cliente.getEmail} onChange={this.mudarValorEmail} />
                </div>

                <div className="campoClienteFixo">
                    <label>CPF:</label>
                    <p>{this.state.cliente.getCpf.getValor} | {this.formatarData(this.state.cliente.getCpf.getDataEmissao)}</p>
                </div>

                <div className="campoClienteFixo">
                    <label>RG:</label>
                    <p>{this.state.cliente.getRgs[0].getValor} | {this.formatarData(this.state.cliente.getRgs[0].getDataEmissao)}</p>
                </div>

                <div className="campoClienteFixo">
                    <label>Qtd Produtos Consumidos:</label>
                    <p>{this.state.cliente.getProdutosConsumidos.length}</p>
                </div>

                <div className="campoClienteFixo">
                    <label>Qtd Serviços consumidos:</label>
                    <p>{this.state.cliente.getServicosConsumidos.length}</p>
                </div>

                <div className="campoClienteFixo">
                    <label>Total gasto:</label>
                    <p>R$ {((this.state.cliente.getValorGasto * 100) * 0.01).toFixed(2).replace(".", ",")}</p>
                </div>

                <div className="campoClienteFixo">
                    <label>Telefone 1:</label>
                    <p>+{this.state.cliente.getTelefones[0].getDdd} {this.state.cliente.getTelefones[0].getNumero}</p>
                    {this.state.cliente.getTelefones[1] ?
                        (
                            <button onClick={() => this.deletarTelefone(this.state.cliente.getTelefones[0].getNumero)}
                                className="botaoDeletarTelCliente">
                                Deletar Telefone
                            </button>
                        )
                        :
                        (<></>)
                    }
                </div>

                {this.state.cliente.getTelefones[1] ?
                    (
                        <div className="campoClienteFixo">
                            <label>Telefone 2:</label>
                            <p>+{this.state.cliente.getTelefones[1].getDdd} {this.state.cliente.getTelefones[1].getNumero}</p>
                            <button onClick={() => this.deletarTelefone(this.state.cliente.getTelefones[0].getNumero)}
                                className="botaoDeletarTelCliente">
                                Deletar Telefone
                            </button>
                        </div>
                    )
                    :
                    this.state.menuTel ? (
                        this.menuAdicionarTelefone()
                    ) : (
                        <button onClick={() => this.setState({ menuTel: true })}
                            className="botaoAddTelCliente">Adicionar Telefone
                        </button>
                    )
                }
            </div>)
    }
}