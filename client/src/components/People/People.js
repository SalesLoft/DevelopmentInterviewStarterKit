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
  const [ isInfoModalOpen, setIsInfoModalOpen ] = useState(false),
    [ isDuplicateModalOpen, setIsDuplicateModalOpen ] = useState(false),
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
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          data={peopleData && peopleData.map(person => person.email_address).join('')}
        />
        <DuplicatesModal
          isOpen={isDuplicateModalOpen}
          onClose={() => setIsDuplicateModalOpen(false)}
          peopleData={peopleData}
        />
      </div>
      <PeopleTable
        getPeopleData={getPeopleData}
        openInfoModal={() => setIsInfoModalOpen(true)}
        openDuplicateModal={() => setIsDuplicateModalOpen(true)}
      />
    </Page>
  );
};
