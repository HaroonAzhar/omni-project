import { fireEvent, act, wait } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import Form3 from "../forms/form_3";

describe("<ApplicantDetails>", () => {
  it("Question inputs handle boolean value", async () => {
    const finalizeStep = jest.fn(() => {});

    const { container, getByText } = getComponentWithRedux(
      Form3,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [
            {
              personal_data: {
                date_of_birth: "1997-02-13",
              },
            },
          ],
        },
      }
    );

    const hasDualNationality = container.querySelector(
      "input[name='personal_data.has_dual_nationality'][value=true]"
    );
    const permanentResident = container.querySelector(
      "input[name='personal_data.permanent_resident'][value=true]"
    );

    act(() => {
      fireEvent.click(hasDualNationality);
      fireEvent.click(permanentResident);
      fireEvent.click(getByText(/Continue/i));
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);

      expect(finalizeStep).toBeCalledWith({
        data: {
          personal_data: {
            date_of_birth: "1997-02-13",
            has_dual_nationality: true,
            permanent_resident: true,
          },
        },
      });
    });
  });

  it("Show text input when dual nationality", async () => {
    const finalizeStep = jest.fn(() => {});

    const { container, getByLabelText } = getComponentWithRedux(
      Form3,
      {
        finalizeStep,
        goStepBack: () => {},
      },
      {
        application: {
          individuals: [
            {
              personal_data: {
                date_of_birth: "1997-02-13",
              },
            },
          ],
        },
      }
    );

    const hasDualNationality = container.querySelector(
      "input[name='personal_data.has_dual_nationality'][value=true]"
    );

    act(() => {
      fireEvent.click(hasDualNationality);
    });

    getByLabelText(/Second Nationality/i);
  });
});
