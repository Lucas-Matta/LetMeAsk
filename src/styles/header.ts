import styled from 'styled-components';

export const HeaderRoom = styled.header`
    padding: 24px;
    border-bottom: 1px solid ${props => props.theme.colors.four};
`;

export const ContentHeader = styled.div`
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