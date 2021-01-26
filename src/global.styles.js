import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle `
    body {
        font-family: 'Open Sans Condensed';
        padding: 20px 40px
        @media (max-width: 800px){
            padding: 10px
            max-width:600px
    }
}

a{
    text-decoration: none;
    color: black ;
}
*{
    box-sizing: border-box;
}

`
