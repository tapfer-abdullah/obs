"use client";
import DBCollectionTypeCard from "@/Components/CustomComponents/DBCollectionTypeCard/DBCollectionTypeCard";
import DBModal from "@/Components/CustomComponents/Modals/DBModal";
import { axiosHttp } from "@/app/helper/axiosHttp";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import DBFilteredProductCard from "../DBCards/DBFilteredProductCard";
import DBTypesForm from "./DBTypesForm";

const DBTypes = () => {
  const [activeType, setActiveType] = useState("");
  const [typeData, setTypeData] = useState([]);

  const [productsData, setProductsData] = useState([]);
  const [isReset, setReset] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.ibb.co/NSYqCtV/image.png");
  const [allTypes, setAllTypes] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [collectionInfo, setCollectionInfo] = useState({});
  const [collectionOldData, setCollectionOldData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const handleOpenUpdate = () => setOpenUpdate(true);

  useEffect(() => {
    axiosHttp
      .get(`/types`)
      .then((res) => {
        setTypeData(res.data);
        setActiveType(res.data?.[0]?.title);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [refetch]);

  useEffect(() => {
    axiosHttp
      .get(`/products?category=${activeType}`)
      .then((res) => {
        setProductsData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [activeType, refetch]);

  const handleCreateType = (event) => {
    event.preventDefault();
    const form = event.target;
    if (isReset == "reset") {
      form.reset();
      setReset("");
      return;
    }

    const title = form.title.value;
    const visibility = form.visibility.value;
    const img = form.img.value;
    const url = form.url.value;
    const description = form.description.value;

    const typeData = { title, visibility, img, url, description };

    axiosHttp
      .post("/types", typeData)
      .then((res) => {
        form.reset();
        setRefetch(refetch + 1);
        setReset("");
        handleClose();
        if (res.data?.status) {
          Swal.fire({
            title: "Created!",
            text: "Type has been created.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Unable!",
            text: res?.data?.message,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateType = (event) => {
    event.preventDefault();
    const form = event.target;
    if (isReset == "reset") {
      form.reset();
      setReset("");
      return;
    }

    const title = form.title.value;
    const type = form.type.value;
    const img = form.img.value;
    const url = form.url.value;
    const description = form.description.value;

    const typeData = { title, type, img, url, description };
    console.log(typeData);

    axiosHttp
      .put(`collections/${collectionInfo?.id}`, typeData)
      .then((res) => {
        if (res.data?.status) {
          form.reset();
          setRefetch(refetch + 1);
          setReset("");
          handleCloseUpdate();
          Swal.fire({
            title: "Updated!",
            text: "Collection has been updated.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Unable!",
            text: "Unable to update collection.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCollection = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosHttp.delete(`collections/${id}`).then((res) => {
          if (res.data?.status) {
            setRefetch(refetch + 1);
            Swal.fire({
              title: "Deleted!",
              text: "Collection has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Unable!",
              text: "Unable to delete collection.",
              icon: "error",
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    const field = collectionInfo?.id;

    if (field && field != "Types") {
      axiosHttp
        .get(`/collections/${collectionInfo?.id}`)
        .then((res) => {
          setCollectionOldData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [collectionInfo, imgUrl]);

  return (
    <div>
      <DBModal open={open} handleClose={handleClose}>
        <DBTypesForm imgUrl={imgUrl} setReset={setReset} setImgUrl={setImgUrl} handleSubmit={handleCreateType}>
          Create
        </DBTypesForm>
      </DBModal>
      <DBModal open={openUpdate} handleClose={handleCloseUpdate}>
        <DBTypesForm isLoading={isLoading} data={collectionOldData} imgUrl={imgUrl} setReset={setReset} setImgUrl={setImgUrl} handleSubmit={handleUpdateType}>
          Update
        </DBTypesForm>
      </DBModal>

      <div className="mb-5 flex justify-between items-center px-3 py-2 bg-[#d5ddda] shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold">All Available Types</h1>

        <button onClick={handleOpen} className="flex gap-2 items-center bg-white py-2 px-4 rounded-lg font-semibold cursor-pointer">
          <IoMdAdd className="text-xl" />
          <span>New Type</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          {typeData?.map((d) => (
            <DBCollectionTypeCard
              setLoading={setLoading}
              key={d?._id}
              setInfo={setCollectionInfo}
              handleOpen={handleOpenUpdate}
              handleDelete={handleDeleteCollection}
              activeType={activeType}
              setActiveType={setActiveType}
              data={d}
            />
          ))}
        </div>

        <div className="m-2 rounded-lg bg-[#def1e7]">
          <h3 className="text-xl font-semibold py-2 text-center">
            Collections of {activeType} type ({productsData.length})
          </h3>
          <DBFilteredProductCard productsData={productsData} />
        </div>
      </div>
    </div>
  );
};

export default DBTypes;
