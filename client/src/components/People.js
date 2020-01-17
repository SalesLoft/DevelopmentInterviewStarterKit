import React, { useRef, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { encodeGetParams } from '../utils';
import materialTableIcons from './MaterialTableIcons';
import RefreshIcon from '@material-ui/icons/Refresh';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import InfoIcon from '@material-ui/icons/Info';
import Page from './Page';
import DetailsModal from './People/DetailsModal';
import DuplicatesModal from './People/DuplicatesModal';
import PeopleTable from './PeopleTable';

const fetchPeople = ({ page, limit }) => {
  return fetch('/api/people?' + encodeGetParams({
    page,
    limit,
  }))
  .then(response => response.json());
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
}
