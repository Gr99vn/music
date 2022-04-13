import { camelCaseToTitle, capitalize } from "../utils";
import "../styles/Field.css";

function Field({ type, name, value, placeholder, err, handleChange }) {
  return (
    <div className="Field">
      <label htmlFor={name}>{camelCaseToTitle(name)}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
      />
      {err && <span className="error">{capitalize(err)}</span>}
    </div>
  );
}

export default Field;