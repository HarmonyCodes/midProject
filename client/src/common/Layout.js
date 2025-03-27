import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import { useNavigate  } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const itemRenderer = (item) => (

    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    </a>
  );

  // הגדרת פריטי התפריט
  const items = [
    { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'Todos', icon: 'pi pi-list-check', command: () => navigate('/TodoComp') },
    { label: 'Posts', icon: 'pi pi-pen-to-square', command: () => navigate('/PostComp') },
    { label: 'Photos', icon: 'pi pi-images', command: () => navigate('/PhotoComp') },
    { label: 'Users', icon: 'pi pi-users', to: '/UserComp', command: () => navigate('/UserComp')}
  ];

  const start = <span className="pi pi-bars" style={{ fontSize: '1.5rem' }} />;

  const end = (
    <div className="flex align-items-center gap-2">
      <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
    </div>
  );

  return (
    <div className="common">
      <header>
        <Menubar model={items} start={start} end={end} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className='footer'>good luck!!</footer>
    </div>
  );
};

export default Layout;