import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;
      three: string;
      four: string;

      background_primary: string;
      background_secundary: string;
      background_three: string;
      background_four:  string;
      background_five: string;
      background_six: string;
      background_seven: string;
      text: string;
    };
  }
}
