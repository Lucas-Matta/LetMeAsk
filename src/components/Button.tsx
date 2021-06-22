// Declara todos os atributos que o botão pode receber
import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

// Precisa passar o elemento do botão em <> (tipagem global)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps){
    return(
        <button className="button" {...props} />
    )
}