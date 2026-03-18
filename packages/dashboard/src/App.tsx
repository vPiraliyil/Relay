import { StatsBar } from './components/StatsBar';
import { JobTable } from './components/JobTable';
import { DlqPanel } from './components/DlqPanel';

export function App(): React.JSX.Element {
  // TODO: fetch stats and jobs from admin API on mount
  // TODO: set up polling interval to refresh data

  return (
    <div>
      <h1>Relay Dashboard</h1>
      <StatsBar />
      <JobTable />
      <DlqPanel />
    </div>
  );
}
