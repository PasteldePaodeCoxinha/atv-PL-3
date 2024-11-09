/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "./barraNavegacao.css"

type props = {
    botoes: string[],
    titulo: string,
    seletorView: Function
}

export default class BarraNavegacao extends Component<props> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }


    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>
        } else {
            let lista = this.props.botoes.map(valor =>
                <li key={valor} className="botoesDaBarraDeNavegacao">
                    <a className="linkDaBarraDeNavegacao" href="#" onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a>
                </li>
            )
            return lista
        }
    }

    render() {
        return (
            <>
                <nav className="barraDeNavegacao">
                    <ul className="containerDaBarraDeNavegacao">
                        {this.gerarListaBotoes()}
                    </ul>
                    <p className="tituloBarraNavegacao">{this.props.titulo}</p>
                </nav>
            </>
        )
    }
}