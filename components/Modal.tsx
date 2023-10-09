import localFont from "next/font/local"
import { useEffect, useState } from 'react'
import Load from "./load"
import ErrorScreen from "./error"


const soloFont = localFont({ src: '../public/soloist1.ttf' })
const Modal = ({ isOpen, closeModal, content }) => {
    // variables
    const [dataPlanet, setData2] = useState([])
    const [loading2, setLoading2] = useState(true)
    const [errorserver2, setError2] = useState(false)

    useEffect(() => {
        if (isOpen) {
            // API Call
            fetch(content.homeworld)
                .then((response) =>
                    response.json())
                .then((responseData) => {
                    setData2(responseData)
                    setLoading2(false)
                })
                .catch((error) => {
                    console.error('Hiba történt az API lekérdezése közben:', error)
                    setLoading2(false)
                    setError2(true)
                });
        }
    }, [isOpen, content.homeworld])


    if (!isOpen) return null

    if (loading2) {
        // Loading Return
        return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto" >
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
                    <Load />
                </div>
            </div>
        </div>
        ) 
    }

    if (errorserver2) {
        // Error Return
        return <ErrorScreen />
    }

    return (
        // Main Return
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto" >
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >

                    <div className="relative transform overflow-hidden rounded-lg bg-white sm:text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-lg w-full max-w-lg bg-opacity-60">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 bg-opacity-60">


                            <div className="mt-0 text-center sm:mt-0 sm:text-left">
                                <div className='flex justify-between items-center'>
                                    <h1 className={`text-lg lg:text-xl font-semibold leading-6 text-black ${soloFont.className}`}>{content.name}</h1>
                                    <button type="button" className="float-right rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto text-grey-900" onClick={closeModal}>X</button>
                                </div>

                                <div className="mt-4 w-full text-left">
                                    <p className="text-lg text-gray-500"><b>Height: </b>{`${content.height}cm`}</p>
                                    <p className="text-lg text-gray-500"><b>Mass: </b>{`${content.mass}kg`}</p>
                                    <p className="text-lg text-gray-500"><b>Birth Year: </b>{`${content.birth_year}`}</p>
                                    <p className="text-lg text-gray-500"><b>Film Count: </b>{`${content.films.length}`}</p>
                                    <hr className="my-2" />
                                    <p className="text-lg text-gray-500"><b>Birth Planet: </b>{dataPlanet.name}</p>
                                    <p className="text-lg text-gray-500"><b>Planet Terrain: </b>{dataPlanet.terrain}</p>
                                    <p className="text-lg text-gray-500"><b>Planet Climate: </b>{dataPlanet.climate}</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal