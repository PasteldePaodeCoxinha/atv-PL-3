import { Component } from "react";
import "./roteadorServico.css"
import BarraNavegacao from "../../barraNavegacao";
import Servico from "../../../modelo/servico";
import ListaServicos from "../../servico/lista/listaServicos";
import FormularioCadastroServico from "../../servico/forms/formularioCadastroServico";
import RegistroCompraServico from "../../servico/registro/registroCompraServico";
import Cliente from "../../../modelo/cliente";

type props = {
    clientes: Cliente[],
    servicos: Servico[]
}

type state = {
    tela: string

}

export default class RoteadorServico extends Component<props, state> {
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
            titulo="Serviço"
        />
        if (this.state.tela === 'Lista') {
            return (
                <div className="paginaListaServico">
                    {barraNavegacao}
                    <ListaServicos servicos={this.props.servicos} clientes={this.props.clientes} />
                </div>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <div className="paginaCadastroServico">
                    {barraNavegacao}
                    <FormularioCadastroServico servicos={this.props.servicos} />
                </div>
            )
        } else if (this.state.tela === 'Registrar Compra') {
            return (
                <div className="paginaRegistroCompra">
                    {barraNavegacao}
                    <RegistroCompraServico clientes={this.props.clientes} servicos={this.props.servicos} />
                </div>
            )
        }
    }
}