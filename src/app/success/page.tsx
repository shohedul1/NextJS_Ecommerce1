'use client';
import React from 'react'
import { useSelector } from 'react-redux';

const SuccessPage = () => {
    const { orderData } = useSelector((state:any) => state?.shopping);
    console.log('orderData',orderData)

  return (
    <div>SuccessPage</div>
  )
}

export default SuccessPage