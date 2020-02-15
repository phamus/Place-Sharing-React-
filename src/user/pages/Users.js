import React from "react";
import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Phamus Jose",
      image:
        "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      place: 3
    },
    {
      id: "u2",
      name: "Jose Sam",
      image:
        "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      place: 4
    }
  ];
  return <UserList items={USERS} />;
};

export default Users;
