import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchClients,
  updateClientStatus,
} from "../../features/clients/clientsSlice";
import { RootState } from "../../store/store";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Account Number</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Date of Birth</th>
          <th>Tax ID</th>
          <th>Responsible Person</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client._id}>
            <td>{client.accountNumber}</td>
            <td>{client.lastName}</td>
            <td>{client.firstName}</td>
            <td>{client.middleName}</td>
            <td>{new Date(client.dateOfBirth).toLocaleDateString()}</td>
            <td>{client.taxId}</td>
            <td>{client.responsiblePerson}</td>
            <td>{client.status}</td>
            <td>
              <select
                value={client.status}
                onChange={(e) => handleStatusChange(client._id, e.target.value)}
              >
                <option value="Не в работе">Не в работе</option>
                <option value="В работе">В работе</option>
                <option value="Отказ">Отказ</option>
                <option value="Сделка закрыта">Сделка закрыта</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientList;
