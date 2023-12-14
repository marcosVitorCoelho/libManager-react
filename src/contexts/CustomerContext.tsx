import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerColumn, CustomerData } from "../interfaces/Table.interface";
import { apiBase } from "../services/api";
import { AxiosResponse } from "axios";
import { Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { CustomerSchemaData } from "../pages/Customers/CustomerForm";
import { Delete } from "@mui/icons-material";

interface CustomerContextType {
  customerColumns: CustomerColumn[];
  customerRows: CustomerData[] | undefined;
  customers: CustomersData[];
  handleDelete: (id: string) => void;
  handleCreateNewCustomers: (values: CustomerSchemaData) => void;
  handleGetCustomers: () => void;
  handleGetOneCustomer: (id: string) => Promise<CustomerSchemaData>;
  handleUpdateACustomer: (id: string, values: CustomerSchemaData) => void;
}

interface CustomerContextProps {
  children: ReactNode;
}

export interface CustomersData {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cpf: string;
}

function createData(
  firstName: string,
  lastName: string,
  phoneNumber: string,
  cpf: string,
  del: ReactNode,
  edit: ReactNode
): CustomerData {
  return {
    firstName,
    lastName,
    phoneNumber,
    cpf,
    del,
    edit,
  };
}

export interface NewCustomer {
  title: string;
  pages: number;
}

const CustomerContext = createContext({} as CustomerContextType);

const CustomerProvider: React.FC<CustomerContextProps> = ({ children }) => {
  const [customers, setCustomers] = useState<CustomersData[]>([]);
  const [customersData, setCustomersData] = useState<CustomerData[]>([]);
  const navigate = useNavigate();

  const handleGetCustomers = async () => {
    try {
      const responseData = await apiBase.get<AxiosResponse>("/customers");
      if (responseData.status === 200) {
        const { data } = responseData;
        setCustomers(data.data);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleGetOneCustomer = async (id: string) => {
    try {
      const responseData = await apiBase.get<AxiosResponse>(`/customers/${id}`);
      if (responseData.status === 200) {
        const { data } = responseData;
        return data.data;
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleCreateNewCustomers = async (values: CustomerSchemaData) => {
    try {
      const responseData = await apiBase.post<AxiosResponse>(
        "/customers",
        values
      );
      if (responseData.status === 201) {
        alert("Cliente cadastrado");
        navigate("/customers");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateACustomer = async (
    id: string,
    values: CustomerSchemaData
  ) => {
    try {
      const responseData = await apiBase.put<AxiosResponse>(
        `/customers/${id}`,
        values
      );
      if (responseData.status === 200) {
        alert("Cliente atualizado!");
        navigate("/customers");
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function handleDelete(id: string) {
    try {
      const responseData = await apiBase.delete<AxiosResponse>(
        `/customers/${id}`
      );
      if (responseData.status === 200) {
        alert("Cliente Deletado!");
        location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const columns: CustomerColumn[] = [
    { id: "firstName", label: "Nome", minWidth: 170 },
    { id: "lastName", label: "Sobrenome", minWidth: 170 },
    { id: "cpf", label: "CPF", minWidth: 170 },
    { id: "phoneNumber", label: "Telefone", minWidth: 170 },
    {
      id: "edit",
      label: "Editar",
      minWidth: 170,
    },
    {
      id: "del",
      label: "Excluir",
      minWidth: 170,
    },
  ];

  interface EditButtonProps {
    id: string;
  }

  const EditButton = ({ id }: EditButtonProps) => {
    const navigate = useNavigate();

    const handleEditCustomer = () => {
      navigate(`/customers/${id}`);
    };

    return (
      <IconButton onClick={handleEditCustomer}>
        <Edit color="info" />
      </IconButton>
    );
  };

  interface DeleteButtonProps {
    id: string;
  }

  const DeleteButton = ({ id }: DeleteButtonProps) => {
    return (
      <IconButton onClick={() => handleDelete(id)}>
        <Delete color="warning" />
      </IconButton>
    );
  };

  useEffect(() => {
    if (customers !== null) {
      setCustomersData(
        customers.map((Customer: CustomersData) => {
          return createData(
            Customer.firstName,
            Customer.lastName,
            Customer.phoneNumber,
            Customer.cpf,
            <DeleteButton id={Customer._id} />,
            <EditButton id={Customer._id} />
          );
        })
      );
    }
  }, [customers]);

  return (
    <CustomerContext.Provider
      value={{
        customerColumns: columns,
        customerRows: customersData,
        handleDelete,
        handleCreateNewCustomers,
        handleGetCustomers,
        handleGetOneCustomer,
        handleUpdateACustomer,
        customers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
export { CustomerProvider };
