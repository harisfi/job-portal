import React from "react";
import { Link } from "react-router-dom";
import { timeSince } from "../utils";

export default function JobItem({
  id,
  title,
  company,
  type,
  location,
  created_at,
}) {
  return (
    <div className="mt-2 border-t-2 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <Link to={id} className="font-bold text-blue-600">
            {title}
          </Link>
          <p className="text-sm">
            <span className="text-gray-600">{company} - </span>
            <span className="font-bold text-green-700">{type}</span>
          </p>
        </div>
        <div className="text-sm text-gray-600 text-end">
          <p className="font-bold">{location}</p>
          <p title={created_at}>{timeSince(new Date(created_at))} ago</p>
        </div>
      </div>
    </div>
  );
}
