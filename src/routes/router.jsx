import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Rider from "../pages/Rider/Rider";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "coverage",
                Component: Coverage,
                loader: () => fetch("./serviceCenters.json").then(res => res.json()),
            },
            {
                path: "send-parcel",
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch("./serviceCenters.json").then(res => res.json()),
            },
            {
                path: "rider",
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: () => fetch("./serviceCenters.json").then(res => res.json()),
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "my-parcels",
                Component: MyParcels
            },
            {
                path: "payment/:parcelId",
                Component: Payment
            },
            {
                path: "payment-success",
                Component: PaymentSuccess
            },
            {
                path: "payment-cancelled",
                Component: PaymentCancelled
            },
            {
                path: "payments-history",
                Component: PaymentHistory
            },
            {
                path: "assigned-deliveries",
                element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
            },
            {
                path: "completed-deliveries",
                element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
            },
            {
                path: "approve-riders",
                element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            },
            {
                path: "assign-riders",
                element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
            },
            {
                path: "users-management",
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            },
        ]
    }
])


export default router;