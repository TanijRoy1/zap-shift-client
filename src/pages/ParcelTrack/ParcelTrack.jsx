import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import MyContainer from "../../components/MyContainer";

const ParcelTrack = () => {
  const axiosPublic = useAxiosPublic();
  const { trackingId } = useParams();

  const { data: trackings = [] } = useQuery({
    queryKey: ["trackings", trackingId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  return (
    <div className="bg-base-300 py-10">
      <MyContainer className={`bg-base-100 p-8 rounded-2xl shadow-2xl`}>
        <h1 className="text-accent text-2xl font-bold">Trackings ID: {trackingId}</h1>
        <p>Tracks so far {trackings.length}</p>

        <ul className="timeline timeline-vertical">
          {trackings.map((log) => (
            <li key={log._id}>
              <div className="timeline-start">
                {new Date(log.createdAt).toLocaleString()}
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box text-xl font-semibold capitalize">{log.details}</div>
              <hr />
            </li>
          ))}
        </ul>
      </MyContainer>
    </div>
  );
};

export default ParcelTrack;
