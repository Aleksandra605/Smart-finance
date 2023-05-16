import useTheme from '../../hooks/useTheme';
import s from './_toggleTheme.module.scss';

function ToggleTheme() {
  const [theme, setTheme] = useTheme('light');

  const handleTheme = event => {
    if (event.target.checked) {
      return setTheme('dark');
    }
    return setTheme('light');
  };

  return (
    <label className={s.label}>
      <div className={s.toggle}>
        <input
          className={s.toggleState}
          type="checkbox"
          checked={theme === 'dark' ? true : false}
          name="check"
          value="check"
          onChange={event => handleTheme(event)}
        />
        <div className={s.indicator}></div>
      </div>
    </label>
  );
}
export default ToggleTheme;
