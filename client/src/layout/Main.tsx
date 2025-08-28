import { Outlet } from "react-router"
import Header from "../components/Header"
import { Bounce, ToastContainer } from "react-toastify";


const Main = () => {
  return (
    <section className="max-w-4xl mx-auto">
        <Header/>
        <Outlet/>
        <ToastContainer position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce} />
    </section>
  )
}

export default Main