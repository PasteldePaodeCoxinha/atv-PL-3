/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "./formularioCadastroProduto.css"
import Produto from "../../../modelo/produto";

type props = {
    produtos: Produto[]
}

type state = {
    nome: string,
    preco: number,
}

export default class FormularioCadastroProduto extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            nome: "",
            preco: 0
        }
        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorPreco = this.mudarValorPreco.bind(this)

        this.adicionarProduto = this.adicionarProduto.bind(this)
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


    adicionarProduto(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        
        if (this.props.produtos.find(p => p.nome === this.state.nome)) {
            alert("Esse produto já está registrado")
            return
        }

        const produto = new Produto(this.state.nome, this.state.preco)

        this.props.produtos.push(produto)

        this.setState({
            nome: "",
            preco: 0
        })
    }

    render() {
        return (
            <div className="containerFormularioProduto">
                <form className="formularioProduto" onSubmit={this.adicionarProduto}>

                    <div className="linhaFormularioCadastroProduto">

                        <input type="text"
                            className="inputProdutoForms"
                            placeholder="Nome"
                            value={this.state.nome}
                            onChange={this.mudarValorNome}
                            required
                            />

                        <input type="number"
                            className="inputProdutoForms"
                            placeholder="Porduto"
                            value={this.state.preco}
                            onChange={this.mudarValorPreco}
                            required
                            
                            />

                    </div>

                    <div className="containerBotaoCadastrarProduto">
                        <button className="botaoCadastrarProduto">CADASTRAR</button>
                    </div>
                </form>

            </div>
        )
    }
}