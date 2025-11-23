import { Layout } from './components/Layout';
import { useCourseStore } from './store/useCourseStore';
import { useEffect } from 'react';

function App() {
  const refreshData = useCourseStore((state) => state.refreshData);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <Layout />
  );
}

export default App;
