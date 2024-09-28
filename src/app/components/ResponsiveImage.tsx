import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt }) => {
  return (
    <div className="flex-1 mx-4 w-full h-[80vh] relative hidden custom:block">
      <Image
        src={src}
        alt={alt}
        className="rounded-3xl"
        layout="fill"
        objectFit="cover"
        unoptimized
      />
    </div>
  );
};

export default ResponsiveImage;
