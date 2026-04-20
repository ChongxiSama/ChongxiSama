import { siteData } from '@/lib/data';
import ArchiveFlow from '@/components/ArchiveFlow';
import TopStripe from '@/components/layout/TopStripe';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#D6D0C2]">
      <TopStripe />
      <ArchiveFlow data={siteData} />
    </div>
  );
}
