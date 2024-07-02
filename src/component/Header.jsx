import Logo from '../assets/logo.png';
import searchIcon from '../assets/search.png';
import bell from '../assets/bell.png';
import Avatar from '../assets/avatar.png'
import Arrow from '../assets/arrowDown.png';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

function Header() {
    const { handleSearch } = useContext(AppContext);

    const handleSearchInputChange = (e) => {
        handleSearch(e.target.value);
    };

    return (
        <div className='header-container'>
            <div className='logo'>
                <img src={Logo} alt="" />
            </div>
            <div className='nav-container'>
                <div className='search'>
                    <img src={searchIcon} alt="" />
                    <input type="search" name="" id="" placeholder="Search by..."
                        onChange={handleSearchInputChange} />
                </div>
                <div className='profile-div'>
                    <img src={bell} alt="" />
                    <div className='profile'>
                        <img src={Avatar} alt="" />
                        <p>Deko</p>
                    </div>
                    <img src={Arrow} alt="" className='arrow' />
                </div>
            </div>
        </div>
    )
}

export default Header
