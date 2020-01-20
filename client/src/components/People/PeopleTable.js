import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import materialTableIcons from '../MaterialTable/MaterialTableIcons';
import RefreshIcon from '@material-ui/icons/Refresh';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import InfoIcon from '@material-ui/icons/Info';
import { fetchFromApi } from '../../utils';

function PeopleTable(props) {
  const [ pageSize, setPageSize ] = useState(10),
    tableRef = useRef(null),
    refreshTable = () => (tableRef && tableRef.current.onQueryChange());

  return (
    <div style={{ margin: '20px 0' }}>
      <MaterialTable
        tableRef={tableRef}
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
            .catch(() => reject())
          });
        }}
        editable={{
          onRowAdd: newData => {
            return new Promise((resolve, reject) => {
              fetchFromApi('/api/people', {
                method: 'POST',
                body: JSON.stringify(newData),
              })
              .then(() => {
                resolve();
                refreshTable();
              });
            })
          },
          onRowUpdate: (newData, oldData) => {
            return new Promise((resolve, reject) => {
              fetchFromApi('/api/people/' + oldData.id, {
                method: 'PUT',
                body: JSON.stringify(newData),
              })
              .then(() => {
                resolve();
                refreshTable();
              });
            });
          },
          onRowDelete: oldData => {
            return new Promise((resolve, reject) => {
              fetchFromApi('/api/people/' + oldData.id, {
                method: 'DELETE',
              })
              .then(() => {
                resolve();
                refreshTable();
              });
            })
          }
        }}
        actions={[
          {
            icon: InfoIcon,
            tooltip: 'List unique characters of all email addresses',
            onClick: () => props.openDetailsModal(),
            isFreeAction: true,
          },
          {
            icon: MergeTypeIcon,
            tooltip: 'Check for duplicate records',
            onClick: () => props.openDuplicatesModal(),
            isFreeAction: true,
          },
          {
            icon: RefreshIcon,
            tooltip: 'Refresh table data',
            onClick: () => refreshTable(),
            isFreeAction: true,
          },
        ]}
      />
    </div>
  );
}

PeopleTable.propTypes = {
  getPeopleData: PropTypes.func.isRequired, // The function that fetches the People records needed for the table
  openDetailsModal: PropTypes.func.isRequired, // The function that opens the Details modal
  openDuplicatesModal: PropTypes.func.isRequired, // The function that opens the Duplicates modal
};

export default PeopleTable;
