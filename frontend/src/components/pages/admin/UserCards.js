import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BiSearchAlt } from "react-icons/bi";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
const list = ["Student", "Teacher", "Admin"];

function UserCards() {
    const [activeRole, setActiveRole] = useState(list[0]);
    const [batch, setBatch] = useState("");
    return (
        <div className="user-cards-container">
            <div className="admin-toprow">
                <div>
                    <span>
                        Role:
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="admin-form-drop-btn role-dropdown">
                                {activeRole}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="drop-menu">
                                {list.map((item, idx) => (
                                    <Dropdown.Item
                                        className="drop-item"
                                        key={idx}
                                        onClick={() => {
                                            setActiveRole(item);
                                        }}
                                    >
                                        {item}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                    <span className="admin-select-batch">
                        Batch:
                        <input
                            className="admin-batch-input"
                            value={batch}
                            onChange={(e) => {
                                setBatch(e.target.value);
                            }}
                        />
                        <button className="batch-search">
                            <BiSearchAlt />
                        </button>
                    </span>
                </div>
                <h4>Total users: 120</h4>
            </div>
            <div className="user-cards">
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-data">
                        <div className="user-data-row">
                            <span>User: User Name</span>
                        </div>
                        <div className="user-data-row">
                            <span>Email: imt_2019103@iiitm.ac.in</span>
                        </div>
                        <div className="user-data-row">
                            <span>Role: Student</span>
                        </div>
                        <div className="user-data-row">
                            <span>Batch: IMT2019</span>
                        </div>
                    </div>
                    <div className="user-card-rightcolumn">
                        <FaUserEdit className="user-edit-icon" />
                        <BsToggleOn className="user-card-toggle-icon-on" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCards;
