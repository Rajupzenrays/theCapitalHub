import React from "react";
import ArrowIcon from "../../../../Images/investorIcon/Arrow.svg";
import "./SmallProfileCard.scss";

const SmallProfileCard = ({ text, width }) => {
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  const formattedDate = formatDate("2023-06-22");

  return (
    <div className="container-fluid small_card_container">
      <div
        className="row small_card_row"
        style={{ width: width ? width : "100%" }}
      >
        <div className="col-6">
          <div className="box boxOne flex_content">
            <h2 className="typography">Hello, Mr. Pramod</h2>
            <span className="smallest_typo">{formattedDate}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="box boxTwo flex_content">
            <img src={ArrowIcon} alt="arrow" />
            <h2 className="typography">{text ? text : "My Profile"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProfileCard;
