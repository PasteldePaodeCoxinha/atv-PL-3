import { Component } from "react";
import "./roteadorCliente.css"
import BarraNavegacao from "../../barraNavegacao";
import FormularioCadastroCliente from "../../cliente/forms/formularioCadastroCliente";
import Cliente from "../../../modelo/cliente";
import ListaCliente from "../../cliente/lista/listaClientes";

type props = {
    clientes: Cliente[]
}

type state = {
    tela: string

}

export default class RoteadorCliente extends Component<props, state> {
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
            botoes={['Lista', 'Cadastro']}
            titulo="Cliente"
        />
        if (this.state.tela === 'Lista') {
            return (
                <div className="paginaListaCliente">
                    {barraNavegacao}
                    <ListaCliente clientes={this.props.clientes} />
                </div>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <div className="paginaCadastroCliente">
                    {barraNavegacao}
                    <FormularioCadastroCliente clientes={this.props.clientes} />
                </div>
            )
        }
    }
}