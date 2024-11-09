import { Component } from "react";
import "./roteadorProduto.css"
import BarraNavegacao from "../../barraNavegacao";
import Produto from "../../../modelo/produto";
import FormularioCadastroProduto from "../../produto/forms/formularioCadastroProduto";
import ListaProdutos from "../../produto/lista/listaProdutos";
import RegistroCompraProduto from "../../produto/registro/registroCompraProduto";
import Cliente from "../../../modelo/cliente";

type props = {
    clientes: Cliente[],
    produtos: Produto[]
}

type state = {
    tela: string

}

export default class RoteadorProduto extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            tela: 'Cadastro'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao
            seletorView={this.selecionarView}
            botoes={['Lista', 'Cadastro', 'Registrar Compra']}
            titulo="Produto"
        />
        if (this.state.tela === 'Lista') {
            return (
                <div className="paginaListaProduto">
                    {barraNavegacao}
                    <ListaProdutos produtos={this.props.produtos} clientes={this.props.clientes} />
                </div>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <div className="paginaCadastroProduto">
                    {barraNavegacao}
                    <FormularioCadastroProduto produtos={this.props.produtos} />
                </div>
            )
        } else if (this.state.tela === 'Registrar Compra') {
            return (
                <div className="paginaRegistroCompra">
                    {barraNavegacao}
                    <RegistroCompraProduto clientes={this.props.clientes} produtos={this.props.produtos} />
                </div>
            )
        }
    }
}