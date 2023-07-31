import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import TagService from "../../services/TagService";
import Alert from "../../components/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";

const UpdateTag = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state;
  const [updateTag, setUpdateTag] = useState({
    tagString: rowData.tagName,
    newTagString: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setUpdateTag({ ...updateTag, newTagString: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    try {
      if (!updateTag.newTagString) {
        setAlert({ type: "error", message: "Yeni Etiket boş olamaz." });
        setLoading(false);
        return;
      }

      const response = await TagService.updateTag(updateTag);

      if (response.status === 200) {
        setAlert({ type: "success", message: "Etiket başarıyla güncellendi." });
        navigate("/etiket");
      } else {
        setAlert({
          type: "error",
          message: "Etiket güncelleme başarısız oldu.",
        });
      }
    } catch (error) {
      console.error("Error updating tag:", error);
      setAlert({
        type: "error",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  };

  //vazgeç butonuna basarsa kullanılan method
  const navigateMain = (e) => {
    navigate("/etiket");
  };

  //

  const header = {
    header: "Etiket Güncelle",
    href: "/etiket/guncelle",
    describe:
      "Etiket Güncelleme sayfasıdır. Bu sayfada etiket güncelleyebilirsiniz.",
  };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/",
    },
    {
      title: "Etiket İşlemleri",
      href: "/etiket",
    },
    {
      title: "Etiket Güncelle",
      href: "/etiket/guncelle",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col bg-white h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <form
          onSubmit={handleSubmit}
          className="class1 flex justify-center align-center"
        >
          <div className="class2 bg-[#F1F1F1] flex justify-center align-center m-auto ">
            <div className="class3 bg-[#FEFEFE] m-auto  flex flex-col justify-center gap-14 ">
              <div className="flex flex-col gap-14 justify-center items-center">
                <Input half disabled value={rowData.tagName} />
                <Input
                  placeholder="Yeni Etiketi Giriniz"
                  half
                  required
                  onChange={onChange}
                  value={updateTag.newTagString}
                />
                <div className="w-1/2 flex justify-center">
                  {alert.type && (
                    <Alert type={alert.type} message={alert.message} />
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-7 flex-wrap">
                <Button className="" primary rounded bold type="submit">
                  {loading ? "Yükleniyor..." : "KAYDET"}
                </Button>
                <Button
                  onClick={navigateMain}
                  className=""
                  secondary
                  rounded
                  bold
                >
                  VAZGEÇ
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </Layout>
  );
};

export default UpdateTag;
