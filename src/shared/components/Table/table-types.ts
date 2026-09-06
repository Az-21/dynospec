import type { LucideIcon } from "@lucide/svelte";
import type { RowData, SvelteTable, Table_ColumnOrdering } from "@tanstack/svelte-table";

import type { DefaultTableFeatures } from "./table-features.js";

/** Live TanStack table instance with column ordering enabled, bound to the shared default features. */
export type TableInstance<TData extends RowData> = SvelteTable<DefaultTableFeatures, TData> &
  Table_ColumnOrdering<DefaultTableFeatures, TData>;

/** Column move step where `-1` shifts the column left and `1` shifts it right. */
export type MoveDirection = -1 | 1;

/** Toolbar reset action rendered as a DaisyUI outline button. */
export type ToolbarAction = {
  /** Button label shown in the toolbar. */
  label: string;
  /** Lucide icon rendered before the label. */
  icon: LucideIcon;
  /** Handler run when the action is clicked. */
  onClick: () => void;
};
