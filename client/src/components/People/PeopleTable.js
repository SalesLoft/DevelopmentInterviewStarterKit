import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DetailsModal from './DetailsModal';
import DuplicatesModal from './DuplicatesModal';
import materialTableIcons from '../MaterialTable/MaterialTableIcons';
import RefreshIcon from '@material-ui/icons/Refresh';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import InfoIcon from '@material-ui/icons/Info';

export default function PeopleTable(props) {
  const [ pageSize, setPageSize ] = useState(10);

  return (
    <div style={{ margin: '20px 0' }}>
      <MaterialTable
        icons={materialTableIcons}
        title="People"
        columns={[
          { title: 'First Name', field: 'first_name' },
          { title: 'Last Name', field: 'last_name' },
          { title: 'Job Title', field: 'title' },
          { title: 'Email', field: 'email_address' },
        ]}
        options={{
          pageSize: pageSize,
          pageSizeOptions: [10, 25, 50, 100],
          sorting: false,
          search: false,
          draggable: false,
          headerStyle: {
            backgroundColor: '#555',
            color: '#fff',
            fontWeight: 'bold'
          },
        }}
        data={query => {
          return new Promise((resolve, reject) => {
            // Make a call to the API for the appropriate data
            props.getPeopleData({
              page: query.page + 1,
              limit: query.pageSize,
            })
            .then(result => {
              // Keep the page size of the table in sync with its state
              setPageSize(query.pageSize);

              // Update the table with the appropriate data
              resolve({
                page: result.metadata.paging.current_page - 1,
                data: result.data,
                totalCount: result.metadata.paging.total_count,
              });
            })
          });
        }}
        actions={[
          {
            icon: InfoIcon,
            tooltip: 'List unique characters of all email addresses',
            onClick: () => props.openInfoModal(),
            isFreeAction: true,
          },
          {
            icon: MergeTypeIcon,
            tooltip: 'Check for duplicate records',
            onClick: () => props.openDuplicateModal(),
            isFreeAction: true,
          },
        ]}
      />
    </div>
  );
}
