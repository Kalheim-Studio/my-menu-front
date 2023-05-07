import { Routes, Route } from "react-router-dom";
// Pages
import Home from "../../pages/Home/Home";
import Admin from "../../pages/Admin/Admin";
import Menu from "../../pages/Menu/Menu";
import Order from "../../pages/Order/Order";
// Components
import Login from "../Login/Login";
import Register from "../Register/Register";
import ValidateAccount from "../ValidateAccount/ValidateAccount";
import NotLogged from "../NotLogged/NotLogged";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import SubAccounts from "../SubAccounts/SubAccounts";
import QrCode from "../QrCode/QrCode";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/validation" element={<ValidateAccount />} />
                    <Route path="/not-logged" element={<NotLogged />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route path="/admin/profile" element={<Profile />} />
                    <Route path="/admin/menu" element={<MenuAdmin />} />
                    <Route path="/admin/sub-accounts" element={<SubAccounts />} />
                    <Route path="/admin/qr-code" element={<QrCode />} />
                </Route>
                <Route path="/menu" element={<Menu />}>
                    <Route path="/menu/:restaurantId" element={<Menu />} />
                </Route>
                <Route path="/order" element={<Order />} />
            </Routes>
        </>
    );
};

export default Router;
