import React, { useContext, useState } from "react";
import TeamContext from "../context/TeamContext";
import _, { set } from "lodash";
import { AiOutlinePlus } from "react-icons/ai";

const DataTemplete = ({ user, createTeam }) => {

	const { newUser, setNewUser } = useContext(TeamContext)

  const handleAdd = (user) => {
    setNewUser((prevUser) =>  _.intersection(_.uniqBy([...prevUser, user], "domain",), _.filter([...prevUser, user], {available: true})));
  };

  return (
    <>
      <div className="w-80 h-72 bg-blue-100 pt-4 pl-5 mx-auto my-4 rounded shadow-lg">
        <img
          src={user.avatar}
          className={`z-100 w-20 h-20 border-4 mx-auto rounded-full mb-4 ${
            user.available ? "border-green-400" : "border-red-400"
          }`}
        ></img>
        <h2>
          <b>Name:</b> {`${user.first_name} ${user.last_name}`}
        </h2>
        <p>
          <b>Email: </b>
          {user.email}
        </p>
        <p>
          <b>Gender: </b>
          {user.gender}{" "}
        </p>
        <p>
          <b>Domain: </b>
          {user.domain}
        </p>
        <p>
          <b>Available: </b>
          {user.available ? "YES" : "NO"}
        </p>
        {createTeam && (
          <button
            onClick={() => handleAdd(user)}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded my-2 flex items-center shadow-lg"
          >
            <AiOutlinePlus className="mr-2 text-xl" /> Add
          </button>
        )}
      </div>
    </>
  );
};

export default DataTemplete;
