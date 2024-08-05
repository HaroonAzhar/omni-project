import styled from "styled-components";

export const ViewRowLeftRightStyle = styled.div`
  display: flex;
  padding: 0px;

  > div:first-child {
    ${({ align_right }) =>
      align_right ? "text-align: right;width: 50%;" : " width: 80%;"}
  }
  > div:last-child {
    width: 30%;
    ${({ align_right }) => (align_right ? "width: 50%;" : "width: 30%;")}
  }
`;
