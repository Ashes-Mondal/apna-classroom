import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const list = ["Student", "Teacher"];

function AddUser() {
    const [active, setActive] = useState(list[1]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBatchCode, setUserBatchCode] = useState("");
    return (
        <div className="admin-form">
            <h4>Add A User</h4>
            <div>
                <span className="admin-form-label">User Type:</span>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className="admin-form-drop-btn">
                        {active}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="drop-menu">
                        {list.map((item, idx) => (
                            <Dropdown.Item
                                className="drop-item"
                                key={idx}
                                onClick={() => {
                                    setActive(item);
                                }}
                            >
                                {item}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <span className="admin-form-label">User Name:</span>
                <input
                    value={userName}
                    type="text"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
            </div>
            <div>
                <span className="admin-form-label">User Email:</span>
                <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => {
                        setUserEmail(e.target.value);
                    }}
                />
            </div>
            <span className="admin-form-label">Batch Code:</span>
            <input
                type="text"
                value={userBatchCode}
                onChange={(e) => {
                    setUserBatchCode(e.target.value);
                }}
            />
            <button className="add-user-btn bold">+ ADD</button>
        </div>
    );
}
function BulkAddUsers() {
    return (
        <div className="admin-form">
            <h4>Bulk Add Users</h4>
            <div>
                <div>The .CSV File should be structured as follows:</div>
                <div> Column 0: Email </div>
                <div>Column 1: Name </div>
                <div>Column 2: User Type </div>
                <div>Column 3: Batch Code (if type is student)</div>
            </div>
            <button className="upload-user-btn bold">+ UPLOAD .CSV</button>
            <button className="add-user-btn bold">+ ADD</button>
        </div>
    );
}
function RemoveUser() {
    const [userEmail, setUserEmail] = useState("");
    return (
        <div className="admin-form">
            <h4>Remove A User</h4>
            <div>
                <span className="admin-form-label">User Email:</span>
                <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => {
                        setUserEmail(e.target.value);
                    }}
                />
            </div>
            <button className="remove-user-btn bold">REMOVE</button>
        </div>
    );
}
function AdminForms() {
    return (
        <div className="admin-forms">
            <AddUser />
            <BulkAddUsers />
            <RemoveUser />
        </div>
    );
}

export default AdminForms;
