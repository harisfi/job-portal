import React, { useEffect, useState } from "react";
import JobItem from "../components/JobItem";
import JobLayout from "../layouts/JobLayout";
import { getAllJobs } from "../services";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [jobDesc, setJobDesc] = useState("");
  const [jobLoc, setJobLoc] = useState("");
  const [jobFull, setJobFull] = useState(false);

  const fetchJobs = async () => {
    const reset = jobDesc.length > 0 || jobFull || jobLoc.length > 0;

    if (reset) {
      setJobs([]);
    }

    const res = await getAllJobs({
      ...(jobDesc.length > 0 && { description: jobDesc }),
      ...(jobLoc.length > 0 && { location: jobLoc }),
      ...(jobFull && { full_time: jobFull }),
      page,
    });

    setJobs(reset ? res : [...jobs, ...res]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page !== 1) {
      setPage(1);
    } else {
      fetchJobs();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <JobLayout>
      <div className="container mx-auto mt-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-10">
          <div className="col-span-4 form-control w-full pr-4">
            <label className="label">
              <span className="label-text font-bold">Job Description</span>
            </label>
            <input
              type="text"
              placeholder="Filter by title, benefits, companies, expertise"
              className="input input-bordered w-full"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>
          <div className="col-span-4 form-control w-full pr-4">
            <label className="label">
              <span className="label-text font-bold">Location</span>
            </label>
            <input
              type="text"
              placeholder="Filter by city, state, zip code, or country"
              className="input input-bordered w-full"
              value={jobLoc}
              onChange={(e) => setJobLoc(e.target.value)}
            />
          </div>
          <div className="col-auto form-control h-full flex justify-end">
            <label className="label cursor-pointer justify-start mb-1">
              <input
                type="checkbox"
                className="checkbox mr-2"
                checked={jobFull}
                onClick={(e) => setJobFull(e.target.checked)}
              />
              <span className="label-text font-bold">
                Full&nbsp;Time&nbsp;Only
              </span>
            </label>
          </div>
          <div className="col-auto h-full flex items-end justify-end">
            <button
              disabled={!jobDesc && !jobFull && !jobLoc}
              type="submit"
              className="btn normal-case px-8 border-0 bg-gradient-to-b from-blue-400/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-600"
            >
              Search
            </button>
          </div>
        </form>
        <div className="bg-gradient-to-b from-gray-200 to-bg-gray-100/50 p-1 mt-4">
          <div className="bg-gradient-to-b from-white to-gray-100/50 p-6">
            <h1 className="font-bold text-2xl mb-8">Job List</h1>
            {jobs.length ? (
              jobs.map((j) => (j ? <JobItem {...j} key={j.id} /> : null))
            ) : (
              <i>No job available</i>
            )}
          </div>
        </div>
        <button
          onClick={() => setPage(page + 1)}
          className="btn normal-case my-8 w-full border-0 bg-gradient-to-b from-blue-400/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-600"
        >
          More Jobs
        </button>
      </div>
    </JobLayout>
  );
}
