/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./listaPets.css"
import Cliente from "../../../modelo/cliente";
import Pet from "../../../modelo/pet";
import AlterarPet from "../alterar/alterarPet";


type props = {
    clientes: Cliente[]
}

type state = {
    cliente: Cliente | undefined
    pet: Pet | undefined
    nomeCliente: string
}

export default class ListaPet extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            cliente: undefined,
            pet: undefined,
            nomeCliente: ""
        }
        this.gerarListaPet = this.gerarListaPet.bind(this)
        this.excluirPet = this.excluirPet.bind(this)
        this.procurarCliente = this.procurarCliente.bind(this)
        this.pegarUmPet = this.pegarUmPet.bind(this)
    }

    componentDidMount(): void {
        this.gerarListaPet()
    }

    componentDidUpdate(): void {
        this.gerarListaPet()
    }

    pegarUmPet(nome: string) {
        if (this.state.cliente) {
            const pet = this.state.cliente.getPets.find(p => p.getNome === nome)
            this.setState({
                pet: pet,
            })
        }
    }

    procurarCliente() {
        const cliente = this.props.clientes.find(c => c.nome === this.state.nomeCliente)
        this.setState({
            cliente: cliente,
        })
    }

    excluirPet(nome: string) {
        if (this.state.cliente) {
            this.state.cliente.getPets.splice((this.state.cliente.getPets.findIndex(p => p.getNome === nome)), 1)
            this.setState({
                cliente: this.state.cliente
            })
        }
    }

    gerarListaPet() {
        if (!this.state.cliente) {
            return <></>
        } else {
            let listaPet = this.state.cliente.getPets.map((p, i) =>
                <tr className="linhaTabelaPets" key={i} onClick={() => this.pegarUmPet(p.getNome)}>
                    <td>{p.getNome}</td>
                    <td>{p.getTipo}</td>
                    <td>{p.getGenero}</td>
                    <td><button className="botaExcluirPet" onClick={() => this.excluirPet(p.getNome)}>Excluir</button></td>
                </tr>
            )
            return listaPet
        }
    }

    render() {
        return (
            <div className="containerListaPet">
                {this.state.pet === undefined ? (
                    <>
                        <div className="procurarCliente">
                            <select className="seletorClienteListaPet"
                                onChange={e => this.setState({ nomeCliente: e.target.value })}
                                value={this.state.nomeCliente}>
                                <option value="" disabled>Selecione o dono</option>
                                {this.props.clientes.map((c, i) => {
                                    return (
                                        <option
                                            value={c.nome}
                                            key={i}>
                                            {c.nome}
                                        </option>
                                    )
                                })}
                            </select>

                            <button className="botaoProcurarCliente" onClick={this.procurarCliente}>
                                Procurar
                            </button>
                        </div>

                        {this.state.cliente !== undefined ? (
                            <div className="petsCadastrados">
                                <table className="tabelaPets">
                                    <thead>
                                        <tr className="headerTabelaPets">
                                            <th>Nome</th>
                                            <th>Tipo</th>
                                            <th>Genêro</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.gerarListaPet()}
                                    </tbody>
                                </table>
                            </div>

                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <>
                        <button className="botaVoltarListagemCliente" onClick={() => { this.setState({ pet: undefined }) }}>
                            Voltar
                        </button>

                        <AlterarPet pet={this.state.pet} />
                    </>
                )

                }
            </div>
        )
    }
}