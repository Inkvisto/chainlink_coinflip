import Image from 'next/image'
import styles from './page.module.scss'
import Link from 'next/link';
import ConnectComponent from '../../components/Connect';


const Main = () => { 
  return (
    <>
      <div className={styles.description}>
        <p>
          Template builded on next js app directory feature and hardhat tool.
          <ConnectComponent />
        </p>
        <Link
        href='https://github.com/Inkvisto' target="_blank"
          rel="noopener noreferrer">
          By <b>Inkvisto</b>
        </Link>
      </div>
      <div className={styles.center}>
        <Image
          src="/next.svg"
          className={styles.logo}
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link href="https://hardhat.org/hardhat-runner/docs/getting-started#overview"
         className={styles.card}
          target="_blank"
          rel="noopener noreferrer">
          <h2>
            Hardhat <span>-&gt;</span>
          </h2>
          <p>Development environment for Ethereum software.</p>
        </Link>

        <Link
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Next.js <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js ^13.4.0 app directory arhitecture.</p>
        </Link>

        <Link
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </Link>

        <Link
          href="https://docs.ethers.org/v6/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Interact <span>-&gt;</span>
          </h2>
          <p>
            Programming interact with the Ethereum Blockchain and its ecosystem.
          </p>
        </Link>
      </div>
      <div className={styles.center}>
        <h2 className={styles.title}>
          Contracts
        </h2>
        </div>
      <div className={styles.grid}>
        <Link href="/ERC20" className={styles.card}>
          <h2>
            ERC20 
          </h2>
          <p>A standard interface for tokens.</p>
        </Link>

        <Link href="/ERC721" className={styles.card}>
          <h2>
            ERC721
          </h2>
          <p>Non-Fungible Token Standard.</p>
        </Link>
        <Link href="/Marketplace" className={styles.card}>
          <h2>
            NFT Marketplace
          </h2>
          <p>Marketplace fro buying and selling nft</p>
        </Link>
        <Link href="/CoinFlip" className={styles.card}>
          <h2>
            CoinFlip Game
          </h2>
          <p>Bet game</p>
        </Link>
      </div>
    </>
  )
}

export default Main;
