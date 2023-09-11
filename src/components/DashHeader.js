import { useNavigate, Link, useLocation } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const ADMINS_REGEX = /^\/dash\/admins(\/)?$/
const VEHICLES_REGEX = /^\/dash\/vehicles(\/)?$/
const REVIEWERS_REGEX = /^\/dash\/reviewers(\/)?$/
const ONGOING_ORDERS_REGEX = /^\/dash\/ongoingOrders(\/)?$/
const ORDERS_HISTORY_REGEX = /^\/dash\/ordersHistory(\/)?$/
const NEW_ORDER_REGEX = /^\/dash\/newOrder(\/)?$/

const DashHeader = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const logout = useLogout()
    const { auth } = useAuth()

    const onDashClicked = () => navigate('/dash')
    let dashButton = null
    if (!DASH_REGEX.test(pathname)) {
        dashButton = (
            <a className='nav-link' href='#' onClick={onDashClicked}>Dashboard</a>
        )
    } else {
        dashButton = (
            <a className='nav-link disabled' href='#'>Dashboard</a>
        )
    }

    const onAdminsClicked = () => navigate('/dash/admins')
    let adminsButton = null
    if (!ADMINS_REGEX.test(pathname)) {
        adminsButton = (
            <a className='nav-link' href='#' onClick={onAdminsClicked}>Admins-List</a>
        )
    } else {
        adminsButton = (
            <a className='nav-link disabled' href='#'>Admins-List</a>
        )
    }

    const onReviewersClicked = () => navigate('/dash/reviewers')
    let reviewersButton = null
    if (!REVIEWERS_REGEX.test(pathname)) {
        reviewersButton = (
            <a className='nav-link' href='#' onClick={onReviewersClicked}>Reviewers-List</a>
        )
    } else {
        reviewersButton = (
            <a className='nav-link disabled' href='#'>Reviewers-List</a>
        )
    }

    const onVehiclesClicked = () => navigate('/dash/vehicles')
    let vehiclesButton = null
    if (!VEHICLES_REGEX.test(pathname)) {
        vehiclesButton = (
            <a className='nav-link' href='#' onClick={onVehiclesClicked}>Vehicles-List</a>
        )
    } else {
        vehiclesButton = (
            <a className='nav-link disabled' href='#'>Vehicles-List</a>
        )
    }

    const onOngoingOrdersClicked = () => navigate('/dash/ongoingOrders')
    let ongoingOrdersButton = null
    if (!ONGOING_ORDERS_REGEX.test(pathname)) {
        ongoingOrdersButton = (
            <a className='nav-link' href='#' onClick={onOngoingOrdersClicked}>Ongoing-Orders</a>
        )
    } else {
        ongoingOrdersButton = (
            <a className='nav-link disabled' href='#'>Ongoing-Orders</a>
        )
    }

    const onOrdersHistoryClicked = () => navigate('/dash/ordersHistory')
    let orderHistoryButton = null
    if (!ORDERS_HISTORY_REGEX.test(pathname)) {
        orderHistoryButton = (
            <a className='nav-link' href='#' onClick={onOrdersHistoryClicked}>Orders-History</a>
        )
    } else {
        orderHistoryButton = (
            <a className='nav-link disabled' href='#'>Orders-History</a>
        )
    }

    const newOrderClicked = () => navigate('/dash/newOrder')
    let newOrderButton = null
    if (!NEW_ORDER_REGEX.test(pathname)) {
        newOrderButton = (
            <a className='nav-link' href='#' onClick={newOrderClicked}>New-Order</a>
        )
    } else {
        newOrderButton = (
            <a className='nav-link disabled' href='#'>New-Order</a>
        )
    }

    const onLogoutClicked = async () => {
        await logout()
        console.log('Logout Success')
        navigate('/')
    }

    const logoutButton = (
        <a className='nav-link' href='#' onClick={onLogoutClicked}>Log out</a>
    )

    const profileButton = (
        <a className='nav-link' href='#'>Account Settings</a>
    )

    const content = (
       
        <>
        <header className=''>
            {/* <p className={errClass}>{error?.data?.message}</p> */}
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ms-auto" id="navbarCollapse">

                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">{dashButton}</li>                       
                        <li className="nav-item">{adminsButton}</li>                       
                        <li className="nav-item">{reviewersButton}</li>                       
                        <li className="nav-item">{vehiclesButton}</li>                       
                        <li className="nav-item">{ongoingOrdersButton}</li>                       
                        <li className="nav-item">{orderHistoryButton}</li> 
                        {
                            auth?.role === "Administrator" 
                            ? 
                            <li className="nav-item">{newOrderButton}</li>
                            : 
                            null
                        }                                                 
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className='nav-item'>{profileButton}</li>
                        <li className='nav-item'>{logoutButton}</li>
                    </ul>
                    
                    </div>
                </div>
            </nav>
            
        </header>
        </>
    )
    return content
}

export default DashHeader