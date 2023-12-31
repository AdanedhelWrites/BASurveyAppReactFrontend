import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../studentList/studentListPage.css";
import { Link, useNavigate } from "react-router-dom";
import Table from '../../../components/Table/Table';
import Layout from '../../../components/Layout'
import StudentService from '../../../services/StudentService';
import BreadCrumbs from '../../../components/BreadCrumbs'
import LocalStorageServiceUser from "../../../store/user-store"

function StudentListPage() {

  const [students, setStudents] = useState([]);

  const header = ["No", "Adı", "Soyadı", "Eposta", "Kayıt Tarihi", "Sınıfı"];

  // To delete selected question
  const deleteTableRows = async (index, rowData) => {
    const response = await StudentService.delete(rowData.oid);
    if (response.status === 200) {
      alert(rowData.oid + " No'lu öğrenci başarıyla silindi");
    } else {
      alert("bir hata meydana geldi");
    }
    console.log(response);
    const rows = [...students];
    rows.splice(index, 1);
    setStudents(rows);
  };

  const navigate = useNavigate();

  const handleEditClick = (rowData) => {
    console.log(rowData.oid);
    console.log(rowData)
    LocalStorageServiceUser.setUserOid(rowData.oid);
    LocalStorageServiceUser.setSelectedRole("Student")
    navigate("/kullanici-bilgileri-guncelle"); //editleme url'i gelecek
  };

  // To get all list 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StudentService.list()
        console.log(response);
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const header2 = { header: "Öğrenci Listesi", to: "/ogrenci-listesi", describe: "Öğrenci listeme sayfasına hoşgeldiniz buradan öğrencileri görüntüleyebilir, silebilir ve güncelleyebilirsiniz." };
  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Sınıf İşlemleri",
      to: "/ogrenci-listesi",
    },
    {
      title: "Öğrenci Listesi",
      to: "/ogrenci-listesi",
    },
  ];

  return (
    <Layout>
      <div className='flex flex-col  gap-10 bg-slate-100 h-full'>
        <BreadCrumbs header={header2} subtitle={subtitle} />
        <Table data={students} header={header} useIcon={true} useLabel={true} deleteTableRows={deleteTableRows} editTableRows={handleEditClick} />
      </div>
    </Layout>
  )
}

export default StudentListPage