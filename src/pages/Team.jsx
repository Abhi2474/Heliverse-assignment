import React, { useContext, useEffect, useState } from "react";
import TeamContext from "../context/TeamContext";
import _ from "lodash";

const Team = () => {
  const { newUser, setNewUser } = useContext(TeamContext);

  useEffect(() => {
    document.title = "Team Page";
  }, []);

  return (
    <>
      {newUser.length ? (
        <>
          <div className="grid grid-cols-3">
            {newUser.map((user) => {
              return (
                <div
                  key={user.id}
                  className="w-80 h-72 bg-blue-100 py-6 pl-5 mx-auto my-4 rounded shadow-lg"
                >
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
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1 className="text-center text-5xl font-bold font-serif mt-20">
          Create Team First
        </h1>
      )}
    </>
  );
};

export default Team;
