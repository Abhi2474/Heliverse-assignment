import React, { useEffect, useState } from "react";
import mock_data from "../assets/mock_data.json";
import DataTemplete from "../components/DataTemplete";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import _ from "lodash";

const Home = () => {
  const usersPerPage = 50;
  //   const totalPages = Math.ceil(mock_data.length / usersPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filteredData, setFilteredData] = useState(mock_data);
  const [isChecked, setIsChecked] = useState(false);
  const [createTeam, setCreateTeam] = useState(false);

  const data = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

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
    document.title = "Home";
  }, []);

  useEffect(() => {
    let filteredData = mock_data;

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
    setFilteredData(mock_data);
    setCurrentPage(1);
  };

  const handleTeam = () => {
    setCreateTeam(!createTeam);
  };

  return (
    <div className="container mx-auto">
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
            <option value="Business Development">Business Development</option>
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

        <button
          onClick={handleTeam}
          className="flex items-center justify-end text-orange-600 cursor-pointer text-lg bg-gray-50 hover:bg-gray-100 rounded py-1 px-2 shadow-md"
        >
          {!createTeam ? (
            <AiOutlinePlus className="mr-2" />
          ) : (
            <RxCross2 className="mr-2" />
          )}
          Create Team
        </button>
      </div>
      <p className="text-center text-xl">
        <b>{currentPage}</b> out of <b>{totalPages}</b>
      </p>
      {selectedDomain.length || selectedGender.length ? (
        <p className="container mx-auto px-16">
          <b>{data.length}</b> results per page out of{" "}
          <b>{filteredData.length}</b>
        </p>
      ) : (
        ""
      )}
      <div className="sm:grid sm:grid-cols-3 flex flex-wrap mx-10">
        {data.map((user) => {
          return (
            <DataTemplete key={user.id} user={user} createTeam={createTeam} />
          );
        })}
      </div>
      <div className="mb-16 flex justify-between container mx-auto px-16">
        <button
          disabled={currentPage < 2}
          onClick={handlePreviousPage}
          className={`bg-green-600 font-bold px-3 py-1 rounded cursor-pointer text-white disabled:cursor-not-allowed disabled:bg-gray-400`}
        >
          Previous
        </button>
        <button
          disabled={currentPage > totalPages - 1}
          onClick={handleNextPage}
          className={`bg-green-600 font-bold px-3 py-1 rounded cursor-pointer text-white disabled:cursor-not-allowed disabled:bg-gray-400`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
