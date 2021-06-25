import { useHistory, useParams } from 'react-router-dom';
import deleteIgm from '../assets/delete.svg';
import checkImg from '../assets/check.svg';
import answerImg from '../assets/answer.svg';

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
    const history = useHistory();

    const { title, questions } = useRoom(roomId);

    // Função para deletar a sala
    async function handleEndRoom(){
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    // FUnção para remover pergunta
    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
             await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    // Função para marcar a pergunta como respondida 
    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    // Função para dar destaque a pergunta
    async function handleHighLightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined >Encerrar Sala</Button>
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
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHighlighted}
                            >

                            {!question.isAnswered && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                    >
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleHighLightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="Dar destaque a Pergunta" />
                                    </button>
                                </>
                            )} 
                            

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteIgm} alt="Remover Pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>
        </div>
    )
}