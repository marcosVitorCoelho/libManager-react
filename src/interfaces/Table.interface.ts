export interface Data {
  title: string;
  pages: number;
  avaliable: React.ReactNode;
  edition: string;
  del?: React.ReactNode;
  edit?: React.ReactNode;
}

export interface Column {
  id: "title" | "edition" | "pages" | "avaliable" | "del" | "edit";
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

export interface TableInfo {
  rows: Data[] | undefined;
  columns: Column[];
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cpf: string;
  del?: React.ReactNode;
  edit?: React.ReactNode;
}

export interface CustomerColumn {
  id: "firstName" | "lastName" | "phoneNumber" | "cpf" | "del" | "edit";
  label: string;
  minWidth?: number;
}

export interface CustomerTableInfo {
  rows: CustomerData[] | undefined;
  columns: CustomerColumn[];
}

export interface LoanData {
  clienteName: string;
  bookName: string;
  loanDate: string;
  returnDate: string;
  del?: React.ReactNode;
  edit?: React.ReactNode;
}

export interface LoanColumn {
  id: "clienteName" | "bookName" | "loanDate" | "returnDate" | "del" | "edit";
  label: string;
  minWidth?: number;
}

export interface LoanTableInfo {
  rows: LoanData[] | undefined;
  columns: LoanColumn[];
}
