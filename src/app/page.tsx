import Image from 'next/image'

import * as styles from './page.css'
import Background from '@/components/Background/Background'

export default function Home() {
  return (
    <main className={styles.page}>
      <Background />
    </main>
  )
}
