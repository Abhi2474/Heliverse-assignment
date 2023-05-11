import React, { useContext, useEffect, useState } from "react";
import TeamContext from "../context/TeamContext";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import _ from "lodash";

const Team = () => {
  const { newUser, setNewUser } = useContext(TeamContext);

  // const usersPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filteredData, setFilteredData] = useState(newUser);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectDomain = (e) => {
    setSelectedDomain(e.target.value);
  };

  const handleSelectGender = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    document.title = "Team Page";
  }, []);

  useEffect(() => {
    let filteredData = newUser;

    if (selectedDomain) {
      filteredData = _.filter(filteredData, { domain: selectedDomain });
    }

    if (selectedGender) {
      filteredData = _.filter(filteredData, { gender: selectedGender });
    }

    if (isChecked) {
      filteredData = _.filter(filteredData, { available: true });
    }

    setFilteredData(filteredData);
  }, [selectedDomain, selectedGender, isChecked]);

  const handleClearFilters = () => {
    setSelectedDomain("");
    setSelectedGender("");
    setIsChecked(false);
    setFilteredData(newUser);
    setCurrentPage(1);
  };

  return (
    <>
      {filteredData.length ? (
        <>
          <div className="text-xl my-5 flex justify-between px-20">
            <div className="flex items-center">
              <select
                onChange={handleSelectDomain}
                className="border rounded mr-4 px-2 py-1 w-fit"
              >
                <option value="">Filter by domain</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Management">Management</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Business Development">
                  Business Development
                </option>
              </select>
              <select
                onChange={handleSelectGender}
                className="border rounded mr-4 px-2 py-1 w-fit"
              >
                <option value="">Filter by gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Polygender">Polygender</option>
                <option value="Genderqueer">Genderqueer</option>
              </select>
              <label className="flex items-center w-fit cursor-pointer border-r border-r-black pr-3">
                <b className="mr-2">Available </b>
                {isChecked ? (
                  <FaCheckSquare className="text-2xl" />
                ) : (
                  <FaRegSquare className="text-2xl" />
                )}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="hidden" // Hide the default checkbox
                />
              </label>

              <GrPowerReset
                title="Reset all filter"
                onClick={handleClearFilters}
                className=" cursor-pointer opacity-50 hover:opacity-100 text-3xl ml-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-3">
            {filteredData.map((user) => {
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
