import React, { useEffect, useState, Fragment } from "react";
import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hooks";

const Users = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const errorHandler = () => {
    clearError();
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
