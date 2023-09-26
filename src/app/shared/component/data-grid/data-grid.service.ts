export interface DataGridColumnHeader {
  show?:boolean;
  columnName: string;
  columnTitle?: string;
  sort?:boolean;
  type?: string;
  button?: Button;
  checkboxParameter?: string;
}

export interface DataGridColumnHeader {
  show?:boolean;
  columnName: string;
  columnTitle?: string;
  columnTitleKey?: string;
  columnValue?: string;
  sort?:boolean;
}

export class Link {
  linkClass?: string;
  linkName?: string;
  icon?: string;
  isIconSvg?: boolean;
  color?: string;
}

export class Button {
  buttonType?: string;
  buttonName?: string;
  icon?: string;
  isIconSvg?: boolean;
  colorParameter?: string;
  buttonAction?: string;
  disableBtnParam?: string;
  buttonClass?: string;
  tooltipKey?: string;
}

export const COLUMN_TYPE = {
  TEXT: 'text',
  TEXT_W_ELLIP: 'text-ellip',
  TEXT_W_ELLIP_L: 'text-ellip-l',
  EMAIL: 'email-ellip',
  DATE: 'date',
  BUTTON: 'button',
  LINK: 'link',
  CHECKBOX: 'checkbox',
};