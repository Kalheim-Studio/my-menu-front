import { Routes, Route } from "react-router-dom";
// Pages
import { Admin, Home, Menu, Order } from "../pages";
// Components
import {
    Login,
    MenuAdmin,
    Register,
    ValidateAccount,
    NotLogged,
    PageNotFound,
    Profile,
    SubAccounts,
    QrCode,
} from "../components";

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

export { Router };
