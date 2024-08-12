import { Route, Routes } from "react-router-dom";

import { PostsPage } from "@/pages/posts";
import UsersPage from "@/pages/users";

function App() {
  return (
    <Routes>
      <Route element={<PostsPage />} path="/" />
      <Route element={<UsersPage />} path="/users" />
    </Routes>
  );
}

export default App;
