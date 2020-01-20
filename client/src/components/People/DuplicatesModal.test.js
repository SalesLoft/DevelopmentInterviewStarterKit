import { getPossibleDuplicates } from './DuplicatesModal';

const peopleDataWithTwoSetsOfDuplicates = [
  {
    id: 1,
    first_name: 'Kyle',
    last_name: 'Porter',
    title: 'CEO',
    email_address: 'kporter@salesloft.com',
  },
  {
    id: 2,
    first_name: 'Kyle',
    last_name: 'Porter',
    title: 'CEO',
    email_address: 'kkporter@salesloft.com',
  },
  {
    id: 3,
    first_name: 'Sean',
    last_name: 'Murray',
    title: 'Chief Revenue Officer',
    email_address: 'smurray@salesloft.com',
  },
  {
    id: 4,
    first_name: 'Sean',
    last_name: 'Murray',
    title: 'Chief Revenue Officer',
    email_address: 'murray@salesloft.com',
  },
  {
    id: 11,
    first_name: 'Sara',
    last_name: 'Strange',
    title: 'Account Manager',
    email_address: 'strange@hotmail.com',
  },
];

const peopleDataWithManySameLastNamesAndNoDuplicates = [
  {
    id: 43,
    first_name: 'John',
    last_name: 'Smith',
    title: 'Job Title',
    email_address: 'jsmith@salesloft.com',
  },
  {
    id: 44,
    first_name: 'Hank',
    last_name: 'Smith',
    title: 'Job Title',
    email_address: 'hsmith@salesloft.com',
  },
  {
    id: 45,
    first_name: 'Tom',
    last_name: 'Smith',
    title: 'Job Title',
    email_address: 'tsmith@salesloft.com',
  },
  {
    id: 3,
    first_name: 'John',
    last_name: 'Locke',
    title: 'Account Manager',
    email_address: 'jlocke@salesloft.com',
  },
  {
    id: 4,
    first_name: 'Tom',
    last_name: 'Locke',
    title: 'Account Manager',
    email_address: 'tlocke@salesloft.com',
  },
  {
    id: 7,
    first_name: 'Sarah',
    last_name: 'Smith',
    title: 'Sales Executive',
    email_address: 'ssmith@salesloft.com',
  },
  {
    id: 9,
    first_name: 'Brittany',
    last_name: 'Smith',
    title: 'Account Manager',
    email_address: 'bsmith@salesforce.com',
  },
];

const peopleWithSameEmailAddresses = [
  {
    id: 9,
    first_name: 'Brittany',
    last_name: 'Smith',
    title: 'Account Manager',
    email_address: 'bsmith@salesforce.com',
  },
  {
    id: 10,
    first_name: 'Jessica',
    last_name: 'Strange',
    title: 'Account Manager',
    email_address: 'strange@ajc.com',
  },
  {
    id: 11,
    first_name: 'Sara',
    last_name: 'Strange',
    title: 'Account Manager',
    email_address: 'strange@ajc.com',
  },
];

it('Possible duplicates found', () => {
  const testResult = getPossibleDuplicates(peopleDataWithTwoSetsOfDuplicates);
  expect(testResult.length).toBe(2);
  expect(testResult[0].length).toBe(2);
  expect(testResult[1].length).toBe(2);
});

it('People with same email address are duplicates', () => {
  const testResult = getPossibleDuplicates(peopleWithSameEmailAddresses);
  expect(testResult.length).toBe(1);
  expect(testResult && testResult[0] && testResult[0][0].email_address).toBe('strange@ajc.com');
});

it('People with similar email addresses but with no possible duplicates detected', () => {
  const testResult = getPossibleDuplicates(
    peopleDataWithManySameLastNamesAndNoDuplicates
  );
  expect(testResult.length).toBe(0);
});
