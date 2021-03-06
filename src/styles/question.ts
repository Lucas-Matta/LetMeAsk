import styled from 'styled-components';

export const QuestionContainer = styled.div`
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0, 0.04);
    padding: 24px;
    
    & + .question {
        margin-top: 8px;
    }

    &.highlighted{
        background: #f4f0ff;
        border: 13px solid #835afd !important;
    }

    &.answered {
        background: ${props => props.theme.colors.background_seven} !important;
        color: ${props => props.theme.colors.text} !important;
    }

    footer .user-info span{
        color: ${props => props.theme.colors.text} !important;
    }

    p{
        color: ${props => props.theme.colors.text} !important;
    }

    footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;

        button{
            border: 0;
            background: transparent;
            cursor: pointer;
            transition: filter(0.2);
            
            &.like-button{
                display: flex;
                align-items: flex-end;
                color: #737380;
                gap: 8px;

                &.liked {
                    color: #835afd;

                    svg path {
                        stroke: #835afd
                    }
                }
            }

            &:hover{
                filter: brightness(0.7);
            }
        }

        > div{
            display: flex;
            gap: 16px;
        }
    }

    .user-info{
        display: flex;
        align-items: center;

        img{
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }

        span{
            margin-left: 8px;
            color: ${props => props.theme.colors.text} !important;
            font-size: 14px;
        }
    }

`;