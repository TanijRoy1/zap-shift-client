import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import MyContainer from "../../components/MyContainer";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  //   console.log(serviceCenters);
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coordinate = [district.latitude, district.longitude];
      mapRef.current.flyTo(coordinate, 12);
    }
  };

  return (
    <div className="bg-base-300 py-10">
      <MyContainer className={`bg-base-100 rounded-2xl md:p-10 p-4 md:px-13`}>
        <h1 className="md:text-3xl text-2xl font-bold text-accent mb-4">
          We are available in 64 districts
        </h1>
        <form onSubmit={handleSearch} className="flex pb-2">
          <label className="input rounded-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              required
              placeholder="Search"
            />
            <button
              type="submit"
              className="btn btn-primary text-accent rounded-full transform translate-x-3.5"
            >
              Search
            </button>
          </label>
        </form>
        <hr className="my-10 text-gray-400" />
        <p className="md:text-xl text-lg font-bold text-accent mb-4">
          We deliver almost all over Bangladesh
        </p>
        <div className="mx-auto">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[500px]"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <strong>{center.district}</strong> <br />
                  Service Area: {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </MyContainer>
    </div>
  );
};

export default Coverage;
