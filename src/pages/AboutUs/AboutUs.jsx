import React from "react";
import MyContainer from "../../components/MyContainer";

const AboutUs = () => {
  return (
    <div className="bg-base-300 py-10">
      <MyContainer className={`bg-base-100 rounded-2xl md:p-10 p-4 md:px-13`}>
        <h1 className="md:text-3xl text-2xl font-bold text-accent mb-4">
          About Us
        </h1>

        <p className="text-accent mb-4 max-w-xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <hr className="my-10 text-gray-400" />

        {/* name of each tab group should be unique */}
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Story"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Mission"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Success"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands.
            </p>
          </div>
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Team & Others"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands.
            </p>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default AboutUs;
