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
import { useForceUpdate } from '../utils';

export default function People() {
  const [ isInfoModalOpen, setIsInfoModalOpen ] = useState(false),
    [ isDuplicateModalOpen, setIsDuplicateModalOpen ] = useState(false),
    [ peopleData, setPeopleData ] = useState(null);

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
        setPeopleData={setPeopleData}
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsDuplicateModalOpen={setIsDuplicateModalOpen}
      />
      {/*

      */}
    </Page>
  );
}
