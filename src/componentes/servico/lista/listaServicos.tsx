/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaServicos.css"
import Servico from "../../../modelo/servico";
import AlterarServico from "../alterar/alterarServico";
import Cliente from "../../../modelo/cliente";

type props = {
    servicos: Servico[],
    clientes: Cliente[]
}

type state = {
    servicos: Servico[]
    servico: Servico | undefined
    ordemLista: number,
    listaTipos: string[],
    listaRacas: Array<Array<string>>,
    racaEscolhida: string,
    tipoEscolhida: string
}

export default class ListaServicos extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            servicos: props.servicos,
            servico: undefined,
            ordemLista: 0,
            listaTipos: [],
            listaRacas: [],
            racaEscolhida: "",
            tipoEscolhida: "",
        }
        this.gerarListaServico = this.gerarListaServico.bind(this)
        this.excluirServico = this.excluirServico.bind(this)
        this.pegarUmServico = this.pegarUmServico.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaServico()

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
        this.gerarListaServico()
    }

    pegarUmServico(nome: string) {
        const servico = this.state.servicos.find(c => c.nome === nome)
        this.setState({
            servico: servico,
        })
    }

    excluirServico(nome: string) {
        this.state.servicos.splice((this.state.servicos.findIndex(c => c.nome === nome)), 1)
        this.setState({
            servicos: this.state.servicos
        })
    }

    gerarListaServico() {
        if (this.state.servicos.length <= 0) {
            return <></>
        } else {
            let servicos = this.state.servicos

            if (this.state.ordemLista === 0) {
                servicos = this.props.servicos
            } else if (this.state.ordemLista === 1) {
                servicos = this.state.servicos.toSorted((a, b) => b.getCompraram - a.getCompraram)
            } else if (this.state.ordemLista === 2) {
                const sortTipo = (a: Servico, b: Servico): number => {
                    return ((b.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === this.state.tipoEscolhida.toLocaleLowerCase()).length)
                        -
                        (a.getRacasCompraram.filter(r => r[0].toLocaleLowerCase() === this.state.tipoEscolhida.toLocaleLowerCase()).length))
                }
                servicos = this.state.servicos.toSorted(sortTipo)

                if (this.state.racaEscolhida !== "") {
                    const sortRaca = (a: Servico, b: Servico): number => {
                        return ((b.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === this.state.racaEscolhida.toLocaleLowerCase()).length)
                            -
                            (a.getRacasCompraram.filter(r => r[1].toLocaleLowerCase() === this.state.racaEscolhida.toLocaleLowerCase()).length))
                    }
                    servicos = this.state.servicos.toSorted(sortRaca)
                }
            }

            let listaServico = servicos.map((p, i) =>
                <tr className="linhaTabelaServicos" key={i} onClick={() => this.pegarUmServico(p.nome)
                }>
                    <td>{p.nome}</td>
                    <td>R$ {((p.preco * 100) * 0.01).toFixed(2).replace(".", ",")}</td>
                    <td><button className="botaExcluirServico" onClick={() => this.excluirServico(p.nome)}>Excluir</button></td>
                </tr>
            )
            return listaServico
        }
    }

    render() {
        return (
            <div className="containerListaServico">
                {this.state.servico === undefined ? (
                    <div className="servicosCadastrados">

<select className="seletorOrdemListaServico"
                            onChange={e => this.setState({ ordemLista: Number(e.target.value).valueOf() })}
                        >
                            <option value={0}>Ordenar por ordem cadastrado</option>
                            <option value={1}>Ordenar mais vendidos</option>
                            <option value={2}>Ordenar por mais consumidos por tipo e raça</option>
                        </select>

                        {this.state.ordemLista === 2 ? (
                            <div className="seletoresDeTipoRacaServico">
                                <select className="seletorOrdemListaServico"
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

                                <select className="seletorOrdemListaServico"
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

                        <table className="tabelaServicos">
                            <thead>
                                <tr className="headerTabelaServicos">
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.gerarListaServico()}
                            </tbody>
                        </table>
                    </div>

                ) : (

                    <>
                        <button className="botaVoltarListagemServico" onClick={() => { this.setState({ servico: undefined }) }}>
                            Voltar
                        </button>
                        <AlterarServico servico={this.state.servico} listaTipos={this.state.listaTipos} listaRacas={this.state.listaRacas} />
                    </>

                )}
            </div>
        )
    }
}