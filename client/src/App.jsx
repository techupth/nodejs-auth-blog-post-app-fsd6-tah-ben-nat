import "./App.css";
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";

import jwtInterceptor from "./utils/jwtInterceptor"; // นำเข้า jwtInterceptor

jwtInterceptor(); // เรียกใช้ฟังก์ชัน jwtInterceptor เพื่อเพิ่มตัวดักจับให้กับ axios

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
