/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import AdminNavbar from "../../../components/admin/navbar"
import Table from "../../../components/admin/table"
import AddAndUpdate from '../../../components/admin/addAndEdit'
import { deleteBanner, getAllBanners } from '../../../apis/firebase/banner'
import { deleteServices, getAllServices } from '../../../apis/firebase/services'
import { toast } from 'react-toastify'
import { deleteRecentWork, getAllRecentWorks } from '../../../apis/firebase/recentWorks'

function Index() {
    const [activeTab, setActiveTab] = useState('Banner')
    const [isAdd, setIsAdd] = useState(false)
    const [addAndUpdatePage, setAddAndUpdatePage] = useState(false)
    const [data, setData] = useState({
        banners: null,
        services: null,
        recentWorks: null,
        selectedData: null
    })

    const columns = [
        {
            Header: 'No',
            accessor: (row, rowIndex) => rowIndex + 1,
            id: 'no'
        },
        { Header: 'Title', accessor: 'name' },
        {
            Header: 'Description',
            accessor: 'description',
            Cell: ({ value }) => (
                <div className="relative group" title={value}>
                    <div className="truncate max-w-[200px]">
                        {value?.split(' ').slice(0, 4).join(' ')}
                        {value?.split(' ').length > 4 ? '...' : ''}
                    </div>
                </div>
            )
        },
        {
            Header: 'Photo',
            accessor: 'imageUrl',
            Cell: ({ value }) => (
                <a href={value} target="_blank" rel="noopener noreferrer">
                    <img src={value} alt="userPhoto" className='w-[70px] h-[70px]' />
                </a>)
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ value }) => (
                <>
                    {value === 'active' ?
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
                <div className='flex space-x-2'>
                    <button onClick={() => {
                        setAddAndUpdatePage(true)
                        setIsAdd(false)
                        setData({ ...data, selectedData: row.id })
                    }} className='p-2 px-3 mr-1 text-white bg-blue-500 rounded-lg'>Edit</button>

                    <button onClick={() => handleDelete(row.id)}
                        className='p-2 px-3 mr-1 text-white bg-red-500 rounded-lg'>Delete</button>
                </div >
            )

        },
    ];

    const handleFetchBanners = async () => {
        const res = await getAllBanners()
        console.log('handleFetchBanners', res)
        setData({ ...data, banners: res })
    }

    const handleFetchServices = async () => {
        const res = await getAllServices()
        console.log('getAllServices', res)
        setData({ ...data, services: res })
    }

    const handleFetchRecentWorks = async () => {
        const res = await getAllRecentWorks()
        setData({ ...data, recentWorks: res })
    }

    const handleDelete = async (id) => {
        try {
            toast.loading(`Please wait while we are deleting the ${activeTab}`)
            const res = activeTab === 'Banner' ? await deleteBanner(id)
                : activeTab === 'Services' ? await deleteServices(id)
                    : await deleteRecentWork(id)

            toast.dismiss()
            if (res) {
                toast.success(`${activeTab} deleted successfully`)
                if (activeTab === 'Banner') {
                    handleFetchBanners()
                } else if (activeTab === 'Services') {
                    handleFetchServices()
                } else if (activeTab === 'Recent Work') {
                    handleFetchRecentWorks()
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (activeTab === 'Banner') {
            handleFetchBanners()
        } else if (activeTab === 'Services') {
            handleFetchServices()
        } else if (activeTab === 'Recent Work') {
            handleFetchRecentWorks()
        }
    }, [activeTab, addAndUpdatePage])




    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />

            {addAndUpdatePage ?
                <AddAndUpdate
                    title={isAdd ? `Add ${activeTab}` : `Update ${activeTab}`}
                    isAdd={isAdd}
                    onClose={() => setAddAndUpdatePage(false)}
                    selectedData={data?.selectedData}
                />
                :

                <div className="p-10">
                    {/* Tabs */}
                    <div className="flex justify-between w-full mt-10">
                        <div className="flex">

                            <button className={`px-10 py-2  ${activeTab === 'Banner' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setActiveTab('Banner')}>
                                Banner
                            </button>
                            <button className={`px-10 py-2  ${activeTab === 'Services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setActiveTab('Services')} >
                                Services
                            </button>
                            <button className={`px-10 py-2  ${activeTab === 'Recent Work' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setActiveTab('Recent Work')} >
                                Recent Works
                            </button>

                        </div>

                        <button onClick={() => {
                            setAddAndUpdatePage(true)
                            setIsAdd(true)
                        }}
                            className='px-10 py-2 text-white bg-red-500'>Add</button>
                    </div>


                    {activeTab === 'Banner' && (
                        <div className="mt-2">
                            {data?.banners?.length > 0 ? (
                                <Table columns={columns} data={data.banners} />
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No Banners Available
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'Services' && (
                        <div className="mt-2">
                            {data?.services?.length > 0 ? (
                                <Table columns={columns} data={data.services} />
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No Services Available
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'Recent Work' && (
                        <div className="mt-2">
                            {data?.recentWorks?.length > 0 ? (
                                <Table columns={columns} data={data.recentWorks} />
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No Recent Woks Available
                                </div>
                            )}
                        </div>
                    )}


                </div>
            }
        </div>
    )
}

export default Index