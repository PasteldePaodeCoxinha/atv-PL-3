import { Component } from "react";
import "./alterarPet.css"
import Pet from "../../../modelo/pet";

type props = {
    pet: Pet
}

type state = {
    pet: Pet
}

export default class AlterarPet extends Component<props, state> {
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            pet: props.pet
        }

        this.mudarValorNome = this.mudarValorNome.bind(this)
        this.mudarValorTamanho = this.mudarValorTamanho.bind(this)
    }

    mudarValorNome(e: React.ChangeEvent<HTMLInputElement>) {
        const pet = this.state.pet
        pet.setNome = e.target.value
        this.setState({
            pet: pet
        })
    }

    mudarValorTamanho(e: React.ChangeEvent<HTMLInputElement>) {
        const pet = this.state.pet
        pet.setTamanho = e.target.value
        this.setState({
            pet: pet
        })
    }

    render() {
        return (
            <div className="containerInformacoesPet">
                <div className="campoPetEditavel">
                    <label>Nome:</label>
                    <input type="text" value={this.state.pet.getNome} onChange={this.mudarValorNome}/>
                </div>

                <div className="campoPetFixo">
                    <label>Genêro:</label>
                    <p>{this.state.pet.getGenero}</p>
                </div>

                <div className="campoPetEditavel">
                    <label>Tamanho:</label>
                    <input type="email" value={this.state.pet.getTamanho} onChange={this.mudarValorTamanho}/>
                </div>

                <div className="campoPetFixo">
                    <label>Tipo:</label>
                    <p>{this.state.pet.getTipo}</p>
                </div>

                <div className="campoPetFixo">
                    <label>Raça:</label>
                    <p>{this.state.pet.getRaca}</p>
                </div>

            </div>
        )
    }
}