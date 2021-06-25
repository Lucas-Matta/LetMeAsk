import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

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
    likeCount: number;
    likeId: string | undefined;
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
    likes: Record<string, {
        authorId: string;
    }>
}>

export function useRoom(roomId: string){
     // <Questions[]> = TypeScript
     const [questions, setQuestions] = useState<Questions[]>([]);
     const [title, setTitle] = useState('');

     const { user } = useAuth();

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
                    likeCount: Object.values(value.likes ?? {}).length,
                    // Vai verificar se o usuário deu like, se não, vai retornar nulo (não vai tentar nem buscar infor)
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId == user?.id)?.[0],
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestion);
        })
        // Vai remover todos os eventos
        return () => {
            roomRef.off('value');
        }

    }, [roomId, user?.id]);

    return { questions, title }
}