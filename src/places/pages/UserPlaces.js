import React from "react";
import PlaceList from "../components/PlaceList";

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

const UserPlaces = () => {
  return <PlaceList items={dummy_places} />;
};

export default UserPlaces;
