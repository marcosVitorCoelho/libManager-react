import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface Field {
  field: string;
  id?: string;
}
export interface IInputProps {
  onChange: (date: Date) => void;
  label?: string;
  field?: Field;
  children?: React.ReactNode;
}

export default function CustomDatePicker({
  children,
  label,
  field,
  onChange,
  ...props
}: IInputProps) {
  return (
    <DatePicker id="date" {...field} {...props} onChange={onChange}>
      {children}
    </DatePicker>
  );
}
