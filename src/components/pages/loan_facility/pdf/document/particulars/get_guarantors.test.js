import getGuarantors from "./get_guarantors";

describe("getGuarantors", () => {
  it("Handles empty objects", () => {
    const individuals = [];
    const company = [];

    const expectedGuarantors = [];

    const guarantors = getGuarantors({ individuals, company });

    expect(guarantors).toEqual(expectedGuarantors);
  });
  it("Picks indirect shareholder guarantors", () => {
    const individuals = [
      {
        links: "indirect",
        personal_data: {
          forename: "indirect",
          surname: "indirect",
        },
      },
      {
        links: "/officers/pcGJLV-gFieOA3XfUN_gbqJullU/appointments",
        personal_data: { forename: "Daniel", surname: "Christey" },
      },
    ];
    const company = [
      {
        directors: [
          {
            name: "Daniel Christey",
            links: "/officers/pcGJLV-gFieOA3XfUN_gbqJullU/appointments",
            is_guarantor: true,
          },
        ],
        shared_holders: [
          {
            name: "Child",
            held: "100.00",
            isCompany: true,
            is_guarantor: true,
            company: [
              {
                name: "indirect",
                held: "100.00",
                isCompany: false,
                is_guarantor: true,
                links: "indirect",
              },
            ],
            links: "Child",
          },
        ],
      },
    ];

    const expectedGuarantors = individuals;

    const guarantors = getGuarantors({ individuals, company });

    expect(guarantors).toEqual(expectedGuarantors);
  });

  it("Picks direct shareholder guarantors", () => {
    const individuals = [
      {
        links: "indirect",
        personal_data: {
          forename: "indirect",
          surname: "indirect",
        },
      },
      {
        links: "direct",
        personal_data: {
          forename: "direct",
          surname: "direct",
        },
      },
      {
        links: "/officers/pcGJLV-gFieOA3XfUN_gbqJullU/appointments",
        personal_data: { forename: "Daniel", surname: "Christey" },
      },
    ];
    const company = [
      {
        directors: [
          {
            name: "Daniel Christey",
            links: "/officers/pcGJLV-gFieOA3XfUN_gbqJullU/appointments",
            is_guarantor: true,
          },
        ],
        shared_holders: [
          {
            name: "direct",
            held: "100.00",
            isCompany: false,
            is_guarantor: true,
            links: "direct",
          },
          {
            name: "Child",
            held: "100.00",
            isCompany: true,
            is_guarantor: true,
            company: [
              {
                name: "indirect",
                held: "100.00",
                isCompany: false,
                is_guarantor: true,
                links: "indirect",
              },
            ],
            links: "Child",
          },
        ],
      },
    ];

    const expectedGuarantors = individuals;

    const guarantors = getGuarantors({ individuals, company });

    expect(guarantors).toEqual(expectedGuarantors);
  });
});
