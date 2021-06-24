import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

// TypeScript
type RoomParams = {
    id: string;
}

export function Room(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id

    const [newQuestion, setNewQuestion] = useState('');

    // Função para realizar uma pergunta
    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();

        // Verificação para ver se tem alguma pergunta
        if(newQuestion.trim() == ''){
            return;
        }
        
        // Verificação para ver se o usuário está logado
        if(!user){
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            // Determina se a pergunta está sendo respondida
            isHighlighted: false,
            // Verifica se a pergunta foi respondida
            isAnswere: false,
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que voce quer perguntar?"
                              onChange={event => setNewQuestion(event.target.value)} 
                              value={newQuestion}
                              />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
                        <Button type="submit" disabled={!user} >Enviar Pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}