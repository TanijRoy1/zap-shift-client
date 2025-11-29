import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa6";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} marked as an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} marked as an User`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
          <p className="text-sm text-gray-500">
            Total users: <span className="font-medium">{users.length}</span>
          </p>
        </div>
      </header>

      
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Admin action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((user, i) => (
              <tr key={user._id ?? i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{i + 1}</td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 overflow-hidden bg-gray-100">
                        <img
                          src={user.photoURL || "https://via.placeholder.com/96"}
                          alt={user.displayName || "User avatar"}
                          className="object-cover h-12 w-12"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.displayName || "No name"}</div>
                      <div className="text-xs text-gray-400">{user._id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">{user.email || "-"}</td>

                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : user.role === "rider"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                <td className="px-4 py-3 text-right text-sm">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 hover:bg-yellow-100"
                      title="Remove admin"
                    >
                      <FiShieldOff />
                      <span className="hidden sm:inline">Revoke Admin</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      title="Make admin"
                    >
                      <FaUserShield />
                      <span className="hidden sm:inline">Make Admin</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {users.map((user, idx) => (
          <article key={user._id ?? idx} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="mask mask-squircle h-12 w-12 overflow-hidden bg-gray-100">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/96"}
                    alt={user.displayName || "User avatar"}
                    className="object-cover h-12 w-12"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{user.displayName || "No name"}</h3>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : user.role === "rider"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {user.role || "user"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800"
                    >
                      <FiShieldOff />
                      <span className="text-xs">Revoke Admin</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white"
                    >
                      <FaUserShield />
                      <span className="text-xs">Make Admin</span>
                    </button>
                  )}
                </div>

                <div className="mt-2 text-xs text-gray-400">{user._id}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UsersManagement;
