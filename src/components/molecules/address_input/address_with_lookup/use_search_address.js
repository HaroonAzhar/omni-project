import { useEffect, useState } from "react";

import { handlePostcoderLookup } from "utils/requests";

const formatAddress = (address) => ({
  line_1: address.addressline1,
  line_2: address.addressline2,
  town_city: address.posttown,
  postcode: address.postcode,
  country: "united kingdom",
});

const useSearchAddress = (addressToSearch) => {
  const [addresses, setAddresses] = useState();

  useEffect(() => {
    if (addressToSearch) {
      handlePostcoderLookup({ addressToSearch }).then((result) => {
        setAddresses(result);
      });
    }
  }, [addressToSearch]);

  return { addresses, formatAddress };
};

export default useSearchAddress;
