import { Layout } from './components/Layout';
import { ProgramSelector } from './components/ProgramSelector';
import { useCourseStore } from './store/useCourseStore';
import { useEffect } from 'react';

function App() {
  const { refreshData, currentProgramId } = useCourseStore();

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (!currentProgramId) {
    return <ProgramSelector />;
  }

  return (
    <Layout />
  );
}

export default App;
