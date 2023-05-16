import s from './_header.module.scss';
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';
import { connect } from 'react-redux';
import UserMenu from './UserMenu';
import Logo from './Logo';
import ToggleTheme from './ToggleTheme';

function Header({ isAuthenticated }) {
  return (
    <header className={s.header}>
      <Logo />

      <>{isAuthenticated ? <UserMenu /> : <ToggleTheme />}</>
    </header>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Header);
