import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JobLayout from "../layouts/JobLayout";
import { getJobById } from "../services";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState();

  const fetchJob = async () => {
    const res = await getJobById(id);
    setJob(res);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  return (
    <JobLayout>
      <div className="container mx-auto mt-4">
        <Link to="/jobs" className="font-bold text-blue-700">
          Back
        </Link>
        {job && (
          <div className="bg-gradient-to-b from-gray-200 to-bg-gray-100/50 p-1 my-4">
            <div className="bg-gradient-to-b from-white to-gray-100/50 p-6">
              <p className="text-sm text-gray-600">
                {job.type} / {job.location}
              </p>
              <h1 className="font-bold text-2xl pb-6 border-b-2">
                {job.title}
              </h1>
              <div className="grid grid-cols-6 pt-4">
                <div
                  dangerouslySetInnerHTML={{ __html: job.description }}
                  className="col-span-4 -mt-4 pr-4 html-plain"
                />
                <div className="col-span-2 h-fit">
                  <div className="bg-gray-100/50 border-4 border-gray-200 mb-4">
                    <div className="flex items-center justify-between p-2">
                      <b>{job.company}</b>
                      <Link
                        to="/jobs"
                        className="bg-gray-300 rounded font-bold text-xs text-blue-700 py-1 px-3"
                      >
                        1&nbsp;other&nbsp;job
                      </Link>
                    </div>
                    <hr />
                    <div className="p-2">
                      <img src={job.company_logo} />
                      <a
                        href={job.company_url}
                        style={{ color: "revert", textDecoration: "revert" }}
                      >
                        {job.company_url}
                      </a>
                    </div>
                  </div>
                  <div className="bg-yellow-100/30 border-4 border-gray-200">
                    <p className="font-bold p-2">How to apply</p>
                    <hr />
                    <div
                      className="p-2 html-plain"
                      dangerouslySetInnerHTML={{ __html: job.how_to_apply }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </JobLayout>
  );
}
