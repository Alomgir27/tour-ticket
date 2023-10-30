import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";
import THSort from "../TableSort/THSort";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import moment from "moment";
import { set } from "nprogress";

const typeColorMap = {
  normal: "#aa9",
  fighting: "#b54",
  flying: "#89f",
  poison: "#a59",
  ground: "#db5",
  rock: "#ba6",
  bug: "#ab2",
  ghost: "#66b",
  steel: "#aab",
  fire: "#f42",
  water: "#39f",
  grass: "#7c5",
  electric: "#fc3",
  psychic: "#f59",
  ice: "#6cf",
  dragon: "#76e",
  dark: "#754",
  fairy: "#e9e",
  unknown: "#aa9",
  shadow: "#aa9",
};

const TypeLabel = ({ type }) => (
  <span
    className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2"
    style={{
      backgroundColor: typeColorMap[type],
      textShadow: "1px 1px 2px rgb(0 0 0 / 70%)",
      fontSize: ".7rem",
      width: "70px",
    }}
  >
    {type}
  </span>
);

const DashboardList = (props) => {
  const router = useRouter();

  const [bookingsList, setBookingsList] = useState([])
  const [booking, setBooking] = useState({})
  const [show, setShow] = useState(false)
  const [sort, setSort] = useState({ field: "", order: "" });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setBookingsList(props.bookings)
  }
    , [props.bookings])

  // https://api.ventrata.com/octo/bookings/:uuid

  const handleCancelBooking = async (uuid) => {
    setLoading(true)
    console.log(uuid, process.env.NEXT_PUBLIC_VENTRATA_API_KEY, process.env.NEXT_PUBLIC_VENTRATA_CAPABILITIES, process.env.VENTRATA_API)
    await axios.delete(`https://api.ventrata.com/api/octo/bookings/${uuid}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VENTRATA_API_KEY}`,
        'Octo-Capabilities': process.env.NEXT_PUBLIC_VENTRATA_CAPABILITIES,
        'Accept': 'application/json',
      },
      body: {
        "reason": "test"
      }
    })
      .then((response) => {
        console.log(response)
        router.reload()
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  const handleShow = () => setShow(true)

  const handleClose = () => setShow(false)


  const handleSort = (field) => {
    let order = "asc";
    if (sort.field === field && sort.order === "asc") {
      order = "desc";
    }
    setSort({ field, order });
  };


  //use bootstrap for styling
  //use moment js for date formatting
  //use react router dom for routing
  //use table for showing data

  return (
    <>
      <div className="container">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col">Booking Id</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Booking Status</th>
              <th scope="col">Booking Total</th>
              <th scope="col">Booking Currency</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Email</th>
              <th scope="col">Customer Phone</th>
              <th scope="col">Customer Country</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {bookingsList && bookingsList.map((booking) => (
              <tr key={booking.id}>
                <td className="flex flex-col">
                  <p className="text-blue-500 hover:text-blue-600">
                    {booking?.id}
                  </p>
                </td>

                <td>{moment(booking?.createdAt).format("DD/MM/YYYY")}</td>
                <td className="flex flex-col">
                  <span className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2" style={{
                    backgroundColor: booking?.status === "CONFIRMED" ? "#28a745" : "#dc3545", textShadow: "1px 1px 2px rgb(0 0 0 / 70%)", fontSize: ".7rem", width: "70px",
                  }}>{booking?.status}</span>
                </td>

                <td>{booking?.pricing?.retail}</td>
                <td>{booking?.pricing?.currency}</td>
                <td>{booking?.contact?.fullName}</td>
                <td>{booking?.contact?.emailAddress}</td>
                <td>{booking?.contact?.phoneNumber}</td>
                <td>{booking?.contact?.country}</td>
                <td className="flex flex-col">
                  <button className="btn btn-primary" onClick={() => {
                    setBooking(booking);
                    handleShow();
                  }}>
                    View
                  </button>
                  {booking?.cancellable && (
                    <button className="btn btn-danger mt-1" onClick={() => handleCancelBooking(booking?.uuid)} disabled={loading}>
                      Cancel
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookingsList && bookingsList.length === 0 && (
          <div className="flex justify-center">
            <p className="text-center">No bookings found</p>
          </div>
        )}

      </div>


      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <div className="my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-gray-200 rounded">
                  <div className="min-w-full">
                    <div className="bg-gray-100 p-3">
                      Booking Id: {booking?.id}
                    </div>
                    <div className="bg-gray-100 p-3">
                      Booking Date: {moment(booking?.createdAt).format("DD/MM/YYYY")}
                    </div>
                    <div className="bg-gray-100 p-3">
                      Booking Status: <span className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2" style={{
                        backgroundColor: booking?.status === "CONFIRMED" ? "#28a745" : "#dc3545", textShadow: "1px 1px 2px rgb(0 0 0 / 70%)", fontSize: ".7rem", width: "70px",
                      }}>{booking?.status}</span>
                    </div>
                    <div className="bg-gray-100 p-3">
                      Booking Total: {booking?.pricing?.retail}
                    </div>
                    <div className="bg-gray-100 p-3">
                      Booking Currency: {booking?.pricing?.currency}
                    </div>
                    <div className="bg-gray-100 p-3">
                      Customer Name: {booking?.contact?.fullName}
                    </div>
                    <div className="bg-gray-100 p-3">
                      Customer Email: {booking?.contact?.emailAddress}
                    </div>
                    <div className="bg-gray-100 p-3">
                      Customer Phone: {booking?.contact?.phoneNumber}
                    </div>
                    <div className="bg-gray-100 p-3">
                      Customer Country: {booking?.contact?.country}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3">
                    Booking Items
                  </div>
                  <table className="table">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Item Type</th>
                        <th scope="col">Item Price</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {booking?.unitItems && booking?.unitItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item?.unit?.title}</td>
                          <td>{item?.unit?.type}</td>
                          <td>{item?.pricing?.retail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-100 p-3">
                  Booking Notices
                </div>
                <table className="table">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col">Notice Title</th>
                      <th scope="col">Notice Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {booking?.notices && booking?.notices.map((notice) => (
                      <tr key={notice.id}>
                        <td>{notice?.title}</td>
                        <td>{notice?.shortDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-gray-100 p-3">
                  Booking Unit Pricing
                </div>
                <table className="table">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col">Unit Name</th>
                      <th scope="col">Unit Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {booking?.unitItems && booking?.unitItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item?.unit?.title}</td>
                        <td>{item?.pricing?.retail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-gray-100 p-3">
                  Booking Pricing
                </div>
                <table className="table">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col">Pricing Original</th>
                      <th scope="col">Pricing Retail</th>
                      <th scope="col">Pricing Net</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td>{booking?.pricing?.original}</td>
                      <td>{booking?.pricing?.retail}</td>
                      <td>{booking?.pricing?.net}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="bg-gray-100 p-3">
                  Booking Pickup Points
                </div>
                <table className="table">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col">Pickup Point Name</th>
                      <th scope="col">Pickup Point Address</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {booking?.pickupPoints && booking?.pickupPoints.map((point) => (
                      <tr key={point.id}>
                        <td>{point?.name}</td>
                        <td>{point?.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-gray-100 p-3">
                  Booking Package Bookings
                </div>
                <table className="table">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col">Package Booking Id</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {booking?.packageBookings && booking?.packageBookings.map((packageBooking) => (
                      <tr key={packageBooking.id}>
                        <td>{packageBooking?.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DashboardList  