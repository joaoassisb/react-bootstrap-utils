/* eslint-disable no-console */
import React, { useState } from 'react';
import { Table } from '../dist/main';

export function TableExamples() {
  const [sortState, setSortState] = useState({ sortBy: 'a', sortOrder: 'ASC' });

  function changeSort(attribute) {
    console.log('sorting by', attribute);

    setSortState((prevState) => {
      const attributeChanged = prevState.sortBy !== attribute;
      const order = !attributeChanged && prevState.sortOrder === 'ASC' ? 'DESC' : 'ASC';

      return {
        sortBy: attribute,
        sortOrder: order,
      };
    });
  }

  function buildSortingHeader(label, attribute) {
    return (
      <div className="d-flex justify-content-between">
        {label}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            changeSort(attribute);
          }}
        >
          {sortState.sortBy === attribute ? (
            sortState.sortOrder === 'ASC' ? (
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Sort_up_1.18.gif" alt="V" />
            ) : (
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Sort_down_1.18.gif" alt="A" />
            )
          ) : (
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Sort_both.svg" alt="V/A" />
          )}
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col mb-3">
          <h1 className="h4">Simple Table</h1>
          <Table
            columns={['a', 'b', 'c']}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
          />
        </div>

        <div className="col mb-3">
          <h1 className="h4">Table with formated colums</h1>
          <Table
            columns={[
              { attribute: 'a', label: 'A', align: 'center' },
              { attribute: 'b', label: 'B', align: 'right' },
              { attribute: 'c', label: 'C' },
            ]}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
          />
        </div>

        <div className="col mb-3">
          <h1 className="h4">Table with formatted values </h1>
          <Table
            columns={[
              {
                attribute: 'selected',
                label: '#',
                format() {
                  return <input type="checkbox" />;
                },
              },
              {
                attribute: 'a',
                label: 'A',
                format(v) {
                  return `${v}*`;
                },
              },
              {
                attribute: 'b',
                label: 'B',
                format(v, doc) {
                  return v + doc.a;
                },
              },
              {
                attribute: 'c',
                label: 'C',
                format(_, __, docIndex) {
                  return <strong>{docIndex + 1}</strong>;
                },
              },
            ]}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
          />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <h1 className="h4">Table with custom styles</h1>
          <Table
            columns={['a', 'b', 'c']}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
            dark={true}
            small={false}
            hover={false}
            striped={false}
            bordered={true}
            rowClass={(doc) => (doc.b % 2 === 1 ? 'table-primary' : '')}
          />
        </div>

        <div className="col mb-3">
          <h1 className="h4">Table with row actions</h1>
          <Table
            columns={[
              { attribute: 'a', label: 'A', align: 'center' },
              { attribute: 'b', label: 'B', align: 'right' },
              { attribute: 'c', label: 'C' },
            ]}
            docs={[
              { a: 1, b: 2, c: 3 },
              { a: 4, b: 5, c: 6 },
              { a: 7, b: 8, c: 9 },
            ]}
            actions={[
              {
                title: 'View details',
                content: <span>V</span>,
                link(doc) {
                  return `#/${doc.a}`;
                },
              },
              {
                title: 'Remove item',
                content: '-',
                onClick(doc) {
                  console.log('removing', doc);
                },
              },
            ]}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 mb-3">
          <h1 className="h4">Table with custom header</h1>

          <Table
            columns={[
              {
                attribute: 'a',
                label: 'A',
              },
              {
                attribute: 'b',
                label: 'B',
              },
              {
                attribute: 'c',
                label: 'C',
              },
            ]}
            columnHeaderFormat={buildSortingHeader}
            docs={sortData(
              [
                { a: 1, b: 9, c: 3 },
                { a: 6, b: 5, c: 7 },
                { a: 8, b: 2, c: 4 },
              ],
              sortState
            )}
          />
        </div>
      </div>
    </div>
  );
}

function sortData(data, { sortBy, sortOrder }) {
  return data.sort((a, b) => {
    const diff = a[sortBy] - b[sortBy];

    return sortOrder === 'ASC' ? diff : -diff;
  });
}