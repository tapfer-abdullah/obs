import CheckoutPersonalInfo from "./CheckoutPersonalInfo";
import CheckoutProductsInfo from "./CheckoutProductsInfo";


const page = () => {
    return (
        <div className="grid grid-cols-12 mx-auto mt-20 ">
            <div className="col-start-2 col-span-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <CheckoutPersonalInfo />
                <CheckoutProductsInfo />
            </div>
            <div className="bg-[#f5f5f5] -mt-5">

            </div>

        </div>
    );
};

export default page;