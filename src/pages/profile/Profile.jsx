import React from 'react'
import Layout from '../../components/layout/Layout'

function Profile() {
    return (
        <Layout>
            <div className="  mt-32 lg:mt-20 lg:mx-[30em]">
                <div className="flex items-center justify-center  mb-2">
                    <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="img" />
                </div>
                <h1 className='text-center font-semibold text-white'>Rahul kanyal</h1>
                <h1 className='text-center font-semibold text-white'>rahulkanyal4@gmail.com</h1>
                <h1 className='text-center font-semibold text-white'>Total Notes Created : 1 </h1>
            </div>
        </Layout>
    )
}

export default Profile