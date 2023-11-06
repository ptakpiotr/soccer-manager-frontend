import { useMemo } from "react";
import { IFinanceProfits, IFinanceSpendings } from "../../Types";
import { Chart } from "react-chartjs-2";

interface IProps {
  teamProfits: IFinanceProfits;
  teamSpendings: IFinanceSpendings;
}

function FinancePerformance({ teamProfits, teamSpendings }: IProps) {
  const data = useMemo(() => {
    let res = [];
    for (let i = 0; i < teamProfits.teamProfits.length; i++) {
      res.push({
        diff:
          teamProfits.teamProfits[i].stadium +
          teamProfits.teamProfits[i].transfers -
          (teamSpendings.teamSpendings[i].salaries +
            teamSpendings.teamSpendings[i].transfers),
      });
    }

    return res;
  }, [teamProfits]);
  const labels: string[] = teamProfits.teamProfits.map(
    (t) => `Season: ${t.season}`
  );
  //responsive charts: https://www.chartjs.org/docs/latest/configuration/responsive.html
  return (
    <Chart
      type={"line"}
      options={{
        borderColor: "#228b22",
        responsive: true,
      }}
      style={{
        maxWidth: "fit-content",
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
