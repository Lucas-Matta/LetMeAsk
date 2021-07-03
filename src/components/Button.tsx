// Declara todos os atributos que o botão pode receber
import { ButtonHTMLAttributes } from 'react';

import { ButtonStyle } from '../styles/button';

// Precisa passar o elemento do botão em <> (tipagem global)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props}: ButtonProps){
    return(
        <ButtonStyle>
            <button id="button" className={`button ${isOutlined ? 'outlined' : '' }`} {...props} />
        </ButtonStyle>
    )
}