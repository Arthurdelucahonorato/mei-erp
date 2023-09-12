import { Box } from "@/components/Box";
import { LineChart } from "@/components/Charts/Line";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 w-full gap-6">
      <Box>
        <LineChart />
      </Box>
      <Box>
        <LineChart />
      </Box>
      <Box>
        <LineChart />
      </Box>
      <Box>
        <LineChart />
      </Box>
      <Box>
        <LineChart />
      </Box>
      <Box>
        <LineChart />
      </Box>
    </div>
  );
}
