import { FormEvent, useState, useEffect } from 'react';
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

// Typescript Record para declarar objeto
type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

// TypeScript
type Questions = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Room(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id
    const [newQuestion, setNewQuestion] = useState('');
    // <Questions[]> = TypeScript
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        // Pegando as perguntas do Firebase em tempo real (on) documentação do firebase
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            // Mudando os as perguntas que vem como Objeto para vetor (Array)
            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestion);
        })

    }, [roomId])


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
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&
                        <span>{questions.length} Pergunta(s)</span>
                    }        
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que voce quer perguntar?"
                              onChange={event => setNewQuestion(event.target.value)} 
                              value={newQuestion}
                              />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) :  (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user} >Enviar Pergunta</Button>
                    </div>
                </form>
                
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}