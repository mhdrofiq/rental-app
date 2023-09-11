import axios from '../../api/axios'

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate()

  const [admins, setAdmins] = useState([])
  const [reviewers, setReviewers] = useState([])
  const [vehicles, setVehicles] = useState([])

  const [administrator, setAdministrator] = useState("")
  const [reviewer, setReviewer] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [driverName, setDriverName] = useState("")
  const [rentalDate, setRentalDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {dateStyle: 'short'}).format(date)

  const approvedOn = today
  const fuelConsumed = "0"
  const orderStatus = "Pending Approval"
  
  useEffect(() => {
    
    axios.get(`/users`).then((res) => {

      const filteredAdmins = res.data.filter((user) => user.role === "Administrator")
      setAdmins(filteredAdmins)
      setAdministrator(filteredAdmins[0]._id)

      const filteredReviewers = res.data.filter((user) => user.role === "Reviewer")
      setReviewers(filteredReviewers)
      setReviewer(filteredReviewers[0]._id)

    }).catch(function (err){
      setAdmins([null])
      setReviewers([null])
    })

    axios.get(`/vehicles`).then((res) => {
      const filteredVehicles = res.data
      setVehicles(filteredVehicles)
      setVehicle(filteredVehicles[0]._id)
    }).catch(function (err){
      setVehicles([null])
    })

  }, [])

  const onAdminChanged = (e) => setAdministrator(e.target.value);
  const onReviewerChanged = (e) => setReviewer(e.target.value);
  const onVehicleChanged = (e) => setVehicle(e.target.value);
  const onDriverNameChanged = (e) => setDriverName(e.target.value);
  const onRentalDateChanged = (e) => setRentalDate(e.target.value);
  const onReturnDateChanged = (e) => setReturnDate(e.target.value);

  const onSubmit = async (e) => {
  e.preventDefault();
  
  console.log('administrator: ', administrator);
  console.log('reviewer: ', reviewer);
  console.log('vehicle: ', vehicle);
  console.log('driverName: ', driverName);
  console.log('rentalDate: ', rentalDate);
  console.log('returnDate: ', returnDate);
  console.log('approvedOn: ', approvedOn);
  console.log('fuelConsumed: ', fuelConsumed);
  console.log('orderStatus: ', orderStatus);

    try {
      const orderObject = {
        administrator,
        reviewer,
        vehicle,
        driverName,
        rentalDate,
        returnDate,
        approvedOn,
        fuelConsumed,
        orderStatus
      }
      const res = await axios.post("/orders", orderObject);
      console.log(res);
   
      setAdministrator("");
      setVehicle("");
      setReviewer("");
      setDriverName("");
      setRentalDate("");
      setReturnDate("");
      navigate("/dash/ongoingOrders");
    } catch (err) {
      console.log(err);
    }
  };

  const adminOptions = admins?.length 
  ? admins.map((admin) => {
    return (
      <option key={admin._id} value={admin._id}>
        {admin.fullName}
      </option>
    )
  })
  : null

  const reviewerOptions = reviewers?.length 
  ? reviewers.map((reviewer) => {
    return (
      <option key={reviewer._id} value={reviewer._id}>
        {reviewer.fullName}
      </option>
    )
  })
  : null

  const vehicleOptions = vehicles?.length 
  ? vehicles.map((vehicle) => {
    return (
      <option key={vehicle._id} value={vehicle._id}>
        {vehicle.vehicleName}
      </option>
    )
  })
  : null

  return (
    <div className="p-3 rounded bg-white d-flex flex-column shadow-sm align-items-center">
      
      <header className="mt-4">
        <h4 className="mono-text">Create a new order</h4>
      </header>

      <div className="card my-3">
        <form
          className="form card-body"
          onSubmit={onSubmit}
        >

          <label className="form-label text-secondary" htmlFor="administrator">
            Admin making this order
          </label>
          <select
            id="administrator"
            name="administrator"
            className="form-select"
            value={administrator}
            onChange={onAdminChanged}
          >
            {adminOptions}
          </select>

          <label className="form-label text-secondary mt-3" htmlFor="vehicle">
            Vehicle to be rented
          </label>
          <select
            id="vehicle"
            name="vehicle"
            className="form-select"
            value={vehicle}
            onChange={onVehicleChanged}
          >
            {vehicleOptions}
          </select>

          <label className="form-label text-secondary mt-3" htmlFor="reviewer">
            Reviewer assigned to approve this order
          </label>
          <select
            id="reviewer"
            name="reviewer"
            className="form-select"
            value={reviewer}
            onChange={onReviewerChanged}
          >
            {reviewerOptions}
          </select>

          <label className="form-label mt-3 text-secondary" htmlFor="driverName">
            Full name of driver
          </label>
          <input
            className="form-control"
            id="driverName"
            name="driverName"
            type="text"
            autoComplete="off"
            value={driverName}
            onChange={onDriverNameChanged}
            required
          />

          <div>
          <label className="form-label mt-3 me-3 text-secondary" htmlFor="rentalDate">
              Date of rental
          </label>
          <input
            type="date" 
            id="rentalDate" 
            name="rentalDate" 
            value={rentalDate} 
            onChange={onRentalDateChanged}
          />
          </div>

          <div>
          <label className="form-label mt-3 me-3 text-secondary" htmlFor="returnDate">
              Date of return
          </label>
          <input
            type="date" 
            id="returnDate" 
            name="returnDate" 
            value={returnDate} 
            onChange={onReturnDateChanged}
          />
          </div>

          <div className="mt-3">
           <button className="btn btn-success px-5" title="Save">
              Submit
            </button> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
