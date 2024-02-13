import React from 'react'

const DisplayRequests = (props) => {
  return (
        <div className=' w-8/12  p-8 rounded-md mx-auto mt-7 text-richblack-25 form-style'>
            <h4><b>Property ID: {props.propertyId}</b></h4>
            <p><b>Requested by:</b> {props.requester}</p>
            <p><b>Survey Number:</b> {props.surveyNo}</p>
            <p><b>State:</b> {props.state}</p>
            <p><b>District:</b> {props.district}</p>
            <p><b>City:</b> {props.city}</p>

            <button className='btn-style' onClick={() => {props.acceptReq(props.index, props.reqNo)}}><b>Accept Request</b></button>
        </div>
  )
}

export default DisplayRequests