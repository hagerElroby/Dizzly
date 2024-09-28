import Image from 'next/image'

const ResponsiveLogo = () => {
  return (
    <div className="flex justify-end">
      <div className="w-[100px] h-[40px] sm:w-[120px] sm:h-[50px] md:w-[152px] md:h-[60px] xl:w-[170px] xl:h-[70px] relative">
        <Image
          src="/images/logo.png"
          alt="Dizzly Logo"
          layout="fill"
          objectFit="contain"
          unoptimized
        />
      </div>
    </div>
  )
}

export default ResponsiveLogo
