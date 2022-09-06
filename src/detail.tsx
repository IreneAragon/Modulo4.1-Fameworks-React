import React from "react";
import { Link, useParams } from "react-router-dom";

export const DetailPage: React.FC = () => {
  const {id} = useParams();

  return (
    <div className="detail-container">
      <h2>Hello from Detail page</h2>
      <h3>User Id: {id}</h3>
      <Link to="/list" className="link-text">Back to list page</Link>
    </div>
  );
};
