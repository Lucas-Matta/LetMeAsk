import { FormEvent, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import ilustrationImg from '../../assets/illustration.svg';
import logoImgPreto from '../../assets/logo.svg';
import logoImgBranco from '../../assets/logoBranca.png';
import googleIconImg from '../../assets/google-icon.svg';

// Responsivo da Home
import '../../styles/responsive/responsive.scss';

// Estilo da Home
import { PageAuth, Aside, Main, MainContent } from './home';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import { DARK } from "../../constants/theme";
import { ThemeContext } from 'styled-components';

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    
    const { colors, titleTheme } = useContext(ThemeContext);

    // Função para mandar o usuário para outra tela, e logar no aplicativo
    async function handleCreateRoom(){
       if(!user){
           await signInWithGoogle()
       }

        history.push('/rooms/new');
    }

    // Função para entrar na sala
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        // Pega o ID da sala no Banco
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        // Verifica se o ID digitado existe no Banco
        if(!roomRef.exists()) {
            alert('Sala não existe!');
            return;
        }

        // Verificação para ver se a sala foi fechada ou não
        if(roomRef.val().endedAt){
            alert('Sala não Existe!');
            return;
        }
        
        // Redireciona o usuário para a sala digitada
        history.push(`/rooms/${roomCode}`);
    }

    return(
        <PageAuth>
            <Aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo real</p>
            </Aside>

            <Main>
                <MainContent>
                    { titleTheme === DARK ? (
                        <img src={logoImgBranco} alt="Letmeask" />
                    ):(
                        <img src={logoImgPreto} alt="Letmeask" />
                    )}
                    
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                          type="text"
                          placeholder="Digite o código da sala"
                          onChange={event => setRoomCode(event.target.value)}
                          value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </MainContent>
            </Main>
        </PageAuth>
    )
}