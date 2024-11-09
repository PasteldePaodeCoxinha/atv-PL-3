/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Cliente from "../../../modelo/cliente";
import CPF from "../../../modelo/cpf";
import RG from "../../../modelo/rg";
import Telefone from "../../../modelo/telefone";
import "./formularioCadastroCliente.css"

type props = {
    clientes: Cliente[]
}

type state = {
    clientes: Cliente[]
    nome: string
    nomeSocial: string
    email: string
    valorCpf: string
    dataCpf: string
    qtdRg: number
    valorRg: string
    dataRg: string
    qtdTelefone: number
    telefone1: string
    telefone2?: string
    avisos: string
}

export default class FormularioCadastroCliente extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            clientes: props.clientes,
            nome: "",
            nomeSocial: "",
            email: "",
            valorCpf: "",
            dataCpf: "",
            qtdRg: 0,
            valorRg: "",
            dataRg: "",
            qtdTelefone: 0,
            telefone1: "",
            telefone2: "",
            avisos: ""
        }
        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorNomeSocial = this.mudarValorNomeSocial.bind(this)

        this.mudarValorEmail = this.mudarValorEmail.bind(this)

        this.mudarValorCpf = this.mudarValorCpf.bind(this)
        this.mudarValorDataCpf = this.mudarValorDataCpf.bind(this)

        this.mudarValorRg = this.mudarValorRg.bind(this)
        this.mudarValorDataRg = this.mudarValorDataRg.bind(this)

        this.mudarValorTelefone1 = this.mudarValorTelefone1.bind(this)
        this.mudarValorTelefone2 = this.mudarValorTelefone2.bind(this)

        this.clienteCriarAdicionar = this.clienteCriarAdicionar.bind(this)
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            nome: e.target.value
        })
    }

    mudarValorNomeSocial(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            nomeSocial: e.target.value
        })
    }

    mudarValorEmail(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: e.target.value
        })
    }

    mudarValorCpf(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            valorCpf: e.target.value
        })
    }

    mudarValorDataCpf(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            dataCpf: e.target.value
        })
    }

    mudarValorRg(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            valorRg: e.target.value
        })
    }

    mudarValorDataRg(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            dataRg: e.target.value
        })
    }

    mudarValorTelefone1(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            telefone1: e.target.value
        })
    }

    mudarValorTelefone2(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            telefone2: e.target.value
        })
    }

    clienteCriarAdicionar(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (this.state.nome === "") {
            this.setState({
                avisos: "Coloque um nome\n"
            })
            return
        }

        let listaTel = [new Telefone(this.state.telefone1.substring(0, 2), this.state.telefone1.substring(2))]

        if (this.state.telefone2 !== "" && this.state.telefone2 !== undefined) {
            listaTel.push(new Telefone(this.state.telefone2.substring(0, 2), this.state.telefone2.substring(2)))
        }

        // let datasCpf = this.state.dataCpf.split("")
        // let datasRg = this.state.dataRg.split("-")

        this.props.clientes.push(new Cliente(
            this.state.nome,
            this.state.nomeSocial,
            this.state.email,
            new CPF(this.state.valorCpf, new Date(this.state.dataCpf)),
            [new RG(this.state.valorRg,
                new Date(this.state.dataRg))],
            listaTel))

        this.setState({
            nome: "",
            nomeSocial: "",
            email: "",
            valorCpf: "",
            dataCpf: "",
            valorRg: "",
            dataRg: "",
            telefone1: "",
            telefone2: "",
            avisos: ""
        })
    }

    render() {
        return (
            <div className="containerFormularioCliente">

                <form className="formularioCliente" onSubmit={this.clienteCriarAdicionar}>

                    <div className="linhaFormularioCadastroCliente">

                        <input type="text"
                            className="inputClienteForms"
                            placeholder="Nome"
                            value={this.state.nome}
                            onChange={this.mudarValorNome}
                            required />



                        <input type="text"
                            className="inputClienteForms"
                            placeholder="Nome social"
                            value={this.state.nomeSocial}
                            onChange={this.mudarValorNomeSocial} />

                    </div>

                    <div className="linhaFormularioCadastroCliente">

                        <input type="email"
                            className="inputClienteForms"
                            placeholder="E-mail"
                            value={this.state.email}
                            onChange={this.mudarValorEmail}
                            required />

                    </div>

                    <div className="linhaFormularioCadastroCliente">
                        <div className="inputsComDataFormsCliente">

                            <input type="text"
                                className="inputClienteForms"
                                placeholder="CPF"
                                value={this.state.valorCpf}
                                onChange={this.mudarValorCpf}
                                required />

                            <input type="text"
                                className="inputClienteForms"
                                placeholder="Data CPF"
                                datatype=""
                                value={this.state.dataCpf}
                                onChange={this.mudarValorDataCpf}
                                required />

                        </div>
                    </div>

                    <div className="linhaFormularioCadastroCliente">
                        <div className="inputsComDataFormsCliente">

                            <input type="text"
                                className="inputClienteForms"
                                placeholder="RG"
                                value={this.state.valorRg}
                                onChange={this.mudarValorRg}
                                required />

                            <input type="text"
                                placeholder="Data RG"
                                className="inputClienteForms"
                                value={this.state.dataRg}
                                onChange={this.mudarValorDataRg}
                                required />

                        </div>
                    </div>

                    <div className="linhaFormularioCadastroCliente">

                        <input type="text"
                            className="inputClienteForms"
                            placeholder="Telefone 1"
                            value={this.state.telefone1}
                            onChange={this.mudarValorTelefone1}
                            required />



                        <input type="text"
                            className="inputClienteForms"
                            placeholder="Telefone 2"
                            value={this.state.telefone2}
                            onChange={this.mudarValorTelefone2} />

                    </div>

                    <div className="containerBotaoCadastrarCliente">
                        <button className="botaoCadastrarCliente">CADASTRAR</button>
                    </div>
                </form>

            </div>
        )
    }
}