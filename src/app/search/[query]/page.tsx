"use client"

import Card from '@/components/Products/Card'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const SearchPage = () => {
  const { query } = useParams()

  const [workList, setWorkList] = useState([]);

  const getWorkList = async () => {
    try {
      const response = await fetch(`/api/product/search/${query}`, {
        method: 'GET',
      })

      const data = await response.json()
      setWorkList(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getWorkList()
  }, [query])

  console.log(query, workList);

  return (
    <>

      <div className='pt-14 pb-12 dark:bg-black dark:text-white'>
        <div className='container'>
          {/* header section */}
          <div className='text-center mb-10 max-w-[600px] mx-auto'>
            <h1 className='title-list'>{query} result(s)</h1>
          </div>
          {/* body section */}
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 place-items-center gap-5'>
              {/* card section */}
              {
                workList.length > 0 ? (
                  <>
                    {
                      workList.map((data: any) => (
                        <Card
                          key={data?.id}
                          data={data}
                        />
                      ))
                    }
                  </>
                ) : (
                  <div>
                    <h1 className='title-list'>{query} result(s) is emty</h1>
                  </div>
                )
              }

            </div>

          </div>
        </div>
      </div>


    </>
  )
}

export default SearchPage