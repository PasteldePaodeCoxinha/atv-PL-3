import { Component, ReactNode } from "react";
import Cliente from "../../../modelo/cliente";
import Produto from "../../../modelo/produto";
import "./registroCompraProduto.css"
import Pet from "../../../modelo/pet";

type props = {
    clientes: Cliente[],
    produtos: Produto[]
}

type state = {
    cliente: Cliente | undefined,
    produto: Produto | undefined,
    pet: Pet | undefined,
    textoAviso: string,
    nomeProduto: string,
    nomePet: string,
    qtdProdutos: number
}

export default class RegistroCompraProduto extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            produto: undefined,
            pet: undefined,
            textoAviso: "Selecione um cliente!",
            nomeProduto: "",
            nomePet: "",
            qtdProdutos: 0
        }

        this.selecionarCliente = this.selecionarCliente.bind(this)
        this.registrarCompra = this.registrarCompra.bind(this)
    }

    selecionarCliente(n: string) {
        const cliente = this.props.clientes.find(c => c.nome === n)
        if (cliente) {
            this.setState({
                cliente: cliente,
                textoAviso: "Selecione um produto!"
            })
        }
    }

    registrarCompra() {
        if (this.state.cliente && this.state.produto && this.state.pet) {
            for (let i = 0; i < this.state.qtdProdutos; i++) {
                const cliente = this.state.cliente
                const produto = this.state.produto
                const pet = this.state.pet

                cliente.getProdutosConsumidos.push(produto)
                cliente.setValorGasto = cliente.getValorGasto + Number(((produto.preco * 100) * 0.01).toFixed(2)).valueOf()
                produto.compraramMaisUm()
                produto.getRacasCompraram.push([pet.getTipo, pet.getRaca])

                this.setState({
                    cliente: cliente,
                    produto: produto,
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
            produto: undefined,
            qtdProdutos: 0,
            nomeProduto: "",
            nomePet: ""
        })

        setTimeout(() => {
            this.setState({
                textoAviso: "Selecione um produto!"
            })
        }, 1500)
    }

    render(): ReactNode {
        return (
            <div className="containerRegistroProduto">

                <div className="containerAvisoRegistroProduto">
                    <p className="textoAvisoRegistroProduto">{this.state.textoAviso}</p>
                </div>

                <div className="containerTabelaResgistroProduto">
                    {!this.state.cliente ? (
                        <table className="tabelaRegistroProdutoClientes">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.clientes.map((c, i) => {
                                    return (
                                        <tr className={c.nome === this.state.cliente?.nome ? "linhaSelecionadaRegistroProduto" : ""}
                                            key={i}
                                            onClick={() => this.selecionarCliente(c.nome)}>
                                            <td>{c.nome}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="menuRegistroCompraProduto">
                            <button className="botaVoltarRegistroProduto" onClick={() => { this.setState({ cliente: undefined }) }}>
                                Voltar
                            </button>

                            <div className="containerSeletorProduto">
                                <select className="seletorProduto"
                                    onChange={e => {
                                        this.setState({
                                            produto: this.props.produtos.find(p => p.nome === e.target.value),
                                            nomeProduto: e.target.value
                                        })
                                    }}
                                    value={this.state.nomeProduto}
                                >
                                    <option value="" disabled>Selecione o produto</option>
                                    {this.props.produtos.map((p, i) => {
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
                                    className="qtdProdutosEscolher"
                                    value={this.state.qtdProdutos}
                                    onChange={e => {
                                        this.setState({
                                            qtdProdutos: Number(e.target.value).valueOf()
                                        })
                                    }}
                                />
                            </div>

                            <button className="botaResgitrarCompraProduto"
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