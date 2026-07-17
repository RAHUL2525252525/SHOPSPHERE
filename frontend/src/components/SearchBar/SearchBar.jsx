import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(){

    const [search,setSearch] = useState("");

    const handleSearch = (e)=>{

        setSearch(e.target.value);

    };


    return(

        <div className="search-container">


            <div className="search-box">


                <input

                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={handleSearch}

                />


                <button>

                    🔍

                </button>


            </div>


        </div>

    );

}


export default SearchBar;