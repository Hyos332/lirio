import { Select } from "@/components/ui/select";
import { TextLink } from "@/components/ui/text-link";
import { changeCountry } from "@/lib/actions/country";
import { getCountries } from "@/lib/commerce";
import { getCountry } from "@/lib/country";

export async function CountrySelector() {
  const [countries, current] = await Promise.all([
    getCountries(),
    getCountry(),
  ]);
  if (countries.length < 2) return null;

  return (
    <form
      key={current.isoCode}
      action={changeCountry}
      className="flex flex-wrap items-center gap-x-3 gap-y-2"
    >
      <label htmlFor="country" className="text-xs text-muted">
        País y moneda
      </label>
      <Select id="country" name="country" defaultValue={current.isoCode}>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name} · {country.currencyCode}
          </option>
        ))}
      </Select>
      <TextLink type="submit" className="text-sm">
        Actualizar
      </TextLink>
    </form>
  );
}
