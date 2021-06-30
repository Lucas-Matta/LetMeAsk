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
`;