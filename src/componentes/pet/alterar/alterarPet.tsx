import { useState } from "react";
import "./alterarPet.css"
import Pet from "../../../modelo/pet";

type props = {
    pet: Pet
}



export default function AlterarPet(props: props) {
    const [nome, setNome] = useState<string>(props.pet.getNome)
    const [tamanho, setTamanho] = useState<string>(props.pet.getTamanho)

    const mudarValorNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.pet.setNome = e.target.value
        setNome(e.target.value)
    }

    const mudarValorTamanho = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.pet.setTamanho = e.target.value
        setTamanho(e.target.value)
    }

    return (
        <div className="containerInformacoesPet">
            <div className="campoPetEditavel">
                <label>Nome:</label>
                <input type="text" value={nome} onChange={mudarValorNome} />
            </div>

            <div className="campoPetFixo">
                <label>Genêro:</label>
                <p>{props.pet.getGenero}</p>
            </div>

            <div className="campoPetEditavel">
                <label>Tamanho:</label>
                <input type="email" value={tamanho} onChange={mudarValorTamanho} />
            </div>

            <div className="campoPetFixo">
                <label>Tipo:</label>
                <p>{props.pet.getTipo}</p>
            </div>

            <div className="campoPetFixo">
                <label>Raça:</label>
                <p>{props.pet.getRaca}</p>
            </div>

        </div>
    )
}