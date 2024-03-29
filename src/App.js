import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthProvider from "./components/Contexts/AuthProvider";
import BookingRoute from "./components/Admin/BookingManagement/BookingRoute";
import Traveller from "./pages/Traveller/Traveller";
import AddTraveller from "./components/Traveller/AddTraveller";
import Deposite from "./pages/Deposite/Deposite";
import AddDeposite from "./components/Deposit/AddDeposite";
import BookingDetails from "./components/Admin/BookingDetails/BookingDetails";
import SearchResult from "./pages/SearchReslut/SearchResult";
import FlightInformation from "./pages/FligthInformation/FlightInformation";
import Header from "./components/Header/Header";
import RoundSearchResult from "./pages/SearchReslut/RoundSearchResult";
import RoundFlightUserInfo from "./components/FlightUserinfo/RoundFlightUserInfo";
import BankAccount from "./pages/BankAccount/BankAccount";
import AddBank from "./components/BankAccount/AddBank";
import FlightDetails from "./components/Admin/FlightDetails/FlightDetails";
import MyStaff from "./components/Admin/MyAccount/MyStaff";
import GeneralLedgerRoute from "./pages/General Ledger/GeneralLedgerRoute";
import GeneralLedgerReport from "./components/GeneralLedger/GeneralLedgerReport";
import SearchCountParent from "./components/SearchCountComponent/SearchCountParent/SearchCountParent";
import AddStaff from "./components/Admin/MyAccount/AddStaff";
import Admin from "./pages/Admin/Admin";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MultiCitySearchResult from "./components/MultiCitySearchResult/MultiCitySearchResult";
import Dashboard from "./components/Dashboard/Dashboard";
import Congratulation from "./components/Congratulation/Congratulation";
import Queues from "./components/Queues/Queues/Queues";
import QueuesDetail from "./components/Queues/Queues/QueuesDetail/QueuesDetail";
import CancelQueues from "./components/Queues/Queues/QueuesDetail/CancelQueues";
import GroupFareAllPackages from "./components/GroupFareAllPackages/GroupFareAllPackages";
import CountryDetails from "./components/Visa/CountryDetails/CountryDetails";
import TourPackages from "./components/TourPackages/TourPackages";
import NotFound from "./components/NotFound/NotFound";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import SignIn from "./components/SignIn/SignIn";
import AdminAddBank from "./components/BankAccount/AdminAddBank";
import AdminAccount from "./components/Account/AdminAccount";
import Test from "./Test";
import { Box } from "@mui/material";
import "./App.css";
import AdminDashboardSideBar from "./components/AdminDashboardSideBar/AdminDashboardSideBar";
import UserDashboardSideBar from "./components/UserDashboardSideBar/UserDashboardSideBar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import AgentManagement from "./pages/AgentManagement/AgentManagement";
import PaymentManagement from "./pages/PaymentManagement/PaymentManagement";

function App() {
  return (
    <Box>
      <AuthProvider>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path="/test" element={<Test />} />

            <Route path="/admin" element={<AdminLogin />} />

            {/* admin sidebar */}
            <Route path="/admin" element={<AdminDashboardSideBar />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/controlpanel" element={<ControlPanel />} />
              <Route
                path="/admin/searchcount"
                element={<SearchCountParent />}
              />
              <Route
                path="/admin/agentmanagement"
                element={<AgentManagement />}
              />
              <Route
                path="/admin/paymentmanagement"
                element={<PaymentManagement />}
              />

              <Route path="/admin/account" element={<AdminAccount />} />

              <Route path="/admin/bookingroute" element={<BookingRoute />} />
            </Route>

            {/* user dashboard sidebar route start here  */}
            <Route path="/userdashboardhome" element={<UserDashboardSideBar />}>
              <Route path="/userdashboardhome/mystaff" element={<MyStaff />} />
            </Route>

            {/* user dashboard sidebar route start here  */}

            {/* //todo:home page */}
            <Route path="/" element={<Home />} />

            <Route
              path="/dashboardhome/admin/addbank"
              element={<AdminAddBank />}
            />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/searchresult" element={<SearchResult />} />

            <Route
              path="/roundsearchresult"
              element={
                <PrivateRoute>
                  <RoundSearchResult />
                </PrivateRoute>
              }
            />
            <Route
              path="/multicityaftersearch"
              element={
                <PrivateRoute>
                  <MultiCitySearchResult />
                </PrivateRoute>
              }
            />
            <Route path="/flightinformation" element={<FlightInformation />} />
            <Route
              path="/roundflightinformation"
              element={
                <PrivateRoute>
                  <RoundFlightUserInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="/groupfareallpackages"
              element={
                <PrivateRoute>
                  <GroupFareAllPackages />
                </PrivateRoute>
              }
            />
            <Route
              path="/tourpackages"
              element={
                <PrivateRoute>
                  <TourPackages />
                </PrivateRoute>
              }
            />
            <Route
              path="/searchVisa/:countryName/:visaType"
              element={
                <PrivateRoute>
                  <CountryDetails />
                </PrivateRoute>
              }
            />
            {/* Quotes menu */}

            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <AdminAccount />
                </PrivateRoute>
              }
            />

            <Route
              path="/bookingdetails"
              element={
                <PrivateRoute>
                  <BookingDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/flightdetail"
              element={
                <PrivateRoute>
                  <FlightDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/mystaff"
              element={
                <PrivateRoute>
                  <MyStaff />
                </PrivateRoute>
              }
            />
            <Route
              path="/addstaff"
              element={
                <PrivateRoute>
                  <AddStaff />
                </PrivateRoute>
              }
            />

            <Route
              path="/bankaccount"
              element={
                <PrivateRoute>
                  <BankAccount />
                </PrivateRoute>
              }
            />
            <Route
              path="/addbankaccount"
              element={
                <PrivateRoute>
                  <AddBank />
                </PrivateRoute>
              }
            />

            <Route
              path="/congratulation"
              element={
                <PrivateRoute>
                  <Congratulation />
                </PrivateRoute>
              }
            />

            {/* //todo:admin route */}

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />

            {/*  //todo:search management section*/}
            <Route
              path="/admin/searchManagement"
              element={<SearchCountParent />}
            />
            <Route
              path="/admin/generalledgerroute"
              element={<GeneralLedgerRoute />}
            />
            <Route path="admin/traveller" element={<Traveller />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Box>
  );
}

export default App;
