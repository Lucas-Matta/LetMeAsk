import styled from 'styled-components';

export const ButtonCode = styled.button`
    height: 40px;
    border-radius: 8px;
    overflow: hidden;

    background: ${props => props.theme.colors.background_primary};
    border: 1px solid ${props => props.theme.colors.background_four};
    color: ${props => props.theme.colors.text};
    cursor: pointer;

    display: flex;

    div{
        background: ${props => props.theme.colors.background_four};
        padding: 12px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    span{
        display: block;
        align-self: center;
        flex: 1;
        padding: 0 16px 0 12px;
        width: 230px;
        font-size: 14px;
        font-weight: 500px;
    }

`;