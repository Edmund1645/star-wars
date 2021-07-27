import React, { useMemo } from 'react';
import { useTable, Column, useSortBy } from 'react-table';

import styles from '../assets/css/modules/CharactersDetails.module.css';

const genderRep = (gender: string) => {
  switch (gender.toLowerCase()) {
    case 'male':
      return 'M';
    case 'female':
      return 'F';
    case 'none':
      return 'N/A';
    case 'n/a':
      return 'N/A';
    case 'hermaphrodite':
      return 'H';
    default:
      return '?';
  }
};

interface Props {
  charactersList: ICharacter[];
}

const CharacterTable: React.FC<Props> = ({ charactersList }) => {
  const columns = useMemo<Column<ICharacter>[]>(() => {
    return [
      { Header: 'Name', accessor: 'name', Footer: ({ rows }) => <strong>Total: {rows.length}</strong> },
      { Header: 'Gender', accessor: 'gender', Cell: ({ value }) => genderRep(value) },
      {
        Header: 'Height',
        accessor: 'height',
        Footer: ({ rows }) => {
          const totalInCM = useMemo(() => {
            return rows.reduce((sum, row) => (parseInt(row.values.height) || 0) + sum, 0);
          }, [rows]);
          const totalInFeet = totalInCM / 30.48;
          const totalFeetSplit = totalInFeet.toString().split('.');
          const totalFeetWhole = parseInt(totalFeetSplit[0]);
          const totalFeetInches = (parseFloat(`0.${totalFeetSplit[1]}`) * 12).toFixed(2);
          return <strong>{`~ ${totalInCM.toLocaleString()}cm (${totalFeetWhole.toLocaleString()}ft/${totalFeetInches}in)`}</strong>;
        },
      },
    ];
  }, []);
  const data = useMemo(() => {
    return charactersList;
  }, [charactersList]);

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);
  return (
    <div className={styles.table_container}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')} <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
        {/* <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default CharacterTable;
