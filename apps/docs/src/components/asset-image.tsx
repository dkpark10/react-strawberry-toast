import Image, { type ImageProps } from 'next/image';

export default function AssetImage(props: ImageProps) {
  const { src, ...rest } = props;

  return (
    <Image
      src={`${process.env.NODE_ENV === 'production' ? '/react-strawberry-toast' : ''}${src}`}
      {...rest}
    />
  );
}
