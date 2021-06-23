import { useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    // Função para mandar o usuário para outra tela, e logar no aplicativo
    async function handleCreateRoom(){
       if(!user){
           await signInWithGoogle()
       }

        history.push('/rooms/new');
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                          type="text"
                          placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}