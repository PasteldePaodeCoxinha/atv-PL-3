import { Component } from "react";
import "./roteadorPet.css"
import BarraNavegacao from "../../barraNavegacao";
import Cliente from "../../../modelo/cliente";
import FormularioCadastroPet from "../../pet/forms/formularioCadastroPet";
import ListaPet from "../../pet/lista/listaPets";

type props = {
    clientes: Cliente[]
}

type state = {
    tela: string

}

export default class RoteadorPet extends Component<props, state> {
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
            titulo="Pet"
        />
        if (this.state.tela === 'Lista') {
            return (
                <div className="paginaListaPet">
                    {barraNavegacao}
                    <ListaPet clientes={this.props.clientes} />
                </div>
            )
        } else if (this.state.tela === 'Cadastro') {
            return (
                <div className="paginaCadastroPet">
                    {barraNavegacao}
                    <FormularioCadastroPet clientes={this.props.clientes} />
                </div>
            )
        }
    }
}