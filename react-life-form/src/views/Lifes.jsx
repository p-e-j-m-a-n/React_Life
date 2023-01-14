import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Lifes() {
    const [lifes, setLifes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getLifes();
    }, []);

    const onDeleteClick = (life) => {
        if (!window.confirm("آیا می خواهید بیمه عمر انتخاب شده را پاک کنید ؟")) {
            return;
        }
        axiosClient.delete(`/lifes/${life.id}`).then(({ data }) => {
            setNotification("بیمه عمر با موفقیت پاک شد.");
            getLifes();
        });
    };

    const getLifes = () => {
        setLoading(true);
        axiosClient
            .get("/lifes")
            .then(({ data }) => {
                setLoading(false);
                setLifes(typeof data == "object" ? data : []);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>لیست بیمه های عمر</h1>
                <Link className="btn-add" to="/life-insurance">
                    اضافه کردن بیمه
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>آیدی</th>
                            <th>کد ملی</th>
                            <th>تاریخ تولد</th>
                            <th>مبلغ سال اول</th>
                            <th>تعداد فسط در سال</th>
                            <th>شماره موبایل</th>
                            <th>جنسیت</th>
                            <th>شغل</th>
                            <th>نسبت</th>
                            <th>تاریخ ایجاد</th>
                            <th>مدیریت</th> 
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    در حال لود شدن...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {lifes.map((life) => (
                                <tr key={life.id}>
                                    <td>{life.id}</td>
                                    <td>{life.national_code}</td>
                                    <td>{life.birth_year} / {life.birth_month} / {life.birth_day}</td>
                                    <td>{life.annual_payment}</td>
                                    <td>{life.payment_method}</td>
                                    <td>{life.mobile_number}</td>
                                    <td>{life.gender}</td>
                                    <td>{life.first_job_level}</td>
                                    <td>{life.insurance_target}</td>
                                    <td>{life.created_at}</td>
                                    <td>
                                        {/* <Link
                                            className="btn-edit"
                                            to={"/lifes/" + life.id}
                                        >
                                            تغییر
                                        </Link>
                                        &nbsp; */}
                                        <button
                                            className="btn-delete"
                                            onClick={(e) => onDeleteClick(life)}
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
