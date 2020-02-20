import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validator";

import "./PlaceForm.css";

const dummy_places = [
  {
    id: "u1",
    title: "Lagos City",
    description: "Beautiful Place in Lagos ",
    imageUrl: "https://bantuphotos.com/watermark/water-mark-YhuocfMvn0.jpg",
    address: "CMS Central Park, Marina Road, Lagos",
    location: {
      lat: 6.4509483,
      lng: 3.3870513
    },
    creator: "u1"
  },
  {
    id: "u2",
    title: "Abuja City",
    description: "Beautiful Place in Abuja ",
    imageUrl: "https://hotels.ng/guides/wp-content/uploads/2017/06/abuja.jpg",
    address: "Sheraton Abuja Hotel",
    location: {
      lat: 9.0644326,
      lng: 7.480963
    },
    creator: "u2"
  }
];

const UpdatePlaces = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = dummy_places.filter(place => place.id === placeId);

  if (!identifiedPlace) {
    return (
      <div>
        <h2>Could not find place</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={() => {}}
        value={identifiedPlace[0].title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characteres)"
        onInput={() => {}}
        value={identifiedPlace[0].description}
        valid={true}
      />

      <Button type="submit" disabled={true}>
        {" "}
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlaces;
