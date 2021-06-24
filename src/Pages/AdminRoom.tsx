import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';

// TypeScript
type RoomParams = {
    id: string;
}

export function AdminRoom(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id
    const [newQuestion, setNewQuestion] = useState('');

    const { title, questions } = useRoom(roomId);

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
        setNewQuestion('');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined >Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&
                        <span>{questions.length} Pergunta(s)</span>
                    }        
                </div>

                
                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            />
                        )
                    })}
                </div>

            </main>
        </div>
    )
}