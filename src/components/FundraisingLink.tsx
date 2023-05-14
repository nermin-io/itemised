import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FundraisingLink.module.scss';

interface Props {
  size?: number;
}

const aspectRatio = 3.5620915033;

const FundraisingLink: React.FC<Props> = ({ size = 300 }) => {
  return (
    <Link href="https://www.buymeacoffee.com/nsehic" target="_blank" className={styles.FundraisingLink}>
      Created with ❤️  by Nermin Sehic
      <Image src="/images/bmc-button.png" alt="Buy me a coffee" width={size * aspectRatio} height={size} />
    </Link>
  );
}

export default FundraisingLink;
