import React from "react";

export default function JobLayout({ children }) {
  return (
    <div className="bg-gray-100/50">
      <div className="navbar bg-blue-700/80 border-b-4 border-gray-200">
        <div className="container mx-auto">
          <div className="text-white normal-case text-3xl">
            <b className="mr-1">GitHub</b> Jobs
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
