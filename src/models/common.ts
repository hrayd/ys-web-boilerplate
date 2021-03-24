export type AsyncCallback<T = any> = (data: { isOk: boolean, data: T }) => void;

export type NumberBoolean = 0 | 1;

export type Dict = { id: number | string; name: string };

export type RuleValue = 0 | 1;
