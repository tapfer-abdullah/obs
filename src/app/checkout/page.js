"use client"
import { OrderStateProvider } from "@/Components/State/OrderState";
import { useContext, useEffect, useState } from "react";
import { axiosHttp } from "../helper/axiosHttp";
import CheckoutPersonalInfo from "./CheckoutPersonalInfo";
import CheckoutProductsInfo from "./CheckoutProductsInfo";


const page = () => {
    const { cartData, dataForBxGy } = useContext(OrderStateProvider);
    const [tip, setTip] = useState(0);
    const [subTotal, setSubtotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [email, setEmail] = useState("");
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

    const [CusBuyAmount, setCusBuyAmount] = useState(0);
    const [CusGetAmount, setCusGetAmount] = useState(0);
    const [BxGyType, setBxGyType] = useState("");
    const [BxGyMaxUsesPerOrder, setBxGyMaxUsesPerOrder] = useState(100);


    const [approvedBuyCount, setApprovedBuyCount] = useState(0);
    const [approvedGetCount, setApprovedGetCount] = useState(0);
    const [approvedGetArray, setApprovedGetArray] = useState([]);

    const [discountTypeValue, setDiscountTypeValue] = useState(0);
    const [cusShouldGet, setCusShouldGet] = useState(0);

    const handleDiscountCode = (code) => {
        if (!code) {
            setDisError("Discount field is empty!");
            setDisAdditionalType("empty")
            return;
        }
        setApprovedBuyCount(0);
        setApprovedGetCount(0);
        setApprovedGetArray([]);

        axiosHttp.patch(`/discount`, { title: code }).then((res) => {
            const response = res.data;

            if (response?.status) {
                setDisError("");
                const validCode = res.data?.data;
                console.log(validCode);

                if (validCode?.eligibility?.option != "all") {
                    // to do 
                }
                if (validCode?.limitDisOnePerUse) {
                    // to do 
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
                        setCusBuyAmount(parseInt(data?.CusBuyAmount));
                        setCusGetAmount(parseInt(data?.CusGetAmount));
                        setBxGyType(data?.BxGyType);

                        let BxGyMaxUsesPerOrder2 = 0;
                        if (data?.MaxUser?.option) {
                            setBxGyMaxUsesPerOrder(parseInt(data?.MaxUser?.value))
                            BxGyMaxUsesPerOrder2 = parseInt(data?.MaxUser?.value);
                        }
                        else {
                            setBxGyMaxUsesPerOrder(1000);
                            BxGyMaxUsesPerOrder2 = parseInt(1000);
                        }

                        console.log(data?.MaxUser?.value)

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


                        // new work -----------------------------------------

                        let approvedGetArray2 = [];
                        let approvedBuyCount2 = 0;

                        dataForBxGy?.sort((a, b) => a.price - b.price)?.map(sp => {
                            if (data?.Get?.option === "products") {
                                if (selectedArrayGet.includes(sp?.id)) {
                                    setApprovedGetArray((p) => [...p, sp?.id]);
                                    approvedGetArray2.push(sp?.id);
                                }
                            } else if (data?.Get?.option === "category") {
                                if (selectedArrayGet.includes(sp?.category?.toLowerCase())) {
                                    setApprovedGetArray((p) => [...p, sp?.id]);
                                    approvedGetArray2.push(sp?.id);
                                }
                            }

                            //buy
                            if (data?.Buy?.option === "products") {
                                if (selectedArrayBuy.includes(sp?.id)) {
                                    setApprovedBuyCount((p) => p + sp?.quantity);
                                    approvedBuyCount2 += sp?.quantity;
                                }
                            } else if (data?.Buy?.option === "category") {
                                if (selectedArrayBuy.includes(sp?.category?.toLowerCase())) {
                                    setApprovedBuyCount((p) => p + sp?.quantity);
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
                        console.log({ updatedBxByArray, reduce })


                        // new work -----------------------------------------


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
                            // setAmountToBeReduce((parseInt(data?.value) * subTotal) / 100)?.toFixed(2);
                            setDiscountType(data?.option);
                            setAmountToBeReduce(parseInt(data?.value));
                            setDiscountCode(code);
                        }

                        break;
                    }
                    case "FS": {
                        console.log("type FS");
                        break;
                    }
                }
            } else {
                setDisError(response?.message);
                setDiscountCode("");
                setAmountToBeReduce(0);
                setMinusAmount(0);
                setDisAdditionalType("");
            }
        });
    };

    return (
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

                    setCusShouldGet={setCusShouldGet}
                    discountTypeValue={discountTypeValue}
                    BxGyMaxUsesPerOrder={BxGyMaxUsesPerOrder}

                    BxGyCartArray={BxGyCartArray}
                />
            </div>
            <div className="bg-[#f5f5f5] -mt-5"></div>
        </div>
    );
};

export default page;