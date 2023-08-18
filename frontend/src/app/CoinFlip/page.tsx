
import { GameComponent } from '../../../components/CoinFlip/Game';
import { MintComponent } from '../../../components/Mint';
import styles from './CoinFlip.module.scss'
const Page = () => {
  return (
    <div className={styles.container}>
        <GameComponent />
    </div>
  )
}

export default Page;
