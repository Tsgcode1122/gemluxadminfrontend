import { createGlobalStyle } from "styled-components";
import { breakpoints } from "./BreakPoints";

const GlobalStyle = createGlobalStyle`
h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
     @media screen and (max-width: 320px) {
    font-size: 2rem;
    }
    @media (min-width: 321px) and (max-width: 399px) {
    font-size: 1.8rem;
    }
    @media (min-width: 400px) and (max-width: 499px) {
        font-size: 2rem;
    }
    @media (min-width: ${breakpoints.xl}) {
   font-size: 3rem;
  }
  }
  
  h2 {
    font-size: 2rem;
    font-weight: bold;
@media screen and (max-width: 320px) {
      font-size: 18px;
  }
  @media (min-width: 321px) and (max-width: 399px) {
       font-size: 24px;
  }
  @media (min-width: 400px) and (max-width: 499px) {
         font-size: 24px;
  }
   @media (min-width: ${breakpoints.xs}) {
      font-size: 40px;
      line-height: 1.2;
    
    }
    @media (min-width: ${breakpoints.m}) {
      line-height: 1.2;
      font-size: 45px;

    }
    @media (min-width: ${breakpoints.xl}) {
   font-size: 2.4rem;
     line-height: 1.4;
  }
  }
  
  h3 {
    font-size: 18px;
    font-weight: bold;
  @media (min-width: ${breakpoints.xl}) {
   font-size: 20px;
     
  }
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
 @media screen and (max-width: 320px) {
     
       font-size: 16px;
     }
     @media (min-width: 321px) and (max-width: 399px) {

       font-size: 18px;
     }
     @media (min-width: 400px) and (max-width: 499px) {
  
       font-size: 18px;
     }
     @media (min-width: ${breakpoints.xl}) {
   font-size: 20px;
     
  }
  }

  h5 {
    font-size: 18px;
    margin: 5px 0;
    font-weight: 600;
@media screen and (max-width: 320px) {
     
       font-size: 16px;
     }
     @media (min-width: 321px) and (max-width: 399px) {

       font-size: 18px;
     }
     @media (min-width: 400px) and (max-width: 499px) {
  
       font-size: 18px;
     }
@media (min-width: ${breakpoints.xl}) {
   font-size: 20px;
     
  }
  }

  p {
 font-size: 18px;
    line-height: 1.6;
   font-weight: 300 !important;
    @media screen and (max-width: 320px) {
     
       font-size: 14px;
     }
     @media (min-width: 321px) and (max-width: 399px) {

       font-size: 16px;
     }
     @media (min-width: 400px) and (max-width: 499px) {
  
       font-size: 16px;
     }
    @media (min-width: ${breakpoints.xl}) {
   font-size: 20px;
     
  }
  }
a{
  text-decoration: none;
  color: inherit;
}
  article {
    font-size: 1rem;
    line-height: 1.8;
  
    text-align: justify;
  }

  span {
    
 
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  small {
    font-size: 0.875rem;
  }

  blockquote {
    font-size: 1.2rem;
    font-style: italic;
    border-left: 4px solid #ccc;
    padding-left: 1rem;
    margin: 1rem 0;
  }
  html, body {
    margin: 0 !important;
    padding: 0 !important;
   /* scroll-behavior: smooth;  */

font-family: 'Inter', sans-serif; 
  font-optical-sizing: auto;


    min-height: 100%;
  }

  body.modal-open {
    overflow: hidden;
  }

  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
