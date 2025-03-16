import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Dashboard.module.css";
import Transactions from "../transactions/Transactions";
import AssetModal from "./AssetModal";
import LiabilityModal from "./LiabilityModal";
import { fetchAssetsLiabilities } from "../../redux/slices/financialSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
import { Button, Typography, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AccountBalance, CreditCard } from "@mui/icons-material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#DB9702",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
];

const Dashboard = ({ userName }) => {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showLiabilityModal, setShowLiabilityModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState([]);

  const dispatch = useDispatch();
  const { assets, liabilities, netWorth, status } = useSelector(
    (state) => state.financial
  );

  console.log(status);

  useEffect(() => {
    dispatch(fetchAssetsLiabilities()).finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleAssetSubmit = async () => {
    dispatch(fetchAssetsLiabilities());
    setShowAssetModal(false);
  };

  const handleLiabilitySubmit = async () => {
    dispatch(fetchAssetsLiabilities());
    setShowLiabilityModal(false);
  };

  return (
    <div className={styles.dashboard}>
      {userName && (
        <div className={styles.welcome}>
          <Typography
            sx={{
              color: "var(--text-color)",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            Welcome, {userName}
          </Typography>
          <div className={styles.topContainer}>
            <div className={styles.netWorth}>
              <img
                src="/net-worth.png"
                alt="NetWorth Image"
                style={{ height: "50px", width: "50px" }}
              ></img>
              Net Worth:{" "}
              {netWorth.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className={styles.topButtonContainer}>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowAssetModal(true)}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                }}
              >
                Add Assets
              </Button>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowLiabilityModal(true)}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  m: 0,
                }}
              >
                Add Liabilities
              </Button>

              <AssetModal
                isOpen={showAssetModal}
                onClose={() => setShowAssetModal(false)}
                onSubmit={handleAssetSubmit}
              />
              <LiabilityModal
                isOpen={showLiabilityModal}
                onClose={() => setShowLiabilityModal(false)}
                onSubmit={handleLiabilitySubmit}
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Total Income</h3>
            <TrendingUpIcon
              sx={{ color: "var(--text-color)", fontSize: "2rem" }}
            />
          </div>
          {isLoading ? (
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{ mx: "auto" }}
            />
          ) : (
            <p className={styles.amount}>
              {totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </div>
        <div className={styles.card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Total Expenses</h3>
            <TrendingDownIcon
              sx={{ color: "var(--text-color)", fontSize: "2rem" }}
            />
          </div>
          {isLoading ? (
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{ mx: "auto" }}
            />
          ) : (
            <p className={styles.amount}>
              {totalExpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </div>
        <div className={styles.card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Total Assets</h3>
            <AccountBalance
              sx={{ color: "var(--text-color)", fontSize: "2rem" }}
            />
          </div>
          {isLoading ? (
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{ mx: "auto" }}
            />
          ) : (
            <p className={styles.amount}>
              {assets.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </div>
        <div className={styles.card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>Total Liabilities</h3>
            <CreditCard sx={{ color: "var(--text-color)", fontSize: "2rem" }} />
          </div>
          {isLoading ? (
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{ mx: "auto" }}
            />
          ) : (
            <p className={styles.amount}>
              {liabilities.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <Typography
              variant="h6"
              sx={{
                color: "var(--text-color)",
                mb: 2,
                fontWeight: "600",
                paddingLeft: 1,
              }}
            >
              Income vs Expenses
            </Typography>
            <div
              style={{
                width: "100%",
                height: 300,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 2 }}
                />
              ) : monthlyData.length > 0 ? (
                <Line
                  data={{
                    labels: monthlyData.map((data) => data.month),
                    datasets: [
                      {
                        label: "Income",
                        data: monthlyData.map((data) => data.income),
                        borderColor: "#4CAF50",
                        tension: 0.1,
                        borderWidth: 2,
                      },
                      {
                        label: "Expenses",
                        data: monthlyData.map((data) => data.expenses),
                        borderColor: "#f44336",
                        tension: 0.1,
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: "#d5d5d5",
                        },
                        ticks: {
                          font: {
                            size: 14,
                          },
                        },
                      },
                      x: {
                        grid: {
                          display: true,
                          color: "#d5d5d5",
                        },
                        ticks: {
                          font: {
                            size: 14,
                          },
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          font: {
                            size: 14,
                          },
                          padding: 15,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                  }}
                >
                  <Typography sx={{ color: "var(--text-color)" }}>
                    No transaction data available to display
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className={styles.chart}>
            <Typography
              variant="h6"
              sx={{
                color: "var(--text-color)",
                mb: 2,
                fontWeight: "600",
                paddingLeft: 1,
              }}
            >
              Expenses by Category
            </Typography>
            <div
              style={{
                width: "100%",
                height: 300,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 2 }}
                />
              ) : expensesByCategory.length > 0 ? (
                <Pie
                  data={{
                    labels: expensesByCategory.map((item) => item.category),
                    datasets: [
                      {
                        data: expensesByCategory.map((item) => item.amount),
                        backgroundColor: expensesByCategory.map(
                          (_, index) => COLORS[index % COLORS.length]
                        ),
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                        maxHeight: 80,
                        labels: {
                          font: {
                            size: 14,
                          },
                          boxWidth: 20,
                          boxHeight: 12,
                          padding: 12,
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                  }}
                >
                  <Typography sx={{ color: "var(--text-color)" }}>
                    No transaction data available to display
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Transactions
        setTotalIncome={setTotalIncome}
        setTotalExpenses={setTotalExpenses}
        setMonthlyData={setMonthlyData}
        setExpensesByCategory={setExpensesByCategory}
      />
    </div>
  );
};

export default Dashboard;
