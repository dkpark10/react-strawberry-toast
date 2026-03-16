import Image, { type ImageProps } from 'next/image';

export default function AssetImage(props: ImageProps) {
  const { src, ...rest } = props;

  return (
    <Image
      src={src}
      {...rest}
    />
  );
}
