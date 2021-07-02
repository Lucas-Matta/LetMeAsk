import copyImg from '../assets/copy.svg';
import { ButtonCode } from '../styles/room-code';

// TypeScript
type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){
    
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
        <ButtonCode className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy Room Code" />
            </div>
            <span>Sala #{props.code}</span>
        </ButtonCode>
    )
}