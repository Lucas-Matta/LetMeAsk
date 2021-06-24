import { useEffect, useState } from "react";
import { database } from "../services/firebase";

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

export function useRoom(roomId: string){
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

    }, [roomId]);

    return { questions, title }
}