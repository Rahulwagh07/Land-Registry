import React, { useEffect, useState } from 'react'
import emblem from '../images/emblem.svg'
import '../css/SuperAdmin.css'
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SuperAdmin = (props) => {
  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  console.log("pri->>account", account);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (adminData) => {
    try {
      await contract.addAdmin(adminData.address, adminData.state, adminData.district, adminData.city, {
        from: account
      });

      console.log('admin details submitted');
      reset();
    } catch (error) {
      console.error('Error submitting admin details:', error);
    }
  };

  return (
    <div className='w-6/12 mx-auto rounded-lg flex flex-col justify-center mt-6 bg-richblack-800'>
      <div className='mx-auto flex flex-col mt-6'>
        <NavLink className='ml-6' to='/'>
          <img src={emblem} alt="emblem" className="emblem" />
        </NavLink>
        <h1 className='text-richblack-50 font-semibold  '>Super Admin</h1>
      </div>

      <p className='text-richblack-50 font-extrabold text-lg flex  mx-auto bg-richblack-900 p-4 rounded-md mt-8'>Add an Admin</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 mx-auto w-8/12">
        <div className='flex flex-col gap-2'>
          <label className='lable-style' htmlFor="email">Admin Address</label>
          <input
            type="text"
            name="address"
            id="adress"
            placeholder="Enter admin address"
            autoComplete="off"
            className="form-style" 
            {...register("address", { required: true })}
          />
          {errors.address && <span className="-mt-1 text-[12px] text-yellow-100">Please enter the admin address.</span>}
        </div>
        <div className='flex flex-col gap-2 '>
        <label className='lable-style' htmlFor="state">State</label>
          <input
            type="text"
            className="form-style" 
            name="state"
            id='state'
            placeholder="Enter state"
            autoComplete="off"
            {...register("state", { required: true })}
          />
          {errors.state && <span className="-mt-1 text-[12px] text-yellow-100">Please enter the state.</span>}
        </div>
        <div className='flex flex-col gap-2'>
        <label className='lable-style' htmlFor="district">District</label>
          <input
            type="text"
            className="form-style" 
            name="district"
            id='district'
            placeholder="Enter district"
            autoComplete="off"
            {...register("district", { required: true })}
          />
          {errors.district && <span className="-mt-1 text-[12px] text-yellow-100">Please enter the district.</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='lable-style' htmlFor="city">City</label>
          <input
            type="text"
            className="form-style" 
            name="city"
            id='city'
            placeholder="Enter city"
            autoComplete="off"
            {...register("city", { required: true })}
          />
          {errors.city && <span className="-mt-1 text-[12px] text-yellow-100">Please enter the city.</span>}
        </div>
        <button type="submit" 
        className='btn-style mx-auto mb-7'>
        Submit</button>
      </form>
    </div>
  )
}

export default SuperAdmin


// const SuperAdmin = (props) => {

//   const { provider, web3, contract } = props.myWeb3Api;
//   const account = props.account;
//   console.log("pri->>account", account);
  
//   const [adminData, setAdminData] = useState({
//     address:"", state:"", district:"", city:""
//   });

//   const onChangeFunc = (event) =>{
//     const {name, value} = event.target;
//     setAdminData({...adminData, [name]:value});
//   }

//   const handleSubmit = async () =>{
//     await contract.addAdmin(adminData.address, adminData.state, adminData.district, adminData.city, {
//       from: account
//     })

//     console.log('admin details submitted');
//     setAdminData({address:"", state:"", district:"", city:""});
//   }


//   return (
//     <div className='container superAdmin-mainDiv'>
//       <div className='superAdmin-heading-div'>
//           <NavLink to='/'>
//           <img src={emblem} alt="emblem" className="emblem" />
//           </NavLink>
//           <h1>Super Admin</h1>
//       </div>

//       <p className='superAdmin-p'>Add an Admin</p>

//       <form method='POST' className='admin-form'>
//         <div className='form-group'>
//             <label>Admin Address</label>
//             <input type="text" className="form-control" name="address" placeholder="Enter admin address" 
//             autoComplete="off" value={adminData.address} onChange={onChangeFunc}/>
//         </div>
//         <div className='form-group'>
//             <label>State</label>
//             <input type="text" className="form-control" name="state" placeholder="Enter state" 
//             autoComplete="off" value={adminData.state} onChange={onChangeFunc}/>
//         </div>
//         <div className='form-group'>
//             <label>District</label>
//             <input type="text" className="form-control" name="district" placeholder="Enter district" 
//             autoComplete="off" value={adminData.district} onChange={onChangeFunc}/>
//         </div>
//         <div className='form-group'>
//             <label>City</label>
//             <input type="text" className="form-control" name="city" placeholder="Enter city" 
//             autoComplete="off" value={adminData.city} onChange={onChangeFunc}/>
//         </div>
//       </form>
//       <button className='admin-form-btn' onClick={handleSubmit}>Submit</button>
//     </div>
//   )
// }

// export default SuperAdmin