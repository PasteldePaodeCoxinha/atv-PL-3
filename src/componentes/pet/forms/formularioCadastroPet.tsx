/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Cliente from "../../../modelo/cliente";
import "./formularioCadastroPet.css"
import Pet from "../../../modelo/pet";

type props = {
    clientes: Cliente[]
}

type state = {
    nome: string,
    tipo: string,
    raca: string,
    genero: string,
    tamanho: string,
    dono: string
}

export default class FormularioCadastroPet extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            nome: "",
            tipo: "",
            raca: "",
            genero: "",
            tamanho: "",
            dono: ""
        }
        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorTipo = this.mudarValorTipo.bind(this)

        this.mudarValorRaca = this.mudarValorRaca.bind(this)

        this.mudarValorGenero = this.mudarValorGenero.bind(this)
        this.mudarValorTamanho = this.mudarValorTamanho.bind(this)

        this.mudarValorDono = this.mudarValorDono.bind(this)

        this.adicionarPetCliente = this.adicionarPetCliente.bind(this)
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            nome: e.target.value
        })
    }

    mudarValorTipo(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            tipo: e.target.value
        })
    }

    mudarValorRaca(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            raca: e.target.value
        })
    }

    mudarValorGenero(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            genero: e.target.value
        })
    }

    mudarValorTamanho(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            tamanho: e.target.value
        })
    }

    mudarValorDono(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            dono: e.target.value
        })
    }

    adicionarPetCliente(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        let cachorroTemDono = false

        this.props.clientes.forEach(c => {
            if ((c.getPets.filter(p => p.getNome === this.state.nome)).length > 0) {
                alert("Esse pet já tem um dono")
                cachorroTemDono = true
            }
        })

        if (cachorroTemDono) {
            return
        }

        const cliente = this.props.clientes.find(c => c.nome === this.state.dono)

        if (!cliente) {
            alert("Esse dono não existe")
            return
        }

        const pet = new Pet(this.state.nome, this.state.tipo, this.state.raca, this.state.genero, this.state.tamanho)

        cliente.getPets.push(pet)

        this.setState({
            nome: "",
            tipo: "",
            raca: "",
            genero: "",
            tamanho: "",
            dono: ""
        })
    }

    render() {
        return (
            <div className="containerFormularioPet">
                <form className="formularioPet" onSubmit={this.adicionarPetCliente}>

                    <div className="linhaFormularioCadastroPet">

                        <select className="selectPetForms"
                            onChange={this.mudarValorDono}
                            value={this.state.dono}>
                            <option value="" disabled>Dono</option>
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

                    </div>

                    <div className="linhaFormularioCadastroPet">

                        <input type="text"
                            className="inputPetForms"
                            placeholder="Nome"
                            value={this.state.nome}
                            onChange={this.mudarValorNome}
                            required
                        />

                        <select className="selectPetForms"
                            onChange={this.mudarValorGenero}
                            value={this.state.genero}>
                            <option value="" disabled>Genêro</option>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                        </select>

                    </div>


                    <div className="linhaFormularioCadastroPet">

                        <input type="text"
                            className="inputPetForms"
                            placeholder="Tipo"
                            value={this.state.tipo}
                            onChange={this.mudarValorTipo}
                            required
                        />

                        <input type="text"
                            className="inputPetForms"
                            placeholder="Raça"
                            value={this.state.raca}
                            onChange={this.mudarValorRaca}
                            required
                        />

                        <input type="text"
                            className="inputPetForms"
                            placeholder="Tamanho"
                            value={this.state.tamanho}
                            onChange={this.mudarValorTamanho}
                            required
                        />

                    </div>

                    <div className="containerBotaoCadastrarPet">
                        <button className="botaoCadastrarPet">CADASTRAR</button>
                    </div>
                </form>

            </div>
        )
    }
}