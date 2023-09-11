// import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import axios from "../../api/axios"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const Welcome = () => {
  const { auth } = useAuth();
  const [allOrders, setAllOrders] = useState();
  const [completedOrders, setCompletedOrders] = useState();
  const [pendingOrders, setPendingOrders] = useState();
  const [approvedOrders, setApprovedOrders] = useState();

  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    axios
      .get(`/orders`)
      .then((res) => {
        setAllOrders(res.data)
        setCompletedOrders(res.data.filter(
            (order) =>
              order.orderStatus === "Completed"
        ))
        setPendingOrders(res.data.filter(
            (order) =>
              order.orderStatus === "Pending Approval"
        ))
        setApprovedOrders(res.data.filter(
            (order) =>
              order.orderStatus === "Approved"
        )) 
      })
      .catch(function (err) {
        setAllOrders([null])
        setCompletedOrders([null])
        setPendingOrders([null])
        setApprovedOrders([null])
      });
  }, []);

  const data = {
    labels: ['Pending Orders', 'Approved Orders', 'Completed Orders'],
    datasets: [
      {
        label: 'Number of orders',
        data: [
          pendingOrders?.length, 
          approvedOrders?.length, 
          completedOrders?.length
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }

  const content = (
    <div className="p-3 rounded bg-white shadow-sm">
      <h2 className="mono-text mb-4">Welcome {auth.fullName}</h2>

      <div className="d-flex flex-column gap-3">

        <div className="card" style={{ width: "100%" }}>
          <div className="card-body p-4 d-flex flex-row gap-4">
            <div className="card w-25 text-center">
              <div className="card-header">
              Total Orders (All status)
              </div>
              <div className="card-body">
              <h4>{allOrders?.length}</h4>
              </div>
            </div>
            <div className="card w-25 text-center">
              <div className="card-header">
              Current Pending Orders
              </div>
              <div className="card-body">
              <h4>{pendingOrders?.length}</h4>
              </div>
            </div>
            <div className="card w-25 text-center">
              <div className="card-header">
              Current Approved Orders
              </div>
              <div className="card-body">
              <h4>{approvedOrders?.length}</h4>
              </div>
            </div>
            <div className="card w-25 text-center">
              <div className="card-header">
              Current Completed Orders
              </div>
              <div className="card-body">
              <h4>{completedOrders?.length}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="card align-items-center p-3" style={{ width: "100%" }}>
          <div className="" style={{ width: "30%" }} >
          <Pie data={data}/>
          </div>
        </div>

      </div>
      
    </div>
  );

  return content;
};
export default Welcome;
