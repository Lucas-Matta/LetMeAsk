import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import ilustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom(){
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

    // Função para criação da sala
    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        // Remove os espaços digitados no texto
        if(newRoom.trim() == '') {
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
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
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
                </div>
            </main>
        </div>
    )
}