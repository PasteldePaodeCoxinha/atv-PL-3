import { Component } from "react";
import Empresa from "../../../modelo/empresa";
import Cliente from "../../../modelo/cliente";
import CPF from "../../../modelo/cpf";
import RG from "../../../modelo/rg";
import Telefone from "../../../modelo/telefone";
import BarraNavegacao from "../../barraNavegacao";
import RoteadorCliente from "../cliente/roteadorCliente";
import RoteadorPet from "../pet/roteadorPet";
import Pet from "../../../modelo/pet";
import Produto from "../../../modelo/produto";
import RoteadorProduto from "../produto/roteadorProduto";
import Servico from "../../../modelo/servico";
import RoteadorServico from "../servico/roteadorServico";

type state = {
    tela: string
    empresa: Empresa
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes',
            empresa: new Empresa()
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    componentDidMount(): void {
        document.body.style.backgroundColor = "#2513EB"
        const empresaAtual = new Empresa()

        const petA = [new Pet("babão", "cachorro", "pitbull", "masculino", "grande"), new Pet("bebedouro", "cachorro", "borzoi", "masculino", "pequeno"), new Pet("bibiane", "cachorro", "caramelo", "feminino", "médio")]
        const petB = [new Pet("cartão", "gato", "branco", "feminino", "grande"), new Pet("ceara", "gato", "amarelo", "feminino", "pequeno"), new Pet("cimitarra", "gato", "branco", "masculino", "médio")]
        const petC = [new Pet("dario", "cachorro", "borzoi", "masculino", "grande"), new Pet("dedão", "gato", "amarelo", "feminino", "pequeno"), new Pet("ciranda", "hamster", "sirio", "feminino", "grande")]

        const clientes = (
            [new Cliente("Josévaldo", "mario", "a@email.com", new CPF("123", new Date()), [new RG("147", new Date())], [new Telefone("12", "159")]),
            new Cliente("Alexandrelsa", "", "b@email.com", new CPF("456", new Date()), [new RG("258", new Date())], [new Telefone("12", "348")]),
            new Cliente("Jonas", "j", "c@email.com", new CPF("789", new Date()), [new RG("369", new Date())], [new Telefone("12", "267")])])

        clientes[0].setPets = petA
        clientes[1].setPets = petB
        clientes[2].setPets = petC

        const produtos = [new Produto("shampoo", 50.00), new Produto("coleira", 69.00), new Produto("bola", 4.57)]

        const servicos = [new Servico("tosa", 54.84), new Servico("banho", 21.78), new Servico("cortar unha", 100.01)]

        empresaAtual.setClientes = clientes
        empresaAtual.setProdutos = produtos
        empresaAtual.setServicos = servicos

        this.setState({
            empresa: empresaAtual
        })
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
            botoes={['Clientes', 'Pets', 'Produtos', 'Serviços']}
            titulo=""
        />

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <RoteadorCliente clientes={this.state.empresa.getClientes} />
                </>
            )
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <RoteadorPet clientes={this.state.empresa.getClientes} />
                </>
            )
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    <RoteadorProduto clientes={this.state.empresa.getClientes} produtos={this.state.empresa.getProdutos} />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <RoteadorServico clientes={this.state.empresa.getClientes} servicos={this.state.empresa.getServicos} />
                </>
            )
        }
    }
}