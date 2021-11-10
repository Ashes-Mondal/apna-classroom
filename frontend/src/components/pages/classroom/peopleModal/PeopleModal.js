import "./PeopleModal.scss";
import React from "react";
import Modal from "../../../common/modal/Modal";

const PeopleModal = ({ people, showPeople, setShowPeople, theme }) => {
    const emailToRNo = (email) => {
        return email.slice(4, 8) + email.slice(0, 3).toUpperCase() + "-" + email.slice(8, 11);
    };
    return (
        <Modal setOpen={setShowPeople} open={showPeople}>
            <div className="class-teachers">
                <h4>Teachers</h4>
                <div className="teachers-list">
                    {people
                        .filter((p) => p.role.toLowerCase() !== "student")
                        .map((p, key) => {
                            return (
                                <div key={key} className="person">
                                    <div className={`avatar bg-${theme}`}>{p.name[0]}</div>
                                    <div className="name">{p.name}</div>
                                </div>
                            );
                        })}
                </div>
                <br />
                <h4>Students</h4>
                <div className="teachers-list">
                    {people
                        .filter((p) => p.role.toLowerCase() === "student")
                        .map((p, key) => {
                            return (
                                <div key={key} className="person">
                                    <div className={`avatar bg-${theme}`}>{p.name[0]}</div>
                                    <div className="name">
                                        {p.name} &bull; {emailToRNo(p.email)}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </Modal>
    );
};


export default PeopleModal;
