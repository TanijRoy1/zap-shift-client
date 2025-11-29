import React from "react";
import MyContainer from "../../components/MyContainer";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import agentPendingImg from "../../assets/agent-pending.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const serviceCenters = useLoaderData();
  const riderRegion = useWatch({ control, name: "region" });
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleBeARider = (data) => {
    // console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Your application has been submitted. We will reach out to you in 145 days.",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  return (
    <div className="bg-base-300 py-10">
      <MyContainer
        className={`grid lg:grid-cols-2 grid-cols-1 gap-8 bg-base-100 p-6 rounded-2xl shadow-2xl`}
      >
        <div>
          <h1 className="text-3xl font-bold text-accent">Be a Rider</h1>
          <p>
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-accent">
              Tell us about yourself
            </h3>
            <form onSubmit={handleSubmit(handleBeARider)}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                <fieldset className="fieldset">
                  <label className="label text-black font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    defaultValue={user?.displayName}
                   
                    className="input w-full"
                    placeholder="Your Name"
                  />
                  <label className="label text-black font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    {...register("email")}
                    className="input w-full"
                    placeholder="Your Email"
                  />

                  <label className="label text-black font-medium">NID No</label>
                  <input
                    type="text"
                    {...register("nid")}
                    className="input w-full"
                    placeholder="NID"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label className="label text-black font-medium">
                    Your age
                  </label>
                  <input
                    type="text"
                    {...register("age")}
                    className="input w-full"
                    placeholder="Your age"
                  />

                  <label className="label text-black font-medium">
                    Your Region
                  </label>

                  <select
                    defaultValue="Pick a Region"
                    {...register("region")}
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  <label className="label text-black font-medium">
                    Contact
                  </label>
                  <input
                    type="text"
                    {...register("contact")}
                    className="input w-full"
                    placeholder="Contact"
                  />
                </fieldset>
              </div>
              <label className="label text-black font-medium">
                Your District
              </label>
              <select
                defaultValue="Pick a District"
                {...register("district")}
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(riderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary text-accent w-full mt-4"
              />
            </form>
          </div>
        </div>
        <img src={agentPendingImg} alt="" />
      </MyContainer>
    </div>
  );
};

export default Rider;
