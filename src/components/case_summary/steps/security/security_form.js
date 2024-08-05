import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { H1 } from "components/atoms";
import {
  saveSecurityOverviewState,
  saveTitleNumbers,
} from "store/application/actions";
import { TextEditor } from "components/molecules";
import {
  getDescriptionOfPropertyFromSecurity,
  getDescriptionOfWorksFromSecurity,
  getPropertiesOfApplication,
} from "components/case_summary/selectors";

import TitleNumberForm from "./title_number_form";
import {
  StyledSummarySection,
  StyledFormHeader,
  StyledInputContainer,
} from "../../case_summary_styles";
import {
  StyledLabel,
  useSubmitCaseSummary,
  useSubmitTitleNumber,
} from "../shared";

const StyledPropertyContiner = styled.div`
  margin-bottom: 30px;
`;

const StyledPropertyName = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const StyledPropertyContainer = styled.div``;

const SecurityForm = () => {
  const dispatch = useDispatch();

  const { building_type } = useSelector((state) => state.application);

  const properties = useSelector(getPropertiesOfApplication);

  const descriptionOfProperty = useSelector(
    getDescriptionOfPropertyFromSecurity
  );

  const descriptionOfWorks = useSelector(getDescriptionOfWorksFromSecurity);
  const submit = useSubmitCaseSummary();

  const getOnSubmitFunction = (name) => (text) => {
    const dataToSave = { [name]: text };
    dispatch(saveSecurityOverviewState(dataToSave));
    submit("security", dataToSave);
  };

  const submitTitleNumber = useSubmitTitleNumber();

  const onSubmitTitleNumber = (data, propertyId, indexOfProperty) => {
    dispatch(saveTitleNumbers(data, indexOfProperty));
    submitTitleNumber(propertyId, data);
  };

  return (
    <StyledSummarySection>
      <StyledFormHeader>
        <H1>Security</H1>
      </StyledFormHeader>

      <StyledPropertyContainer>
        {properties.map(({ id, address = {}, title_numbers = [] }, index) => {
          const no = index + 1;
          const {
            line_1 = "(No address line 1 specified)",
            line_2 = "",
            town_city = "",
            postcode,
          } = address;

          return (
            <StyledPropertyContiner key={`property-${id}`}>
              <StyledPropertyName key={`cell-property-${id}`}>
                {`${no}. ${line_1} ${line_2} ${town_city} ${postcode}`}
              </StyledPropertyName>

              <TitleNumberForm
                storeData={(data) => {
                  onSubmitTitleNumber(data, id, index);
                }}
                initialState={{ title_numbers }}
              />
            </StyledPropertyContiner>
          );
        })}
      </StyledPropertyContainer>

      <StyledInputContainer>
        <StyledLabel>Description of property</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("description_of_property")}
          state={descriptionOfProperty}
        />
      </StyledInputContainer>

      {building_type === "development" && (
        <StyledInputContainer>
          <StyledLabel>Description of works</StyledLabel>
          <TextEditor
            onSubmit={getOnSubmitFunction("description_of_works")}
            state={descriptionOfWorks}
          />
        </StyledInputContainer>
      )}
    </StyledSummarySection>
  );
};

export default SecurityForm;
