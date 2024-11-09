/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaProdutos.css"
import Produto from "../../../modelo/produto";
import AlterarProduto from "../alterar/alterarProduto";
import Cliente from "../../../modelo/cliente";

type props = {
    produtos: Produto[]
    clientes: Cliente[]
}

type state = {
    produtos: Produto[],
    produto: Produto | undefined,
    ordemLista: number,
    listaTipos: string[],
    listaRacas: Array<Array<string>>,
    racaEscolhida: string,
    tipoEscolhida: string
}

export default class ListaProdutos extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            produtos: props.produtos,
            produto: undefined,
            ordemLista: 0,
            listaTipos: [],
            listaRacas: [],
            racaEscolhida: "",
            tipoEscolhida: "",
        }
        this.gerarListaProduto = this.gerarListaProduto.bind(this)
        this.excluirProduto = this.excluirProduto.bind(this)
        this.pegarUmProduto = this.pegarUmProduto.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaProduto()

        this.props.clientes.forEach(c => {
            c.getPets.forEach(p => {
                if (!this.state.listaTipos.find(t => t === p.getTipo)) {
                    this.state.listaTipos.push(p.getTipo)
                }
                if (!this.state.listaRacas.find(r => r[1] === p.getRaca)) {
                    this.state.listaRacas.push([p.getTipo, p.getRaca])
                }
            })
        })
    }

    componentDidUpdate(): void {
        this.gerarListaProduto()
    }

    pegarUmProduto(nome: string) {
        const produto = this.state.produtos.find(c => c.nome === nome)
        this.setState({
            produto: produto,
        })
    }

    excluirProduto(nome: string) {
        this.state.produtos.splice((this.state.produtos.findIndex(c => c.nome === nome)), 1)
        this.setState({
            produtos: this.state.produtos
        })
    }

    gerarListaProduto() {
        if (this.state.produtos.length <= 0) {
            return <></>
        } else {
            let produtos = this.state.produtos

            if (this.state.ordemLista === 0) {
                produtos = this.props.produtos
            } else if (this.state.ordemLista === 1) {
                produtos = this.state.produtos.toSorted((a, b) => b.getCompraram - a.getCompraram)
            } else if (this.state.ordemLista === 2) {
                const sortTipo = (a: Produto, b: Produto): number => {
                    return ((b.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === this.state.tipoEscolhida.toLocaleLowerCase()).length)
                        -
                        (a.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === this.state.tipoEscolhida.toLocaleLowerCase()).length))
                }
                produtos = this.state.produtos.toSorted(sortTipo)

                if (this.state.racaEscolhida !== "") {
                    const sortRaca = (a: Produto, b: Produto): number => {
                        return ((b.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === this.state.racaEscolhida.toLocaleLowerCase()).length)
                            -
                            (a.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === this.state.racaEscolhida.toLocaleLowerCase()).length))
                    }
                    produtos = this.state.produtos.toSorted(sortRaca)
                }
            }

            let listaProduto = produtos.map((p, i) =>
                <tr className="linhaTabelaProdutos" key={i} onClick={() => this.pegarUmProduto(p.nome)
                }>
                    <td>{p.nome}</td>
                    <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                    <td><button className="botaExcluirProduto" onClick={() => this.excluirProduto(p.nome)}>Excluir</button></td>
                </tr>
            )
            return listaProduto
        }
    }

    render() {
        return (
            <div className="containerListaProduto">
                {this.state.produto === undefined ? (
                    <div className="produtosCadastrados">

                        <select className="seletorOrdemListaProduto"
                            onChange={e => this.setState({ ordemLista: Number(e.target.value).valueOf() })}
                        >
                            <option value={0}>Ordenar por ordem cadastrado</option>
                            <option value={1}>Ordenar mais vendidos</option>
                            <option value={2}>Ordenar por mais consumidos por tipo e raça</option>
                        </select>

                        {this.state.ordemLista === 2 ? (
                            <div className="seletoresDeTipoRacaProduto">
                                <select className="seletorOrdemListaProduto"
                                    onChange={e => this.setState({ tipoEscolhida: e.target.value })}
                                    value={this.state.tipoEscolhida}
                                >
                                    <option value="" disabled>Selecione o tipo do pet</option>
                                    {this.state.listaTipos.map(t => {
                                        return (
                                            <option value={t}>{t}</option>
                                        )
                                    })
                                    }
                                </select>

                                <select className="seletorOrdemListaProduto"
                                    onChange={e => this.setState({ racaEscolhida: e.target.value })}
                                    value={this.state.racaEscolhida}
                                >
                                    <option value="" disabled>Selecione a raça do pet</option>
                                    {this.state.listaRacas.filter(r => r[0] === this.state.tipoEscolhida).map(t => {
                                        return (
                                            <option value={t[1]}>{t[1]}</option>
                                        )
                                    })

                                    }
                                </select>
                            </div>
                        ) : (
                            <></>
                        )

                        }

                        <table className="tabelaProdutos">
                            <thead>
                                <tr className="headerTabelaProdutos">
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.gerarListaProduto()}
                            </tbody>
                        </table>
                    </div>

                ) : (

                    <>
                        <button className="botaVoltarListagemProduto" onClick={() => { this.setState({ produto: undefined }) }}>
                            Voltar
                        </button>
                        <AlterarProduto produto={this.state.produto} listaTipos={this.state.listaTipos} listaRacas={this.state.listaRacas} />
                    </>

                )}
            </div>
        )
    }
}