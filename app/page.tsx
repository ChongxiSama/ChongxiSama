import { getSiteData } from '@/lib/data';
import ArchiveFlow from '@/components/ArchiveFlow';
import TopStripe from '@/components/layout/TopStripe';

export default function Home() {
  const data = getSiteData();

  return (
    <div className="relative min-h-screen bg-[#D6D0C2]">
      <TopStripe />
      <ArchiveFlow data={data} />
    </div>
  );
}
