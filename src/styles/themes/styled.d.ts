// TypesScript do Theme
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        colors: {
            // Cor primaria
            primary: string;
            secundary: string;
    
            background: string;
            text: string;
        },
    }
}