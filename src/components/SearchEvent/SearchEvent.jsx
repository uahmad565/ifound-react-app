import React, { useState, useEffect, useRef } from "react";
import "./SearchEvent.css";
import SearchLocation from "../SearchLocation/searchLocation";
import { cities } from "../../static/static";
import listenForOutsideClick from "../HelperComponents/listen-for-outside-clicks";

export default function SearchEvent({ inputValue,filteredList,onSearchClick,handleSearchEvent }) {
  
  const [isOpen, setIsOpen] = useState(false);
  // Hide Dropdown on Outside Click
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  

  return (
    <div className="searchArea" ref={menuRef}>
      <div className="position-relative">
        <div>
          <div className="d-flex bg-white">
            <input
              class="input-elevated" type="text"
              id="headerSearch"
              placeholder="Search by City"
              name="s"
              onChange={handleSearchEvent}
              onClick={() => setIsOpen(true)}
              value={inputValue}
            />
          </div>
          <div style={{ marginTop: "0.2rem" }}></div>
          {isOpen ? (
            <div className="ab5c51c3">
              {filteredList.map((value, index) => (
                <SearchLocation
                  onClick={() => onSearchClick(value, setIsOpen)}
                  key={index}
                  name={value}
                ></SearchLocation>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
