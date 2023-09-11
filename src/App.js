import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import AdminsList from "./features/user/AdminsList";
import ReviewersList from "./features/user/ReviewersList";
import VehiclesList from "./features/vehicle/VehiclesList";
import OngoingOrdersList from "./features/order/OngoingOrdersList";
import OrdersHistoryList from "./features/order/OrdersHistoryList";
import CreateOrder from "./features/order/CreateOrder";
import SetCompleteOrder from "./features/order/SetCompleteOrder";
import Login from "./features/auth/Login";
import AdminRegister from "./features/auth/AdminRegister";
import ReviewerRegister from "./features/auth/ReviewerRegister";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} >
      <Route index element={<Public />} />
      <Route path="login" element={<Login />} />
      <Route path="adminRegister" element={<AdminRegister/>} />
      <Route path="reviewerRegister" element={<ReviewerRegister/>} />
      <Route path="unauthorized" element={<Unauthorized />} />

      <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={['Administrator', 'Reviewer']}/>}>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="admins">
            <Route index element={<AdminsList />} />
            </Route>
          
          <Route path="reviewers">
            <Route index element={<ReviewersList />} />
          </Route>
          
          <Route path="vehicles">
            <Route index element={<VehiclesList />} />
          </Route>
          
          <Route path="ongoingOrders">
            <Route index element={<OngoingOrdersList />} />
            <Route path="SetCompleteOrder/:id" element={<SetCompleteOrder />} />
          </Route>

          <Route path="ordersHistory">
            <Route index element={<OrdersHistoryList />} />
          </Route>
          
          <Route path="newOrder">
            <Route index element={<CreateOrder />} />
          </Route>
        </Route>

      </Route>
      </Route>     

      </Route>
    </Routes>
  );
}

export default App;
