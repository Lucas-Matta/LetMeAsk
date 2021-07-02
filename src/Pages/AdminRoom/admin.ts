import styled from 'styled-components';

export const HeaderAdmin = styled.header`
    padding: 24px;
    border-bottom: 1px solid #e2e2e2;
`;

export const ContentAdmin = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
        max-height: 45px;
    }

    > div {
        display: flex;
        gap: 16px;

        button{
            height: 40px;
        }
    }
`;

export const MainRoom = styled.main`
    max-width: 800px;
    margin: 0 auto;
`;