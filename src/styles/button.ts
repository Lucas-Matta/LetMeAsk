import styled from 'styled-components';

export const ButtonStyle = styled.div`
    .button{
        height: 50px;
        border-radius: 8px;
        font-weight: 500;
        background: ${props => props.theme.colors.background_four};
        color: #FFF;
        padding: 0 32px;
        
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border: 0;
        outline: 0;

        transition: filter 0.2s;

        &.outlined{
            background: #FFF;
            border: 1px solid #835afd;
            color: #835afd;
        }

        img{
            margin-right: 8px;
        }

        &:not(:disabled):hover{
            filter: brightness(0.9);
        }

        &:disabled{
            opacity: 0.6;
            cursor: not-allowed;
        }
    }

    #button{
        border-color: ${props => props.theme.colors.background_four};
        background: ${props => props.theme.colors.background_secundary};
        color: white;
    }
`;