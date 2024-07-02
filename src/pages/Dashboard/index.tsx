import { useEffect, useState } from "react";
import { format } from "date-fns";
import { IoCheckmarkCircle, IoCheckmark } from "react-icons/io5";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import {
  Table,
  Row,
  SingleLineCell,
  DoubleLineCell,
} from "../../components/Table";
import styles from "./Dashboard.module.css";
import fakeData from "../../data.json";
import DonoughnutChart from "../../components/DonoughnutChart";
import { COLORS } from "../../constants";

type AppStatus =
  | "Approved"
  | "Rejected"
  | "Cancelled"
  | "Ready For Review"
  | "Customer processing";

type Application = {
  id: string;
  name: string;
  email: string;
  type: string;
  riskScore?: string;
  status: AppStatus;
  date: string;
  time: string;
};

function processChartData(data: Array<Application>) {
  return data.reduce(
    (acc, item) => {
      switch (item.status) {
        case "Approved":
          acc[0].value += 1;
          break;
        case "Rejected":
          acc[1].value += 1;
          break;
        case "Cancelled":
          acc[2].value += 1;
          break;
        case "Ready For Review":
          acc[3].value += 1;
          break;
        case "Customer processing":
          acc[4].value += 1;
          break;
        default:
          break;
      }
      return acc;
    },
    [
      { label: "Approved", value: 0, color: COLORS.pasteleGreen },
      { label: "Rejected", value: 0, color: COLORS.pastelOrange },
      { label: "Cancelled", value: 0, color: COLORS.pastelRed },
      { label: "Ready For Review", value: 0, color: COLORS.pastelYellow },
      { label: "In progress", value: 0, color: COLORS.pastelBlue },
    ]
  );
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<Application>>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // fake network call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setData(
        fakeData.map((row) => ({
          ...row,
          // TODO might need timezone handling
          date: format(new Date(row.createdAt), "MMMM dd, yyyy"),
          time: format(new Date(row.createdAt), "HH:mm:ss"),
        })) as Array<Application>
      );
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <div className={styles.section}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1 className={styles.sectionTitle}>KYC Applications Reports</h1>
            <div className={styles.chartContainer}>
              <DonoughnutChart data={processChartData(data)} />
            </div>
            <Table
              columns={["Created", "Name", "Type", "Risk Score", "Status", ""]}
            >
              {data.map((row) => (
                <Row key={row.id}>
                  <DoubleLineCell>
                    <span>{row.date}</span>
                    <span>{row.date}</span>
                  </DoubleLineCell>
                  <DoubleLineCell>
                    <span>{row.name}</span>
                    <span>{row.email}</span>
                  </DoubleLineCell>
                  <SingleLineCell>{row.type}</SingleLineCell>
                  <SingleLineCell>
                    <RiskScore riskScore={row.riskScore} />
                  </SingleLineCell>
                  <SingleLineCell>
                    <Status status={row.status} />
                  </SingleLineCell>
                  <SingleLineCell>
                    <button
                      className={styles.rowButton}
                      onClick={() => window.alert(`${row.name}, clicked`)}
                    >
                      <SlOptionsVertical />
                    </button>
                  </SingleLineCell>
                </Row>
              ))}
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

function RiskScore({ riskScore }: { riskScore?: string }) {
  if (!riskScore) {
    return <span>Not calculated</span>;
  }

  let textClassName;
  switch (riskScore) {
    case "LOW":
      textClassName = styles.riskScoreLow;
      break;
    case "MEDIUM":
      textClassName = styles.riskScoreMedium;
      break;
    case "HIGH":
      textClassName = styles.riskScoreHigh;
      break;
    default:
      break;
  }

  return (
    <>
      {riskScore === "LOW" && <IoCheckmarkCircle className={styles.cellIcon} />}
      <span className={textClassName}>{riskScore}</span>
    </>
  );
}

function Status({ status }: { status: string }) {
  if (!status) {
    return <span>Status not available</span>;
  }

  const Icon = status === "Approved" ? IoCheckmark : SlOptions;

  return (
    <>
      <Icon className={styles.cellIcon} />
      <span>{status}</span>
    </>
  );
}
