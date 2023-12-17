import Banner from "@/Components/Pages/Home/Banner/Banner"
import NewArrival from "@/Components/Pages/Home/NewArrival/NewArrival"
import Products from "@/Components/Pages/Home/Products/Products"

export const metadata = {
  title: "Home | OdbhootStore"
}

export default function Home() {
  return (
    <div className=''>

      <Banner />
      <NewArrival />
      <Products />


      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias quaerat labore consectetur blanditiis asperiores eum amet excepturi assumenda? Sequi!
      </div>
    </div>
  )
}
