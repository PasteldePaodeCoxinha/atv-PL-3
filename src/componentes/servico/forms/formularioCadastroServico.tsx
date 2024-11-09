/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "./formularioCadastroServico.css"
import Servico from "../../../modelo/servico";

type props = {
    servicos: Servico[]
}

type state = {
    nome: string,
    preco: number,
}

export default class FormularioCadastroServico extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            nome: "",
            preco: 0
        }
        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorPreco = this.mudarValorPreco.bind(this)

        this.adicionarServico = this.adicionarServico.bind(this)
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            nome: e.target.value
        })
    }

    mudarValorPreco(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            preco: Number(e.target.value).valueOf()
        })
    }


    adicionarServico(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        
        if (this.props.servicos.find(p => p.nome === this.state.nome)) {
            alert("Esse servico já está registrado")
            return
        }

        const servico = new Servico(this.state.nome, this.state.preco)

        this.props.servicos.push(servico)

        this.setState({
            nome: "",
            preco: 0
        })
    }

    render() {
        return (
            <div className="containerFormularioServico">
                <form className="formularioServico" onSubmit={this.adicionarServico}>

                    <div className="linhaFormularioCadastroServico">

                        <input type="text"
                            className="inputServicoForms"
                            placeholder="Nome"
                            value={this.state.nome}
                            onChange={this.mudarValorNome}
                            required
                            />

                        <input type="number"
                            className="inputServicoForms"
                            placeholder="Porduto"
                            value={this.state.preco}
                            onChange={this.mudarValorPreco}
                            required
                            
                            />

                    </div>

                    <div className="containerBotaoCadastrarServico">
                        <button className="botaoCadastrarServico">CADASTRAR</button>
                    </div>
                </form>

            </div>
        )
    }
}