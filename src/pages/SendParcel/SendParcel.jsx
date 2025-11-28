import React from "react";
import MyContainer from "../../components/MyContainer";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();
  const serviceCenters = useLoaderData();
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    // console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const weight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (weight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        const minCharge = isSameDistrict ? 110 : 150;
        const extraCharge = isSameDistrict
          ? 40 * extraWeight
          : 40 * extraWeight + 40;
        cost = minCharge + extraCharge;
      }
    }
    // console.log("delivery cost", cost);
    data.cost = cost;
    data.parcelWeight = parseFloat(data.parcelWeight);

    Swal.fire({
      title: "Agree with the cost?",
      text: `You have to pay ${cost} taka.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then(res => {
          if(res.data.insertedId){
            Swal.fire({
                title: "Added!",
                text: "Your parcel has been saved.",
                icon: "success",
              });
            }
          })
      }
    });


  };

  return (
    <div className="bg-base-300 py-10">
      <MyContainer className={`bg-base-100 rounded-2xl p-8 `}>
        <h1 className="text-3xl font-bold">Add Parcel</h1>
        <form onSubmit={handleSubmit(handleSendParcel)}>
          <h2 className="text-xl font-bold">Enter your parcel details</h2>
          <fieldset className="fieldset flex items-center gap-4">
            <label className="label text-black font-medium">
              <input
                type="radio"
                {...register("parcelType")}
                value={`document`}
                className="radio"
                defaultChecked
              />
              Document
            </label>
            <label className="label text-black font-medium">
              <input
                type="radio"
                {...register("parcelType")}
                value={`non-document`}
                className="radio"
              />
              Non-Document
            </label>
          </fieldset>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <fieldset className="fieldset">
              <label className="label text-black font-medium">
                Parcel Name
              </label>
              <input
                type="text"
                {...register("parcelName")}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label text-black font-medium">
                Parcel Weight (KG)
              </label>
              <input
                type="text"
                {...register("parcelWeight")}
                className="input w-full"
                placeholder="Parcel Weight (KG)"
              />
            </fieldset>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <fieldset className="fieldset">
              <h3 className="text-xl font-bold">Sender Details</h3>
              <label className="label text-black font-medium">
                Sender Name
              </label>
              <input
                type="text"
                {...register("senderName")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender Name"
              />
              <label className="label text-black font-medium">
                Sender Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                {...register("senderEmail")}
                className="input w-full"
                placeholder="Sender Email"
              />
              <label className="label text-black font-medium">
                Sender Region
              </label>

              <select
                defaultValue="Pick a Region"
                {...register("senderRegion")}
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
                Sender District
              </label>
              <select
                defaultValue="Pick a District"
                {...register("senderDistrict")}
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <label className="label text-black font-medium">
                Sender Address
              </label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset>
            <fieldset className="fieldset">
              <h3 className="text-xl font-bold">Receiver Details</h3>
              <label className="label text-black font-medium">
                Receiver Name
              </label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />
              <label className="label text-black font-medium">
                Receiver Email
              </label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />
              <label className="label text-black font-medium">
                Receiver Region
              </label>

              <select
                defaultValue="Pick a Region"
                {...register("receiverRegion")}
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
                Receiver District
              </label>
              <select
                defaultValue="Pick a District"
                {...register("receiverDistrict")}
                className="select w-full"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <label className="label text-black font-medium">
                Receiver Address
              </label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
            </fieldset>
          </div>

          <input
            type="submit"
            className="btn btn-primary text-accent"
            value="Send A Parcel"
          />
        </form>
      </MyContainer>
    </div>
  );
};

export default SendParcel;
