/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import AdminNavbar from "../../../components/admin/navbar"
import Table from "../../../components/admin/table"

function Index() {
    const [activeTab, setActiveTab] = useState('banner')


    const columns = [
        {
            Header: 'No',
            accessor: (row, rowIndex) => rowIndex + 1,
            id: 'no'
        },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Description', accessor: 'description' },
        {
            Header: 'Photo',
            accessor: 'user.photo',
            Cell: ({ value }) => (
                <img src={value} alt="userPhoto" className='w-[66px] h-[70px]' />
            )
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ value }) => (
                <>
                    {value ?
                        <span className='p-2 text-green-500 bg-green-100 rounded-3xl'>
                            active
                        </span>
                        :
                        <span className='p-2 text-red-500 bg-red-100 rounded-3xl'>
                            Inactive
                        </span>
                    }
                </>

            )
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }) => (
                <div>
                    <button className='p-2 px-3 mr-1 text-white bg-blue-500 rounded-lg'>Edit</button>
                </div>
            )

        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />

            <div className="p-10">
                {/* Tabs */}
                <div className="flex mt-10 w-fit">
                    <button
                        className={`px-10 py-2 w-1/2 ${activeTab === 'banner' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('banner')}
                    >
                        Banner
                    </button>
                    <button
                        className={`px-10 py-2 w-1/2 ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('services')}
                    >
                        Services
                    </button>
                </div>

                <div className="mt-2">
                    <Table columns={columns} />
                </div>

            </div>
        </div>
    )
}

export default Index