import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type DonoughnutChartProps = {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
};

export default function DonoughnutChart({ data }: DonoughnutChartProps) {
  const chartData = {
    labels: data.map((x) => x.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color),
      },
    ],
  };

  return <Doughnut data={chartData} />;
}
