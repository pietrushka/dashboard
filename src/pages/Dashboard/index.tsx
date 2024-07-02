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

type Item = {
  id: string;
  name: string;
  email: string;
  type: string;
  riskScore?: string;
  status: string;
  date: string;
  time: string;
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<Item>>([]);

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
        }))
      );
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
      )}
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
