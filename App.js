import MainContainer from './src/navigation/MainContainer';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  
  return (
    <AuthProvider>
        <MainContainer />
    </AuthProvider>
    
  );
}


