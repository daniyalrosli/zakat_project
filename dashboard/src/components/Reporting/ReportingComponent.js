import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const ReportingComponent = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      const url = new URL(
        '/api/reporting',
        'http://localhost:3001',
      );
      url.searchParams.set(
        'page',
        `${pagination.pageIndex}`,
      );
      url.searchParams.set('size', `${pagination.pageSize}`);
      url.searchParams.set('globalFilter', globalFilter ?? '');

      try {
        const response = await fetch(url.href);
        const json = await response.json();
        setData(json.data);
        setRowCount(json.rowCount);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Nama',
        header: 'Name',
      },
      {
        accessorKey: 'StatusBaruPemutihan',
        header: 'Status',
      },
      {
        accessorKey: 'Poverty_Risk_Level',
        header: 'Risk Level',
      },
      {
        accessorKey: 'DAERAH',
        header: 'Daerah',
      },
      {
        accessorKey: 'JumlahPendapatan',
        header: 'Income (MYR)',
        Cell: ({ cell }) => cell.getValue().toLocaleString(),
      },
      {
        accessorKey: 'Can_Escape_Poverty',
        header: 'Can Escape Poverty',
        Cell: ({ cell }) => (cell.getValue() === 1 ? 'Yes' : 'No'),
      },
    ],
    [],
  );

  return (
    <div>
      <h2>Reporting</h2>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        enableColumnOrdering
        manualPagination
        manualFiltering
        rowCount={rowCount}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        state={{
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
        }}
      />
    </div>
  );
};

export default ReportingComponent;
