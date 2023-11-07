import Nav from 'react-bootstrap/Nav';

function Menu() {
   return (
      <Nav fill variant="tabs" defaultActiveKey="/home">
         <Nav.Item>
            <Nav.Link href="/">Сьогодні</Nav.Link>
         </Nav.Item>
         <Nav.Item>
            <Nav.Link href='/currentWeather' >Прогноз на 5 днів</Nav.Link>
         </Nav.Item>         
      </Nav>
   );
}

export default Menu;