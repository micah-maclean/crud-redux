import styled from "styled-components";

export const Container= styled.div`
    display: flex;
    justify-content: ${p => p.justifyContent ? p.justifyContent : 'center'};
    align-items: ${p => p.alignItems ? p.alignItems : 'flex-start'};
`;