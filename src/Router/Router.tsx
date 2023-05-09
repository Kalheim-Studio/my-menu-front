import { Routes, Route } from "react-router-dom";
// Pages
import * as Pages from "../pages";
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
                <Route path="/" element={<Pages.Home />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/validation" element={<ValidateAccount />} />
                    <Route path="/not-logged" element={<NotLogged />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Route>
                <Route path="/admin" element={<Pages.Admin />}>
                    <Route path="/admin/profile" element={<Profile />} />
                    <Route path="/admin/menu" element={<MenuAdmin />} />
                    <Route path="/admin/sub-accounts" element={<SubAccounts />} />
                    <Route path="/admin/qr-code" element={<QrCode />} />
                </Route>
                <Route path="/menu" element={<Pages.Menu />}>
                    <Route path="/menu/:restaurantId" element={<Pages.Menu />} />
                </Route>
                <Route path="/order" element={<Pages.Order />} />
            </Routes>
        </>
    );
};

export { Router };
