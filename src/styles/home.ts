import styled from 'styled-components';

export const PageAuth = styled.div`
    display: flex;
    align-items: stretch;
    height: 100vh;
`;

export const Aside = styled.aside`
    flex: 7;

    background: #835afd;
    color: #FFF;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 120px 80px;
    background: ${props => props.theme.colors.background_secundary};

        img{
            max-width: 320px;
            background: ${props => props.theme.colors.background_secundary};
        }

        strong{
            font: 700 36px 'Poppins', sans-serif;
            line-height: 42px;
            margin-top: 16px;
        }

        p{
            font-size: 24px;
            line-height: 32px;
            margin-top: 16px;
            color: #F8F8F8;
        }
`;

export const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 8;

    padding: 0 32px;
`;

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 100%;
    max-width: 320px;
    text-align: center;

    > img{
        align-self: center;
    }

    h2{
        font-size: 24px;
        margin: 64px 0 24px;
        font-family: 'Poppins', sans-serif;
        color: ${props => props.theme.colors.text};
    }

    > button{
        background: ${props => props.theme.colors.background_three};
    }
    
    > form > button{
        background: ${props => props.theme.colors.background_four};
    }

    form{
        input{
            height: 50px;
            border-radius: 8px;
            padding: 0 16px;
            background: #FFF;
            border: 1px solid #a8a8b3;
            outline: 0;
        }

        button{
            margin-top: 16px;
        }

        button, input{
            width: 100%;
        }
    }

    p{
        font-size: 14px;
        color: #737380;
        margin-top: 16px;

        a{
            color: #e559f9;
        }
    }

    .create-room{
        margin-top: 64px;
        height: 50px;
        border-radius: 8px;
        font-weight: 500;
        color: #FFF;
        
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border: 0;
        outline: 0;

        transition: filter 0.2s;

        img{
            margin-right: 8px;
        }

        &:hover{
            filter: brightness(0.9);
        }
    }

    .separator{
        font-size: 14px;
        color: #a8a8b3;

        margin: 32px 0;
        display: flex;
        align-items: center;

        &::before{
            content: '';
            flex: 1;
            height: 1px;
            background: #a8a8b3;
            margin-right: 16px;
        }

        &::after{
            content: '';
            flex: 1;
            height: 1px;
            background: #a8a8b3;
            margin-left: 16px;
        }
}

`;

// 