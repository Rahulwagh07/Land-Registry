import React, { useEffect, useState } from 'react'
import '../css/Profile.css'
import { useForm } from 'react-hook-form';
import { platform } from 'process';

const Profile = (props) => {
  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [userInfo, setUserInfo] = useState({
    address: "", fullName: "", gender: "", email: "", contact: "", residential_addr: ""
  });

  const [update, setUpdate] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

  const handleUpdate = async () => {
    await contract.setUserProfile(userInfo.fullName, userInfo.gender, userInfo.email, userInfo.contact, userInfo.residential_addr, {
      from: account
    });

    console.log(userInfo);
    setUpdate(false);
  }

  const onChangeFunc = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value })
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await contract.getUserProfile({ from: account });

      setUserInfo({
        address: account,
        fullName: (response[0]) ? response[0] : "Update",
        gender: (response[1]) ? response[1] : "Update",
        email: (response[2]) ? response[2] : "Update",
        contact: (response[3].words[0]) ? response[3].words[0].toString() : "12345678",
        residential_addr: (response[4]) ? response[4] : "Update"

      });
    }
    

    getUserInfo();
  }, [account, contract]);

  return (
    <div className='w-8/12 mx-auto flex flex-col justify-center bg-richblack-800  mb-12 rounded-md'>
      {(update) ?
        <div>
         
             
              <form  className="flex flex-col gap-4 mt-4 mx-auto w-8/12">
                <div className='flex flex-col gap-2'>
                  <label className='lable-style' htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    className="form-style" 
                    name="fullName"
                    id='fullname'
                    placeholder="Enter full name"
                    autoComplete="off"
                    onChange={onChangeFunc}
                    {...register("fullName", { required: true })}
                  />
                  {errors.fullName && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter the full name.</span>)}
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='lable-style' htmlFor="gender">Gender</label>
                  <select
                    className='form-style'
                    name='gender'
                    id='gender'
                    defaultValue={userInfo.gender}
                    onChange={onChangeFunc}
                    {...register("gender")}
                  >
                    <option value="NA">NA</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="I prefer not to say">Others</option>
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='lable-style' htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-style"
                    name="email"
                    id='email'
                    placeholder="Enter email"
                    autoComplete="off"
                    onChange={onChangeFunc}
                    {...register("email", { required: true })}
                  />
                  {errors.email && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter the email.</span>)}
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='lable-style' htmlFor="contactnumber">Contact number</label>
                  <input
                    type="number"
                    className="form-style"
                    name="contact"
                    id='contactnumber'
                    placeholder="Enter contact"
                    autoComplete="off"
                    onChange={onChangeFunc}
                    {...register("contact", { required: true })}
                  />
                  {errors.contact && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter the contact number.</span>)}
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='lable-style' htmlFor='residential_addr'>Residential Address</label>
                  <input
                    type="text"
                    className="form-style"
                    name="residential_addr"
                    id='residential_addr'
                    placeholder="Enter residential address"
                    autoComplete="off"
                    onChange={onChangeFunc}
                    {...register("residential_addr", { required: true })}
                  />
                  {errors.residential_addr && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter the residential address.</span>)}
                </div>
              </form>
           
          <button className='btn-style mx-auto mt-4 mb-4'
           onClick={handleUpdate}>Confirm Update</button>
        </div>
        :
        <div className='flex flex-col gap-7 w-8/12 mx-auto  mt-10'>
      
               <div className='flex flex-col mx-auto gap-2'>
                <label className='lable-style'>Owner Address</label>
                <p className="form-style">{userInfo.address}</p>

                <label className='lable-style'> Full Name</label>
                <p className="form-style">{userInfo.fullName}</p>

                <label className='lable-style'>Gender</label>
                <p className="form-style">{userInfo.gender}</p>

                <label className='lable-style'>Email</label>
                <p className='form-style'>{userInfo.email}</p>

                <label className='lable-style'>Contact Number</label>
                <p className="form-style">{userInfo.contact}</p>

                <label className='lable-style'>Residential Address</label>
                <p className="form-style">{userInfo.residential_addr}</p>
              
             </div>
       
          <button className='btn-style mx-auto mb-8'
           onClick={() => { setUpdate(true) }}>Update Profile</button>
        </div>
      }
    </div>
  )
}

export default Profile;


 