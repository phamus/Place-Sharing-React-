import React, { useContext, Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hooks";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

import { AuthContext } from "../../shared/context/auth-context";

const UserPlaces = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/places/user/${auth.userId}`
        );

        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner onOverLay />}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </Fragment>
  );
};

export default UserPlaces;
