import s from './_loader.module.scss';

function Loader() {
  return (
    <div className={s.loader__container}>
      <div className={s.loader}>
        <p className={s.loader__text}>Loading...</p>
        <span></span>
      </div>
    </div>
  );
}

export default Loader;
