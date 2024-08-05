import styled from "styled-components";

export const SecuritiesWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ViewValuationsSecurityWrapper = styled.div`
  margin: 0px 0px 10px 0px;
  width: 100%;
`;
export const ViewSecuritySectionWrapper = styled.div`
  margin: 0px 0px 10px 0px;
  width: 100%;
`;

export const StyledHiddenContent = styled.div`
  ${({ align }) =>
    align === "end" ? `align-items: flex-end;` : `align-items: flex-start;`}

  ${({ borders }) =>
    borders &&
    "border-bottom: 1px solid black; border-left: 1px solid black;border-right: 1px solid black;"}
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  margin-top: -2px;
  padding: 10px 0px 0px 0px;
  ${({ expanded }) => !expanded && "display: none;"}
  width:100%;

  > div {
    width: 100%;

    > button {
      padding 0px 16px;
    }
  }
  
`;

export const StyledTextColor = styled.span`
  color: ${(props) => props.color};
`;
