import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "@/layouts/layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>Home page</Layout>} />
      <Route path="/profile" element={<Layout>Profile page</Layout>} />
      <Route path="/shop" element={<Layout>Shop page</Layout>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
