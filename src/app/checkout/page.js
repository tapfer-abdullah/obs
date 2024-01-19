"use client"
import { useState } from "react";
import { axiosHttp } from "../helper/axiosHttp";
import CheckoutPersonalInfo from "./CheckoutPersonalInfo";
import CheckoutProductsInfo from "./CheckoutProductsInfo";


const page = () => {
    const [tip, setTip] = useState(0);
    const [subTotal, setSubtotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [email, setEmail] = useState("");
    const [disError, setDisError] = useState("");

    const [discountCode, setDiscountCode] = useState("");
    const [discountType, setDiscountType] = useState("");
    const [discountTypeValue, setDiscountTypeValue] = useState([]);
    const [totalAfterDis, setTotalAfterDis] = useState(0);
    const [amountToBeReduce, setAmountToBeReduce] = useState(0);
    const [actionOfDis, setActionOfDis] = useState("");

    // console.log(quantity, email, selectedCountry)
    console.log("Amount: ", amountToBeReduce)



    const handleDiscountCode = (code) => {

        if (!code) {
            setDisError("Discount field is empty!");
            return;
        }

        axiosHttp.patch(`/discount`, { title: code }).then((res) => {
            const response = res.data;
            console.log("clicked", quantity, response)

            if (response?.status) {
                setDisError("");
                const validCode = res.data?.data;
                // console.log(validCode);

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

                console.log(validCode);
                const type = validCode?.discountCodeType;

                switch (type) {
                    case "BxGy": {
                        console.log("type bxgy");
                        break;
                    }

                    case "AOffP": {
                        const data = validCode?.additionalData?.AOffP;
                        setDiscountType(data?.ApplyTo?.option)

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
                        setActionOfDis(data?.DiscountedType.option);
                        setAmountToBeReduce(parseInt(data?.DiscountedType.value));
                        setDiscountCode(code);
                        setDiscountTypeValue(selectedArray);
                        break;
                    }
                    case "AOffO": {
                        const data = validCode?.additionalData?.AOffO?.DiscountedType;
                        if (data?.option == "Fixed") {
                            setActionOfDis(data?.option);
                            setAmountToBeReduce(parseInt(data?.value));
                            setDiscountCode(code);
                        }
                        else {
                            // setAmountToBeReduce((parseInt(data?.value) * subTotal) / 100)?.toFixed(2);
                            setActionOfDis(data?.option);
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
                    discountType={discountType}
                    discountTypeValue={discountTypeValue}
                    actionOfDis={actionOfDis}
                />
            </div>
            <div className="bg-[#f5f5f5] -mt-5"></div>
        </div>
    );
};

export default page;