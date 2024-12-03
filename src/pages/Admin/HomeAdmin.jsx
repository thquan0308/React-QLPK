import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, HomeOutlined, HomeTwoTone, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {  Col, Row, Switch } from 'antd';
import { FaUserDoctor } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import MenuNav from '../../components/Admin/Menu/Menu';
import Login from './Login';
import BodyAdmin from '../../components/Admin/BodyAdmin/BodyAdmin';
import AdminLayout from '../../components/Admin/AdminLayout';

const HomeAdmin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            // Nếu không có token, điều hướng về trang đăng nhập
            navigate("/admin/login-admin"); 
        }
    }, [navigate]);

    return (
        <AdminLayout pageTitle="Trang chủ">
            {/* Nội dung của BodyAdmin cho HomeAdmin */}
            <h1>Trang quản trị chính</h1>
            <p>Đây là nội dung của trang chủ.</p>
        </AdminLayout>
    );
};
export default HomeAdmin;