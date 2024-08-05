const faker = require('faker');
const uuidv4 = require('uuid/v4');

const dip_form = require('./data/constant_dip_form.json');

function getDashboard(size) {
  return Array(size).fill().map(() => ({
    type: 'dashboard',
    id: faker.random.number(),
    attributes: {
      name: faker.name.findName(),
      ref_number: faker.random.number(),
      date_created: '05/07/2022',
      gross_amount: 123123,
      loan_term: 22,
      status: faker.random.number({ min: 1, max: 2 }),
    },
  }));
}

function getDipForms(size) {
  return Array(size).fill().map(() => ({
    type: 'dip_form',
    id: uuidv4(),
    attributes: {
      form: {
        loan: {
          type: faker.random.arrayElement(['single', 'multiple']),
        },
        applicant_details: {
          type: faker.random.arrayElement(['company', 'individual']),
        },
        company_details: {
          company_name: faker.company.companyName(),
          address: faker.address.streetAddress('###'),
          zip: faker.address.zipCode(),
          email: faker.internet.email(),
        },
        securities: {
          zip: faker.address.zipCode(),
          openmarket_value: faker.finance.amount(),
        },
        loan_property: {
          type: faker.random.arrayElement(['development', 'none']),
          building_details: faker.random.arrayElement([true, false]),
        },
        loan_details: {
          loan_amount: faker.finance.amount(),
          gross_load_amount: faker.finance.amount(),
          market_value: faker.finance.amount(),
          loan_term: 22,
          arrangement_fee: faker.random.number({ min: 10, max: 80 }),
          interest_rate: faker.random.number({ min: 10, max: 40 }),
          insurance_fee: faker.finance.amount(),
          legal_fee: faker.finance.amount(),
          commission_free: faker.finance.amount(),
        },
        financial_details: {
          max_ltv: faker.random.number({ min: 10, max: 60 }),
          ltv_gdv: faker.random.number({ min: 10, max: 50 }),
        },
      },
    },
  }));
}

module.exports = () => {
  return {
    dip_form: {
      data: getDipForms(10),
    },
    dashboard: {
      data: getDashboard(10),
    },
    constant_dip_form: [dip_form],
    create_dip: {
      data: {
        id: 'da2d4e2d-3865-4654-a18d-14bb4bd7863d',
      },
    },
    create_case: {
      ref: '1234-asdf',
      id: '234',
    },
    cases: {
      data: [
        {
          name: 'John Doe',
          ref_number: '190906-999999',
          date_created: '05/07/2022',
          gross_amount: 123123,
          status: 1,
        },
        {
          name: 'Tom Jons',
          ref_number: '310406-129599',
          date_created: '01/04/2022',
          gross_amount: 12113183,
          status: 1,
        },
        {
          name: 'Victoria Burton',
          ref_number: '554061-129599',
          date_created: '21/09/2021',
          gross_amount: 91238743,
          status: 1,
        },
      ],
    },
  };
};
