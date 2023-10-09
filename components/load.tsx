import Image from "next/image"
import styles from './load.module.css'
import localFont from 'next/font/local'

const starwarsFont = localFont({ src: '../public/Starjhol.ttf' })
export default function Load() {
    return <div className={`grid w-full grid-cols-1 align-baseline inline-block justify-items-center ${styles.loadiv} mt-20 animate-bounce`}>
        <p className={`mt-auto animate-pulse ${starwarsFont.className} text-xl mb-4 text-white`}>loading</p>
    </div>
} 