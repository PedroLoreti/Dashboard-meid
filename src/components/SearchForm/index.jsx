import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { IoSearch } from "react-icons/io5";
import styles from "./style.module.scss";

export const SearchForm = ({
  onSubmit,
  titleClass,
  buttonClass
}) => {
  const { register, handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.containerName}>
        <label htmlFor="name" className={titleClass}>Nome/Pedido:</label>
        <input
          type="text"
          id="name"
          className="input-search"
          {...register("name")}
          placeholder="Nome ou Pedido"
        />
      </div>

      <div className={styles.containerDate}>
        <label htmlFor="date" className={titleClass}>Data:</label>
        <Controller
          control={control}
          name="data"
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              className="input-search"
              placeholderText="dd/mm/yyyy"
            />
          )}
        />
      </div>

      <button type="submit" className={buttonClass}>
        <IoSearch className={styles.icon} />
      </button>
    </form>
  );
};
