import { Outlet} from "react-router-dom"

const RootLayout = () => {

  return (
    <main style={{}}>
        <Outlet />
    </main>
  )
}

export default RootLayout
