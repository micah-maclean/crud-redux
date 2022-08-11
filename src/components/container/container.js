import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: ${props => props.gap ? props.gap : '0'};
    border: ${ props => props.border ? props.border: 'none'};
    border-radius: ${ props => props.borderRadius ? props.borderRadius: 'none'};
    flex-direction: ${ props => props.flexDirection ? props.flexDirection: 'row'};
    justify-content: ${ props => props.justifyContent ? props.justifyContent: 'center'};
    align-items: ${ props => props.alignItems ? props.alignItems : ''};
    background-color: ${ props => props.backgroundColor ? props.backgroundColor : 'none'};
    padding: ${ props => props.padding ? props.padding : '0'};
    min-height: ${ props => props.minHeight ? props.minHeight : '0'};
    width: ${ props => props.width ? props.width : '100%'};
    height: ${ props => props.height ? props.height : '100%'};
    overflow: ${ props => props.overflow ? props.overflow : ''};
`
