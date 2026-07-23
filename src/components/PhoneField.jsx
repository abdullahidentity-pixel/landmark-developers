import { COUNTRIES } from '../data/countries.js';

/**
 * Country dial-code selector + local phone number, used by EVERY lead/contact
 * form on the site so the "international number" pattern is identical
 * everywhere (previously only the booking modal had it).
 *
 * The <select> and <input> are intentionally left unclassed so each host form's
 * own field CSS (e.g. `.field input`, `.ip-field select`) styles them and they
 * match their surroundings. The `.phone-group` wrapper just lays them out in a
 * row and sizes the dial-code select.
 *
 * State lives in the parent: pass the selected country `iso` + the local number,
 * and the two change handlers. On submit the parent prepends `dialOf(country)`.
 */
export default function PhoneField({
  country,
  phone,
  onCountry,
  onPhone,
  id = 'phone',
  name = 'phone',
  placeholder = '3XX XXXXXXX',
  ariaInvalid,
  autoComplete = 'tel-national',
  errorStyle,
}) {
  return (
    <div className="phone-group">
      <select
        className="phone-dial"
        value={country}
        onChange={onCountry}
        aria-label="Country dialing code"
        style={errorStyle}
      >
        {COUNTRIES.map((c) => (
          <option key={c.iso} value={c.iso}>
            {c.flag} {c.dial} {c.name}
          </option>
        ))}
      </select>
      <input
        id={id}
        name={name}
        type="tel"
        placeholder={placeholder}
        value={phone}
        onChange={onPhone}
        aria-invalid={ariaInvalid}
        autoComplete={autoComplete}
        style={errorStyle}
      />
    </div>
  );
}
