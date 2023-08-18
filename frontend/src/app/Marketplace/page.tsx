import { ActionsComponent } from '../../../components/Marketplace/Actions';
import CardComponent from '../../../components/Marketplace/Card';
import CardListComponent from '../../../components/Marketplace/CardList';
import styles from './Marketplace.module.scss'
const Page = () => {

  
  return (
    <div className={styles.container}>
        <ActionsComponent />
        <CardListComponent />
    </div>
  )
}

export default Page;
