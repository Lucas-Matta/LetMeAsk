import React, { useContext } from "react";
import { useHistory, useParams } from 'react-router-dom';
import deleteIgm from '../../assets/delete.svg';
import checkImg from '../../assets/check.svg';
import answerImg from '../../assets/answer.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

import '../../styles/responsive/responsive.scss';

import { HeaderAdmin, ContentAdmin, MainRoom, RoomTitleAdmin, QuestionList } from './admin';

import Switch from "react-switch";
import useToggleTheme from "../../hooks/useToggleTheme";
import { ThemeContext } from "styled-components";

import logoImgPreto from '../../assets/logo.svg';
import logoImgBranco from '../../assets/logoBranca.png';
import { DARK } from "../../constants/theme";

// TypeScript
type RoomParams = {
    id: string;
}

export function AdminRoom(){
    const params = useParams<RoomParams>();
    const roomId = params.id
    const history = useHistory();
    const { title, questions } = useRoom(roomId);

    const { toggleTheme } = useToggleTheme();
    const { colors, titleTheme } = useContext(ThemeContext);

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
        <>
        <HeaderAdmin>
            <ContentAdmin id="content">
                { titleTheme === DARK ? (
                        <img src={logoImgBranco} alt="Letmeask" />
                    ):(
                        <img src={logoImgPreto} alt="Letmeask" />
                )}
                <div id="content2">
                    <RoomCode code={roomId} />
                    <Button onClick={handleEndRoom} isOutlined >Encerrar Sala</Button>
                    <Switch
                        onChange={toggleTheme}
                        checked={titleTheme === DARK}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={10}
                        width={40}
                        handleDiameter={20}
                        offColor={colors.primary}
                        onColor={colors.secundary}
                    />
                </div>
            </ContentAdmin>
        </HeaderAdmin>

            <MainRoom id="roomMain">
                <RoomTitleAdmin id="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&
                        <span>{questions.length} Pergunta(s)</span>
                    }        
                </RoomTitleAdmin>

                
                <QuestionList>
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
                </QuestionList>
            </MainRoom>
        </>
    )
}