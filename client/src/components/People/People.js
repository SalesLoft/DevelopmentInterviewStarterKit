import React, { useState } from 'react';
import Page from '../Page';
import DetailsModal from './DetailsModal';
import DuplicatesModal from './DuplicatesModal';
import PeopleTable from './PeopleTable';
import { fetchFromApi, encodeGetParams } from '../../utils';

const fetchPeople = ({ page, limit }) => {
  return fetchFromApi('/api/people?' + encodeGetParams({
    page,
    limit,
  }));
};

export default function People() {
  const [ isDetailsModalOpen, setIsDetailsModalOpen ] = useState(false),
    [ isDuplicatesModalOpen, setIsDuplicatesModalOpen ] = useState(false),
    [ peopleData, setPeopleData ] = useState(null);

  const getPeopleData = (params) => {
    return fetchPeople(params)
    .then(response => {
      setPeopleData(response.data);
      return response;
    });
  };

  return (
    <Page>
      <div className='modals'>
        <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          data={peopleData && peopleData.map(person => person.email_address).join('')}
        />
        <DuplicatesModal
          isOpen={isDuplicatesModalOpen}
          onClose={() => setIsDuplicatesModalOpen(false)}
          peopleData={peopleData}
        />
      </div>
      <PeopleTable
        getPeopleData={getPeopleData}
        openDetailsModal={() => setIsDetailsModalOpen(true)}
        openDuplicatesModal={() => setIsDuplicatesModalOpen(true)}
      />
    </Page>
  );
};
