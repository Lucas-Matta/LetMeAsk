import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState, useContext } from 'react';

import ilustrationImg from '../../assets/illustration.svg';

// Responsivo
import '../../styles/responsive/responsive.scss';

// Estilo da Home
import { PageAuth, Aside, Main, MainContent } from '../Home/home';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import logoImgPreto from '../../assets/logo.svg';
import logoImgBranco from '../../assets/logoBranca.png';
import { DARK } from "../../constants/theme";
import { ThemeContext } from 'styled-components';

export function NewRoom(){
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();
    
    const { colors, titleTheme } = useContext(ThemeContext);

    // Função para criação da sala
    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        // Remove os espaços digitados no texto
        if(newRoom.trim() === '') {
            return;
        }

        // Database, vem do firebase e vai pegar todos os itens que tem a referencia Rooms
        const roomRef = database.ref('rooms');

        // Vai puxar lá do banco de dados
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        // Redireciona o usuário para a sala selecionada
        history.push(`/admin/rooms/${firebaseRoom.key}`);
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom} >
                        <input 
                          type="text"
                          placeholder="Nome da sala"
                          onChange={event => setNewRoom(event.target.value)}
                          value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente ?<Link to="/">  clique aqui</Link></p>
                </MainContent>
            </Main>
        </PageAuth>
    )
}