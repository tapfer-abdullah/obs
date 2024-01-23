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

    useEffect(() => {
        let reduce = 0;
        let newArray = dataForBxGy?.sort((a, b) => a.price - b.price);

        if (disAdditionalType === "BxGy") {
            if (discountType === "free") {
                if (approvedGetCount < cusShouldGet) {
                    for (let i = 0; i < approvedGetCount && i < BxGyMaxUsesPerOrder; i++) {
                        reduce += newArray[i]?.price;
                    }
                }
                else {
                    for (let i = 0; i < cusShouldGet && i < BxGyMaxUsesPerOrder; i++) {
                        reduce += newArray[i]?.price;
                    }
                }
            }
            else if (discountType == "percentage") {
                if (approvedGetCount < cusShouldGet) {
                    for (let i = 0; i < approvedGetCount && i < BxGyMaxUsesPerOrder; i++) {
                        reduce += (newArray[i]?.price * discountTypeValue) / 100;
                    }
                }
                else {
                    for (let i = 0; i < cusShouldGet && i < BxGyMaxUsesPerOrder; i++) {
                        reduce += (newArray[i]?.price * discountTypeValue) / 100;
                    }
                }
            }
            else if (discountType == "amount") {
                if (approvedGetCount < cusShouldGet) {
                    for (let i = 0; i < approvedGetCount && i < BxGyMaxUsesPerOrder; i++) {
                        reduce += (discountTypeValue);
                    }
                }
                else {
                    for (let i = 0; i < cusShouldGet && i < BxGyMaxUsesPerOrder; i++) {
                        reduce += (discountTypeValue);
                    }
                }
            }
            setMinusAmount(reduce);
        }

    }, [discountCode, subTotal, cusShouldGet])

    console.log("kkkkkkkkkkkkkkkk", { cusShouldGet })

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

                        if (data?.MaxUser?.option) {
                            setBxGyMaxUsesPerOrder(parseInt(data?.MaxUser?.value))
                        }
                        else {
                            setBxGyMaxUsesPerOrder(1000);
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
                    CusBuyAmount={CusBuyAmount} CusGetAmount={CusGetAmount} BxGyType={BxGyType}

                    approvedBuyCount={approvedBuyCount} setApprovedBuyCount={setApprovedBuyCount}
                    approvedGetCount={approvedGetCount} setApprovedGetCount={setApprovedGetCount}
                    approvedGetArray={approvedGetArray} setApprovedGetArray={setApprovedGetArray}
                    setCusShouldGet={setCusShouldGet}
                    discountTypeValue={discountTypeValue}
                    BxGyMaxUsesPerOrder={BxGyMaxUsesPerOrder}
                />
            </div>
            <div className="bg-[#f5f5f5] -mt-5"></div>
        </div>
    );
};

export default page;