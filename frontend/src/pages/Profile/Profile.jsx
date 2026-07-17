import React, { useState } from "react";

import "./Profile.css";

function Profile() {

    const [user] = useState({

        fullName: localStorage.getItem("userName") || "User",
        email: localStorage.getItem("userEmail") || "",
        role: localStorage.getItem("role") || "USER"

    });

    const initials = user.fullName
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("") || "U";

    const displayRole =
        user.role.charAt(0).toUpperCase() +
        user.role.slice(1).toLowerCase();

    return (
        <div className="profile-page">
            <div className="profile-container">

                <div className="profile-card">

                    <div className="profile-avatar">
                        {initials}
                    </div>

                    <h1>
                        My Profile
                    </h1>

                    <div className="profile-info">

                        <div className="info-box">
                            <label>
                                Name
                            </label>
                            <p>
                                {user.fullName}
                            </p>
                        </div>

                        <div className="info-box">
                            <label>
                                Email
                            </label>
                            <p>
                                {user.email || "Not provided"}
                            </p>
                        </div>

                        <div className="info-box">
                            <label>
                                Account Type
                            </label>
                            <p>
                                {displayRole}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );

}

export default Profile;