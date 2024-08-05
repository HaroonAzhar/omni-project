import { fireEvent, act, wait } from "@testing-library/react";

const addressToSearch = "NR14 7PZ";

export default async (getByText, getByLabelText) => {
  const searchInput = getByLabelText(/Search address/i);
  const searchButton = getByText(/Find address/i);

  act(() => {
    fireEvent.change(searchInput, { target: { value: addressToSearch } });
  });

  act(() => {
    fireEvent.click(searchButton);
  });

  await wait(() => {
    const selectedAddress = getByText(
      /Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ/i
    );

    act(() => {
      fireEvent.click(selectedAddress);
    });
  });
};
