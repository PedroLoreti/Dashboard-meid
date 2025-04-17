import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { IoSearch } from "react-icons/io5";
import styles from "./style.module.scss";

export const SearchForm = ({
  onSubmit,
  titleClass,
  buttonClass,
  allowOrderSearch = true,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const customSubmit = (data) => {
    const nomeOuPedido = data.name?.trim() || "";

    if (!allowOrderSearch && /^\d+$/.test(nomeOuPedido)) {
      setError("name", {
        type: "manual",
        message: "A busca por número do pedido não é permitida",
      });
      return;
    }

    clearErrors("name");
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(customSubmit)}>
      <div className={styles.containerName}>
        <label htmlFor="name" className={titleClass}>Nome:</label>
        <input
          type="text"
          id="name"
          className="input-search"
          {...register("name")}
          placeholder={allowOrderSearch ? "Nome ou Pedido" : "Nome"}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
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
