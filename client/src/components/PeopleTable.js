import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { encodeGetParams } from '../utils';
import materialTableIcons from './MaterialTableIcons';
import RefreshIcon from '@material-ui/icons/Refresh';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import InfoIcon from '@material-ui/icons/Info';
import Page from './Page';
import DetailsModal from './People/DetailsModal';
import DuplicatesModal from './People/DuplicatesModal';

export default function PeopleTable(props) {
  const [ state, setState ] = useState({
    pageSize: 10,
    page: 1,
    data: [],
    totalCount: 0,
  });

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
          pageSize: state.pageSize,
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
            props.getPeopleData({
              page: query.page + 1,
              limit: query.pageSize,
            })
            .then(result => {
              const newData = {
                page: result.metadata.paging.current_page - 1,
                data: result.data,
                totalCount: result.metadata.paging.total_count,
              };

              /**/
              setState(Object.assign({}, state, newData, {
                pageSize: query.pageSize
              }));
              /**/
              // setPageSize(query.pageSize);

              resolve(newData);
            })
          });
        }}
        actions={[
          {
            icon: MergeTypeIcon,
            tooltip: 'Check for duplicate records',
            onClick: () => props.openDuplicateModal(),
            isFreeAction: true,
          },
          {
            icon: InfoIcon,
            tooltip: 'List unique characters of all email addresses',
            onClick: () => props.openInfoModal(),
            isFreeAction: true,
          }
        ]}
      />
    </div>
  );
}
