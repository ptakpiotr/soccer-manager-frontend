import { useMemo } from "react";
import { IFinancePerformance } from "../../Types";
import { Chart } from "react-chartjs-2";

function FinancePerformance({ monthlyPerformance }: IFinancePerformance) {
  const data = useMemo(
    () => monthlyPerformance.map((m) => m.money),
    [monthlyPerformance]
  );
  const labels = useMemo(
    () =>
      monthlyPerformance.map((m) =>
        new Date(2001, m.month - 1, 1).toLocaleString("default", {
          month: "long",
        })
      ),
    [monthlyPerformance]
  );

  return (
    <Chart
      type={"line"}
      options={{
        borderColor: "#228b22",
      }}
      data={{
        datasets: [
          {
            data,
            label: "Financial performance",
            backgroundColor: "#228b22",
          },
        ],
        labels,
      }}
    />
  );
}

export default FinancePerformance;
