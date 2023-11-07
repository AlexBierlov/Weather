import Nav from 'react-bootstrap/Nav';
import styles from './Nav.module.css';

function Menu() {
   const addr = document.location.pathname;
   return (
      <Nav fill variant="tabs" defaultActiveKey="/home">
         <Nav.Item>
            <Nav.Link className={(addr && addr === '/') ? styles.underline : ''} href="/">Сьогодні</Nav.Link>
         </Nav.Item>
         <Nav.Item>
            <Nav.Link className={(addr && addr === '/currentWeather') ? styles.underline : ''} href='/currentWeather' >Прогноз на 5 днів</Nav.Link>
         </Nav.Item>         
      </Nav>
   );
}

export default Menu;