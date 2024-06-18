import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchClients,
  updateClientStatus,
} from "../../features/clients/clientsSlice";
import { RootState } from "../../store/store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const ClientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, error } = useSelector(
    (state: RootState) => state.clients
  );

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleStatusChange = (id: string, status: string) => {
    dispatch(updateClientStatus({ id, status }));
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <p>{error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account Number</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Tax ID</TableCell>
            <TableCell>Responsible Person</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client._id}>
              <TableCell>{client.accountNumber}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.middleName}</TableCell>
              <TableCell>
                {new Date(client.dateOfBirth).toLocaleDateString()}
              </TableCell>
              <TableCell>{client.taxId}</TableCell>
              <TableCell>{client.responsiblePerson}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell>
                <Select
                  value={client.status}
                  onChange={(e) =>
                    handleStatusChange(client._id, e.target.value as string)
                  }
                >
                  <MenuItem value="Не в работе">Не в работе</MenuItem>
                  <MenuItem value="В работе">В работе</MenuItem>
                  <MenuItem value="Отказ">Отказ</MenuItem>
                  <MenuItem value="Сделка закрыта">Сделка закрыта</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientList;
