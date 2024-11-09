import { Component, ReactNode } from "react";
import Cliente from "../../../modelo/cliente";
import Servico from "../../../modelo/servico";
import "./registroCompraServico.css"
import Pet from "../../../modelo/pet";

type props = {
    clientes: Cliente[],
    servicos: Servico[]
}

type state = {
    cliente: Cliente | undefined,
    servico: Servico | undefined,
    pet: Pet | undefined,
    textoAviso: string,
    nomeServico: string,
    nomePet: string,
    qtdServicos: number
}

export default class RegistroCompraServico extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            servico: undefined,
            pet: undefined,
            textoAviso: "Selecione um cliente!",
            nomeServico: "",
            nomePet: "",
            qtdServicos: 0
        }

        this.selecionarCliente = this.selecionarCliente.bind(this)
        this.registrarCompra = this.registrarCompra.bind(this)
    }

    selecionarCliente(n: string) {
        const cliente = this.props.clientes.find(c => c.nome === n)
        if (cliente) {
            this.setState({
                cliente: cliente,
                textoAviso: "Selecione um serviço!"
            })
        }
    }

    registrarCompra() {
        if (this.state.cliente && this.state.servico && this.state.pet) {
            for (let i = 0; i < this.state.qtdServicos; i++) {
                const cliente = this.state.cliente
                const servico = this.state.servico
                const pet = this.state.pet

                cliente.getServicosConsumidos.push(servico)
                cliente.setValorGasto = cliente.getValorGasto + Number(((servico.preco * 100) * 0.01).toFixed(2)).valueOf()
                servico.compraramMaisUm()
                servico.getRacasCompraram.push([pet.getTipo, pet.getRaca])

                this.setState({
                    cliente: cliente,
                    servico: servico,
                    pet: pet
                })
            }
        } else {
            this.setState({
                textoAviso: "Preencha todos os campos!"
            })
            return
        }

        this.setState({
            textoAviso: "Compra registrada!",
            servico: undefined,
            qtdServicos: 0,
            nomeServico: "",
            nomePet: ""
        })

        setTimeout(() => {
            this.setState({
                textoAviso: "Selecione um serviço!"
            })
        }, 1500)
    }

    render(): ReactNode {
        return (
            <div className="containerRegistroServico">

                <div className="containerAvisoRegistroServico">
                    <p className="textoAvisoRegistroServico">{this.state.textoAviso}</p>
                </div>

                <div className="containerTabelaResgistroServico">
                    {!this.state.cliente ? (
                        <table className="tabelaRegistroServicoClientes">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.clientes.map((c, i) => {
                                    return (
                                        <tr className={c.nome === this.state.cliente?.nome ? "linhaSelecionadaRegistroServico" : ""}
                                            key={i}
                                            onClick={() => this.selecionarCliente(c.nome)}>
                                            <td>{c.nome}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="menuRegistroCompraServico">
                            <button className="botaVoltarRegistroServico" onClick={() => { this.setState({ cliente: undefined }) }}>
                                Voltar
                            </button>

                            <div className="containerSeletorServico">
                                <select className="seletorServico"
                                    onChange={e => {
                                        this.setState({
                                            servico: this.props.servicos.find(s => s.nome === e.target.value),
                                            nomeServico: e.target.value
                                        })
                                    }}
                                    value={this.state.nomeServico}
                                >
                                    <option value="" disabled>Selecione o servico</option>
                                    {this.props.servicos.map((p, i) => {
                                        return (
                                            <option
                                                value={p.nome}
                                                key={i}>
                                                {p.nome}
                                            </option>
                                        )
                                    })}
                                </select>

                                <select className="seletorProduto"
                                    onChange={e => {
                                        this.setState({
                                            pet: this.state.cliente?.getPets.find(p => p.getNome === e.target.value),
                                            nomePet: e.target.value
                                        })
                                    }}
                                    value={this.state.nomePet}
                                >
                                    <option value="" disabled>Selecione o Pet</option>
                                    {this.state.cliente.getPets.map((p, i) => {
                                        return (
                                            <option
                                                value={p.getNome}
                                                key={i}>
                                                {p.getNome}
                                            </option>
                                        )
                                    })}
                                </select>

                                <input type="number"
                                    className="qtdServicosEscolher"
                                    value={this.state.qtdServicos}
                                    onChange={e => {
                                        this.setState({
                                            qtdServicos: Number(e.target.value).valueOf()
                                        })
                                    }}
                                />
                            </div>

                            <button className="botaResgitrarCompraServico"
                                onClick={() => this.registrarCompra()}
                            >
                                <p>
                                    Registrar
                                </p>
                            </button>
                        </div>
                    )}
                </div>

            </div>
        )
    }
}