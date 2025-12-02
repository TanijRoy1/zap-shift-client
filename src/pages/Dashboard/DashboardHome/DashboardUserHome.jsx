import React from "react";

const DashboardUserHome = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-accent text-center">
        User Dashboard Overview
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        View your parcel activity, status updates, and recent deliveries.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-xl text-center">
          <h3 className="text-sm text-gray-500">Active Parcels</h3>
          <p className="text-xl font-semibold">3</p>
        </div>
        <div className="p-4 bg-white shadow rounded-xl text-center">
          <h3 className="text-sm text-gray-500">In Transit</h3>
          <p className="text-xl font-semibold">1</p>
        </div>
        <div className="p-4 bg-white shadow rounded-xl text-center">
          <h3 className="text-sm text-gray-500">Delivered Today</h3>
          <p className="text-xl font-semibold">2</p>
        </div>
        <div className="p-4 bg-white shadow rounded-xl text-center">
          <h3 className="text-sm text-gray-500">Next Pickup</h3>
          <p className="text-xl font-semibold">Tomorrow 10:30 AM</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="p-3 border rounded-lg">
            PKG-001 - In transit (ETA: Today 5:30 PM)
          </li>
          <li className="p-3 border rounded-lg">PKG-002 - Delivered</li>
          <li className="p-3 border rounded-lg">PKG-003 - Out for pickup</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardUserHome;
