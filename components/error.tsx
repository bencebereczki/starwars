import Image from 'next/image'
import localFont from 'next/font/local'
import TWButton from './smallparts/TWButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const starwarsFont = localFont({ src: '../public/Starjhol.ttf' })

export default function ErrorScreen(props) {
    const router = useRouter()
    return <div className={`grid w-full grid-cols-1 align-baseline inline-block justify-items-center mt-20`}>
        <Image src={'/error.gif'} width={250} height={250} alt='Error'/>
        <p className={`mt-auto animate-pulse ${starwarsFont.className} text-xl mb-4 text-white`}>Something went wrong</p>
       
      <div onClick={() => {props.setBackPage()}}><TWButton direction="prev" buttonText="Back To Home"/></div>
    </div>
} 