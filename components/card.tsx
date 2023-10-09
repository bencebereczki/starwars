"use client"
import styles from './card.module.css'
import Image from 'next/image'
import localFont from 'next/font/local'
import { useState } from 'react'
import Modal from './Modal'
const soloFont = localFont({ src: '../public/soloist1.ttf' })

export default function Card(props) {
    // Variables
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState('')
    // Modal Open Process
    const openModal = (content) => {
        setModalContent(content)
        setIsModalOpen(true)
    }
    // Modal Close Process
    const closeModal = () => {
        setIsModalOpen(false)
        setModalContent('')
    }
    //Main Return
    return (
        <div>
            <button onClick={() => openModal(props.cardData)}>
                <div className={`${props.actualTheme == "dark" ? styles.carddark : styles.card} flex flex-col justify-between lg:h-52`}>
                    <h1 className={`mb-3 ${soloFont.className}`}>{props.characterName}</h1>
                    <Image src={props.imgUrl} alt={props.characterName} height={190} width={250} className={`rounded shadow-md shadow-gray-500/60 dark:shadow-blue-500/60`} />
                </div>
            </button>
            <Modal isOpen={isModalOpen} closeModal={closeModal} content={modalContent} />
        </div>


    )

}