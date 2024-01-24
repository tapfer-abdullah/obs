"use client"
import { OrderStateProvider } from "@/Components/State/OrderState";
import { Autocomplete, Avatar, Box, MenuItem, Modal, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { axiosHttp } from "../helper/axiosHttp";
import CheckoutPersonalInfo from "./CheckoutPersonalInfo";
import CheckoutProductsInfo from "./CheckoutProductsInfo";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const page = () => {
    const { dataForBxGy, promoCode, setPromoCode, allCountryData } = useContext(OrderStateProvider);
    const [tip, setTip] = useState(0);
    const [subTotal, setSubtotal] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [disError, setDisError] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [discountOn, setDiscountOn] = useState("");
    const [discountOnValue, setDiscountOnValue] = useState([]);
    const [amountToBeReduce, setAmountToBeReduce] = useState(0);
    const [minusAmount, setMinusAmount] = useState(0);
    const [discountType, setDiscountType] = useState("");
    const [disAdditionalType, setDisAdditionalType] = useState("");
    // buy x get y 
    const [BxGyCartArray, setBxGyCartArray] = useState([]);
    const [BuyOnOption, setBuyOnOption] = useState("");
    const [BuyOnValue, setBuyOnValue] = useState([]);
    const [BxGyMaxUsesPerOrder, setBxGyMaxUsesPerOrder] = useState(100);
    const [discountTypeValue, setDiscountTypeValue] = useState(0);
    const [discountInput, setDiscountInput] = useState("");
    const [isLoading, setLoading] = useState(false);


    // customer info..................
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [email, setEmail] = useState("");

    const [shipping, setShipping] = useState("");
    const [shippingAmount, setShippingAmount] = useState(10);
    const [shippingReqAmount, setShippingReqAmount] = useState(0);

    console.log({ email, selectedCountry, shipping, shippingAmount, minusAmount })

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleCountryChange = (event, value) => {
        setSelectedCountry(value);
    };


    const handleDiscountCode = (code) => {
        setLoading(true);
        if (!code) {
            setLoading(false);
            setPromoCode("");
            setDiscountCode("");
            setDisError("Discount field is empty!");
            setDisAdditionalType("empty")
            return;
        }
        setPromoCode(code);
        axiosHttp.patch(`/discount`, { title: code }).then((res) => {
            const response = res.data;

            if (response?.status) {
                setDiscountInput("");
                setDisError("");
                const validCode = res.data?.data;
                // console.log(validCode);

                if (validCode?.eligibility?.option != "all") {
                    // to do 
                }

                if (validCode?.limitDisOnePerUse) {
                    if (!email) {
                        setDiscountCode("");
                        return Swal.fire({
                            title: "Email require!",
                            text: `Email is required for "${code}" discount code.`,
                            icon: "error",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Enter email?"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const { value: email } = await Swal.fire({
                                    title: "Enter email",
                                    input: "email",
                                    inputLabel: "Your email address",
                                    inputPlaceholder: "Enter your email address"
                                });
                                if (email) {
                                    setEmail(email);
                                    Swal.fire({
                                        title: `Entered email: ${email}`,
                                        text: "Use the discount code again!",
                                        icon: "success"
                                    });
                                }
                            }
                        });
                    }
                    else {
                        // to do validate if he/she used the code before 
                    }
                }
                if (validCode?.maxDisCodeUse?.option) {
                    // to do 
                }

                if (validCode?.minPurRequirement?.option != "no") {
                    if (validCode?.minPurRequirement?.option == "amount" && parseInt(validCode?.minPurRequirement?.value) > subTotal) {
                        setDisError(`Subtotal must be more than € ${validCode?.minPurRequirement?.value}`);
                        setDiscountCode("");
                        setAmountToBeReduce(0);
                        return;
                    }
                    else if (validCode?.minPurRequirement?.option == "percentage" && parseInt(validCode?.minPurRequirement?.value) > quantity) {
                        setDisError(`Items must be more than ${validCode?.minPurRequirement?.value}`);
                        setDiscountCode("");
                        setAmountToBeReduce(0);
                        return;
                    }
                }

                const type = validCode?.discountCodeType;
                setDisAdditionalType(type);


                switch (type) {
                    case "BxGy": {
                        const data = validCode?.additionalData?.BxGy;
                        setDiscountType(data?.DiscountedType.option);
                        setDiscountTypeValue(parseInt(data?.DiscountedType.value));
                        setDiscountOn(data?.Get?.option);
                        setBuyOnOption(data?.Buy?.option);

                        console.log({ data })

                        // if(data?.BxGyType == "buys"){}

                        let BxGyMaxUsesPerOrder2 = 0;
                        if (data?.MaxUser?.option) {
                            setBxGyMaxUsesPerOrder(parseInt(data?.MaxUser?.value))
                            BxGyMaxUsesPerOrder2 = parseInt(data?.MaxUser?.value);
                        }
                        else {
                            setBxGyMaxUsesPerOrder(1000);
                            BxGyMaxUsesPerOrder2 = parseInt(1000);
                        }

                        let selectedArrayBuy = [];
                        let selectedArrayGet = [];
                        if (data?.Buy?.option == "category") {
                            for (let d of data?.Buy?.value) {
                                selectedArrayBuy.push(d?.label?.toLowerCase());
                            }
                        }
                        else {
                            for (let d of data?.Buy?.value) {
                                selectedArrayBuy.push(d?.value);
                            }
                        }

                        if (data?.Get?.option == "category") {
                            for (let d of data?.Get?.value) {
                                selectedArrayGet.push(d?.label?.toLowerCase());
                            }
                        }
                        else {
                            for (let d of data?.Get?.value) {
                                selectedArrayGet.push(d?.value);
                            }
                        }

                        // BxGy shopping cart all calculation and data-----------------------------------------
                        let approvedGetArray2 = [];
                        let approvedBuyCount2 = 0;

                        dataForBxGy?.sort((a, b) => a.price - b.price)?.map(sp => {
                            if (data?.Get?.option === "products") {
                                if (selectedArrayGet.includes(sp?.id)) {
                                    approvedGetArray2.push(sp?.id);
                                }
                            } else if (data?.Get?.option === "category") {
                                if (selectedArrayGet.includes(sp?.category?.toLowerCase())) {
                                    approvedGetArray2.push(sp?.id);
                                }
                            }

                            //buy
                            if (data?.Buy?.option === "products") {
                                if (selectedArrayBuy.includes(sp?.id)) {
                                    approvedBuyCount2 += sp?.quantity;
                                }
                            } else if (data?.Buy?.option === "category") {
                                if (selectedArrayBuy.includes(sp?.category?.toLowerCase())) {
                                    approvedBuyCount2 += sp?.quantity;
                                }
                            }
                        })


                        let cusShouldGet = 0;
                        const Br = parseInt(data?.CusBuyAmount);
                        const Gr = parseInt(data?.CusGetAmount);

                        if (Br >= Gr) {
                            let s = Math.floor((approvedBuyCount2) / (Br + Gr));
                            cusShouldGet = s;
                        }
                        else {
                            let s = Math.ceil((approvedBuyCount2) / (Br + Gr));
                            cusShouldGet = approvedBuyCount2 - s;
                        }

                        let reduce = 0;
                        let updatedBxByArray = [];
                        if (data?.DiscountedType.option === "free") {
                            for (let i = 0, j = 0; i < dataForBxGy.length; i++) {
                                if (approvedGetArray2?.includes(dataForBxGy?.[i]?.id) && j < cusShouldGet && j < BxGyMaxUsesPerOrder2) {
                                    j++;
                                    reduce += dataForBxGy[i]?.price;
                                    let arrayObj = { ...dataForBxGy[i] };
                                    arrayObj.discountCode = code;
                                    arrayObj.reducedAmount = dataForBxGy[i]?.price;
                                    updatedBxByArray.push(arrayObj);
                                }
                                else {
                                    let arrayObj = { ...dataForBxGy[i] };
                                    updatedBxByArray.push(arrayObj);
                                }
                            }
                        }
                        else if (data?.DiscountedType.option == "percentage") {
                            for (let i = 0, j = 0; i < dataForBxGy.length; i++) {
                                if (approvedGetArray2?.includes(dataForBxGy?.[i]?.id) && j < cusShouldGet && j < BxGyMaxUsesPerOrder2) {
                                    j++;
                                    reduce += (dataForBxGy[i]?.price * parseInt(data?.DiscountedType.value)) / 100;
                                    let arrayObj = { ...dataForBxGy[i] };
                                    arrayObj.discountCode = code;
                                    arrayObj.reducedAmount = (dataForBxGy[i]?.price * parseInt(data?.DiscountedType.value)) / 100;
                                    updatedBxByArray.push(arrayObj);
                                }
                                else {
                                    let arrayObj = { ...dataForBxGy[i] };
                                    updatedBxByArray.push(arrayObj);
                                }
                            }
                        }
                        else if (data?.DiscountedType.option == "amount") {
                            for (let i = 0, j = 0; i < dataForBxGy.length; i++) {
                                if (approvedGetArray2?.includes(dataForBxGy?.[i]?.id) && j < cusShouldGet && j < BxGyMaxUsesPerOrder2) {
                                    j++;
                                    reduce += (parseInt(data?.DiscountedType.value));
                                    let arrayObj = { ...dataForBxGy[i] };
                                    arrayObj.discountCode = code;
                                    arrayObj.reducedAmount = parseInt(data?.DiscountedType.value);
                                    updatedBxByArray.push(arrayObj);
                                }
                                else {
                                    let arrayObj = { ...dataForBxGy[i] };
                                    updatedBxByArray.push(arrayObj);
                                }
                            }
                        }

                        setMinusAmount(reduce);
                        setBxGyCartArray(updatedBxByArray);
                        setDiscountCode(code);
                        setDiscountOnValue(selectedArrayGet);
                        setBuyOnValue(selectedArrayBuy);
                        break;
                    }


                    case "AOffP": {
                        const data = validCode?.additionalData?.AOffP;
                        setDiscountOn(data?.ApplyTo?.option)

                        let selectedArray = [];
                        if (data?.ApplyTo?.option == "category") {
                            for (let d of data?.ApplyTo?.value) {
                                selectedArray.push(d?.label?.toLowerCase())
                            }
                        }
                        else {
                            for (let d of data?.ApplyTo?.value) {
                                selectedArray.push(d?.value)
                            }
                        }
                        setDiscountType(data?.DiscountedType.option);
                        setAmountToBeReduce(parseInt(data?.DiscountedType.value));
                        setDiscountCode(code);
                        setDiscountOnValue(selectedArray);
                        break;
                    }
                    case "AOffO": {
                        const data = validCode?.additionalData?.AOffO?.DiscountedType;
                        if (data?.option == "Fixed") {
                            setDiscountType(data?.option);
                            setAmountToBeReduce(parseInt(data?.value));
                            setDiscountCode(code);
                        }
                        else {
                            setDiscountType(data?.option);
                            setAmountToBeReduce(parseInt(data?.value));
                            setDiscountCode(code);
                        }
                        break;
                    }
                    case "FS": {
                        const data = validCode?.additionalData?.FS;
                        if (data?.freeShipping?.option == "specific") { //all
                            console.log({ all: data?.freeShipping?.value, selectedCountry });
                            if (!selectedCountry) {
                                return Swal.fire({
                                    title: "Country require!",
                                    text: `Country is required for "${code}" discount code.`,
                                    icon: "error",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Enter country?"
                                }).then(async (result2) => {
                                    console.log({ result2 })
                                    if (result2.isConfirmed) {
                                        handleOpen();
                                    }
                                    else {
                                        setDiscountCode("");
                                    }
                                });
                            }
                            else {
                                let isFree = 0;
                                for (let country of data?.freeShipping?.value) {
                                    if (selectedCountry?.label == country?.label) {
                                        isFree++;
                                        break;
                                    }
                                }
                                if (isFree > 0) {
                                    setShipping("free");
                                    setMinusAmount(shippingAmount);
                                    if (data?.shippingRate?.option) {
                                        if (subTotal >= parseInt(data?.shippingRate?.value)) {
                                            setShipping("free");
                                            setMinusAmount(shippingAmount);
                                            setDisError("");
                                        }
                                        else {
                                            setShipping("not-free");
                                            setDisError("");
                                            setMinusAmount(0);
                                            setShippingReqAmount(parseInt(data?.shippingRate?.value));
                                        }
                                    }
                                }
                                else {
                                    setMinusAmount(0);
                                    setShipping("not");
                                    setDisError("Free shipping is not available in your country!")
                                }
                            }
                        }
                        else {
                            setShipping("free");
                            setMinusAmount(shippingAmount);
                            setDisError("");
                            if (data?.shippingRate?.option) {
                                if (subTotal >= parseInt(data?.shippingRate?.value)) {
                                    setShipping("free");
                                    setMinusAmount(shippingAmount);
                                    setDisError("");
                                }
                                else {
                                    setShipping("not-free");
                                    setDisError("");
                                    setMinusAmount(0);
                                    setShippingReqAmount(parseInt(data?.shippingRate?.value));
                                }
                            }
                        }
                        break;
                    }
                }
            } else {
                setDisError(response?.message);
                setDiscountCode("");
                setAmountToBeReduce(0);
                setMinusAmount(0);
                setDisAdditionalType("");
                setLoading(false);
            }
        });
        setLoading(false);
    };

    useEffect(() => {
        if (promoCode) {
            handleDiscountCode(promoCode);
            setDiscountCode(promoCode);
            setDiscountInput(promoCode);
        }
    }, [promoCode])

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h3 className="text-lg font-semibold text-center mb-3">Enter country: </h3>
                        <Autocomplete
                            options={allCountryData}
                            getOptionLabel={(option) => option.label}
                            style={{ width: "100%" }}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            renderInput={(params) => <TextField {...params} label="Country / Region" variant="outlined" />}
                            renderOption={(props, option) => (
                                <MenuItem {...props} key={option?.id}>
                                    <Avatar src={option.imageUrl} alt={option.label} />
                                    <span style={{ marginLeft: "8px" }}>{option.label}</span>
                                </MenuItem>
                            )}
                        />
                        <div className="flex justify-center">
                            <button onClick={() => {
                                handleClose();
                                Swal.fire({
                                    title: `Entered country: ${selectedCountry?.label}`,
                                    text: "Use the discount code again!",
                                    icon: "success"
                                });
                            }} className="px-4 py-1 mt-3 uppercase font-semibold text-white bg-blue-600 rounded-md hover:bg-opacity-80">Okay</button>
                        </div>
                    </Box>
                </Modal>
            </div>

            <div className="grid grid-cols-12 mx-auto mt-20">
                <div className="col-start-2 col-span-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CheckoutPersonalInfo
                        setTips={setTip}
                        subTotal={subTotal}
                        email={email}
                        setEmail={setEmail}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                    />
                    <CheckoutProductsInfo
                        email={email}
                        selectedCountry={selectedCountry}
                        handleDiscountCode={handleDiscountCode}
                        tip={tip} subTotal={subTotal}
                        setSubtotal={setSubtotal}
                        setQuantity={setQuantity}
                        disError={disError}
                        amountToBeReduce={amountToBeReduce}
                        discountCode={discountCode}
                        discountOn={discountOn}
                        discountOnValue={discountOnValue}
                        discountType={discountType}
                        minusAmount={minusAmount}
                        setMinusAmount={setMinusAmount}
                        disAdditionalType={disAdditionalType}
                        BuyOnOption={BuyOnOption} BuyOnValue={BuyOnValue}
                        discountTypeValue={discountTypeValue}
                        BxGyMaxUsesPerOrder={BxGyMaxUsesPerOrder}
                        BxGyCartArray={BxGyCartArray}
                        discountInput={discountInput} setDiscountInput={setDiscountInput}
                        isLoading={isLoading} setLoading={setLoading}
                        shipping={shipping}
                        shippingAmount={shippingAmount}
                        shippingReqAmount={shippingReqAmount}
                    />
                </div>
                <div className="bg-[#f5f5f5] -mt-5"></div>
            </div>
        </>
    );
};

export default page;