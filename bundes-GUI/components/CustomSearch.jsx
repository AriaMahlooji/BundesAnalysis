import { getAllTeams } from "@/data_fetchers/home_page_fetchers/teams_fetcher";
import React, { useEffect, useState, useRef } from "react";
import { useTeamId } from "@/context APIs/TeamIdContext";
import { getTeamImageById } from "@/data_fetchers/home_page_fetchers/team_image_fetcher";
import Image from "next/image";

function CustomSearch({ items }) {
  // State for search query and filtered items
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
  const { teamId, setTeamId } = useTeamId();

  const setChosenTeam = (item) => {
    setTeamId(item.id);
    setTeamName(item.name);
    setIsDropdownVisible(false);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    getAllTeams()
      .then((res) => res.json())
      .then((data) => {
        data.map((item) =>
          getTeamImageById(item.id)
            .then((res) => res.json())
            .then((d) => (item["logo"] = d.image))
        );
        setSearchItems(data);
        setTeamName(data.find((item) => item.id === teamId).name);
      });

    //console.log(searchItems);
  }, []);
  // Function to handle search input
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setTeamName(e.target.value);
    setQuery(searchQuery);
  };

  useEffect(() => {
    if (searchItems) {
      console.log(searchItems);
      setFilteredItems(
        searchItems.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    if (query !== "") setIsDropdownVisible(true);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ">
      <input
        type="text"
        placeholder="Search teams"
        value={teamName}
        onChange={handleSearch}
        className=" bg-gray-300 w-full py-2 px-4 rounded-r-lg focus:outline-none focus:border-blue-500 border border-l-white"
      />

      {isDropdownVisible && filteredItems.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-1 bg-gray-300 border border-white rounded-lg shadow-lg p-1 pr-2 pl-2 flex flex-col space-y-2 max-h-80 overflow-y-auto"
        >
          {filteredItems.map((item) => (
            <div
              onClick={() => setChosenTeam(item)}
              className="flex  hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <Image
                className="rounded-[50%]"
                src={`data:image/png;base64,${item.logo}`}
                width="30"
                height="30"
                alt="user"
              ></Image>
              <li
                key={item.key} // Use a unique key, like 'key'
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
              >
                {item.name}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSearch;
