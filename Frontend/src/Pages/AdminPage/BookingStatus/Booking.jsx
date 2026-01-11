import React from 'react'
import './Booking.css'
const Booking = () => {
  return (
    <>
    <div className="booking">
        <div className="text-part">
            <p>"All data is 100% anonymous and aggregated to protect student
          privacy."</p>
        </div>
        <div className="box-details">
            <div className="text-details">
                <h1>
                    All Details
                </h1>
            </div>
            <div className="details-box">
                <div className="box-booking">
              <h1>Number Student</h1>
              </div>
               <div className="box-booking">
              <h1>Session Name</h1>
              </div>
               <div className="box-booking">
              <h1>Session status</h1>
              </div>
               <div className="box-booking">
              <h1>Counsellor</h1>
              </div>
            </div>
        </div>
    </div>
    </>
   
  )
}

export default Booking;
