import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/user/user-selectors';
import { logOut } from '../../redux/auth/auth-operations';
import s from './_header.module.scss';
import SvgGenerator from '../svg-generator/SvgGenerator';
import ToggleTheme from './ToggleTheme';

const UserMenu = ({ name, logout }) => {
  const viewportWidth = window.innerWidth;

  if (viewportWidth > 767) {
    return (
      <div className={s.userMenuBox}>
        <ToggleTheme />
        <SvgGenerator name="profile" />

        <span className={s.userName}>{name}</span>
        <button onClick={logout} className={s.logOutBtn}>
          Logout
          <SvgGenerator name="logout" />
        </button>
      </div>
    );
  }
  return (
    <div className={s.userMenuBox}>
      <ToggleTheme />
      <SvgGenerator name="profile" />

      <button type="button" onClick={logout} className={s.logOutBtn}>
        <SvgGenerator name="logout" />
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  name: getUser(state).name,
  avatar: getUser(state).avatarURL,
});

const mapDispatchToProps = {
  logout: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
