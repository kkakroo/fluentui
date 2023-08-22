import * as React from 'react';
import type { DataGridBodyProps, DataGridBodyState } from './DataGridBody.types';
import { useTableBody_unstable } from '../TableBody/useTableBody';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { useTableContext } from '../../contexts/tableContext';

/**
 * Create the state required to render DataGridBody.
 *
 * The returned state can be modified with hooks such as useDataGridBodyStyles_unstable,
 * before being passed to renderDataGridBody_unstable.
 *
 * @param props - props from this instance of DataGridBody
 * @param ref - reference to root HTMLElement of DataGridBody
 */
export const useDataGridBody_unstable = (props: DataGridBodyProps, ref: React.Ref<HTMLElement>): DataGridBodyState => {
  const { sortable } = useTableContext();
  const getRows = useDataGridContext_unstable(ctx => ctx.getRows);
  const sort = useDataGridContext_unstable(ctx => ctx.sort.sort);
  const sortableColums = useDataGridContext_unstable(ctx => ctx.getSortableColumns)();
  // ColumnId context not valid here.
  const gridSortable =
    sortable || sortableColums.find(c => c.columnId === 'clickedColumnId found from context') !== undefined;
  // If current sort clicked column exists in sortable or sort prop applied on grid, apply sort.
  const rows = gridSortable ? sort(getRows()) : getRows();

  const baseState = useTableBody_unstable({ ...props, children: null, as: 'div' }, ref);
  return {
    ...baseState,
    rows,
    renderRow: props.children,
  };
};
