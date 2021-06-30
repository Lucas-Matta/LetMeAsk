/* Reset e configurações padrões */

// import styled from 'styled-components';
// export const Container = styled.div``;

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background: ${(props) => props.theme.colors.background_primary};
        color: ${(props) => props.theme.colors.text};
    }

    body, input, button, textarea{
        font: 400 16px 'Roboto', sans-serif;
    }
`;