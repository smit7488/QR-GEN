"use client";

import { Dispatch, SetStateAction } from "react";

// Define the props that TelephoneCodeSelect will accept
interface TelephoneCodeSelectProps {
  setCountryCode: Dispatch<SetStateAction<string>>;
  countryCode: string;
}

const TelephoneCodeSelect = ({ setCountryCode, countryCode }: TelephoneCodeSelectProps) => {
  const countryCodes = [
    { code: "+1", country: "United States, Canada" },
    { code: "+7", country: "Russia, Kazakhstan" },
    { code: "+20", country: "Egypt" },
    { code: "+27", country: "South Africa" },
    { code: "+30", country: "Greece" },
    { code: "+31", country: "Netherlands" },
    { code: "+32", country: "Belgium" },
    { code: "+33", country: "France" },
    { code: "+34", country: "Spain" },
    { code: "+36", country: "Hungary" },
    { code: "+39", country: "Italy" },
    { code: "+40", country: "Romania" },
    { code: "+41", country: "Switzerland" },
    { code: "+43", country: "Austria" },
    { code: "+44", country: "United Kingdom" },
    { code: "+45", country: "Denmark" },
    { code: "+46", country: "Sweden" },
    { code: "+47", country: "Norway" },
    { code: "+48", country: "Poland" },
    { code: "+49", country: "Germany" },
    { code: "+51", country: "Peru" },
    { code: "+52", country: "Mexico" },
    { code: "+53", country: "Cuba" },
    { code: "+54", country: "Argentina" },
    { code: "+55", country: "Brazil" },
    { code: "+56", country: "Chile" },
    { code: "+57", country: "Colombia" },
    { code: "+58", country: "Venezuela" },
    { code: "+60", country: "Malaysia" },
    { code: "+61", country: "Australia" },
    { code: "+62", country: "Indonesia" },
    { code: "+63", country: "Philippines" },
    { code: "+64", country: "New Zealand" },
    { code: "+65", country: "Singapore" },
    { code: "+66", country: "Thailand" },
    { code: "+81", country: "Japan" },
    { code: "+82", country: "South Korea" },
    { code: "+84", country: "Vietnam" },
    { code: "+86", country: "China" },
    { code: "+90", country: "Turkey" },
    { code: "+91", country: "India" },
    { code: "+92", country: "Pakistan" },
    { code: "+93", country: "Afghanistan" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+95", country: "Myanmar" },
    { code: "+98", country: "Iran" },
    { code: "+211", country: "South Sudan" },
    { code: "+212", country: "Morocco" },
    { code: "+213", country: "Algeria" },
    { code: "+216", country: "Tunisia" },
    { code: "+218", country: "Libya" },
    { code: "+220", country: "Gambia" },
    { code: "+221", country: "Senegal" },
    { code: "+222", country: "Mauritania" },
    { code: "+223", country: "Mali" },
    { code: "+224", country: "Guinea" },
    { code: "+225", country: "Ivory Coast" },
    { code: "+226", country: "Burkina Faso" },
    { code: "+227", country: "Niger" },
    { code: "+228", country: "Togo" },
    { code: "+229", country: "Benin" },
    { code: "+230", country: "Mauritius" },
    { code: "+231", country: "Liberia" },
    { code: "+232", country: "Sierra Leone" },
    { code: "+233", country: "Ghana" },
    { code: "+234", country: "Nigeria" },
    { code: "+235", country: "Chad" },
    { code: "+236", country: "Central African Republic" },
    { code: "+237", country: "Cameroon" },
    { code: "+238", country: "Cape Verde" },
    { code: "+239", country: "São Tomé and Príncipe" },
    { code: "+240", country: "Equatorial Guinea" },
    { code: "+241", country: "Gabon" },
    { code: "+242", country: "Congo - Brazzaville" },
    { code: "+243", country: "Congo - Kinshasa" },
    { code: "+244", country: "Angola" },
    { code: "+245", country: "Guinea-Bissau" },
    { code: "+246", country: "British Indian Ocean Territory" },
    { code: "+247", country: "Ascension Island" },
    { code: "+248", country: "Seychelles" },
    { code: "+249", country: "Sudan" },
    { code: "+250", country: "Rwanda" },
    { code: "+251", country: "Ethiopia" },
    { code: "+252", country: "Somalia" },
    { code: "+253", country: "Djibouti" },
    { code: "+254", country: "Kenya" },
    { code: "+255", country: "Tanzania" },
    { code: "+256", country: "Uganda" },
    { code: "+257", country: "Burundi" },
    { code: "+258", country: "Mozambique" },
    { code: "+260", country: "Zambia" },
    { code: "+261", country: "Madagascar" },
    { code: "+262", country: "Réunion, Mayotte" },
    { code: "+263", country: "Zimbabwe" },
    { code: "+264", country: "Namibia" },
    { code: "+265", country: "Malawi" },
    { code: "+266", country: "Lesotho" },
    { code: "+267", country: "Botswana" },
    { code: "+268", country: "Eswatini" },
    { code: "+269", country: "Comoros" },
    { code: "+290", country: "Saint Helena" },
    { code: "+291", country: "Eritrea" },
    { code: "+297", country: "Aruba" },
    { code: "+298", country: "Faroe Islands" },
    { code: "+299", country: "Greenland" },
    { code: "+350", country: "Gibraltar" },
    { code: "+351", country: "Portugal" },
    { code: "+352", country: "Luxembourg" },
    { code: "+353", country: "Ireland" },
    { code: "+354", country: "Iceland" },
    { code: "+355", country: "Albania" },
    { code: "+356", country: "Malta" },
    { code: "+357", country: "Cyprus" },
    { code: "+358", country: "Finland" },
    { code: "+359", country: "Bulgaria" },
    { code: "+370", country: "Lithuania" },
    { code: "+371", country: "Latvia" },
    { code: "+372", country: "Estonia" },
    { code: "+373", country: "Moldova" },
    { code: "+374", country: "Armenia" },
    { code: "+375", country: "Belarus" },
    { code: "+376", country: "Andorra" },
    { code: "+377", country: "Monaco" },
    { code: "+378", country: "San Marino" },
    { code: "+380", country: "Ukraine" },
    { code: "+381", country: "Serbia" },
    { code: "+382", country: "Montenegro" },
    { code: "+383", country: "Kosovo" },
    { code: "+385", country: "Croatia" },
    { code: "+386", country: "Slovenia" },
    { code: "+387", country: "Bosnia and Herzegovina" },
    { code: "+389", country: "North Macedonia" }
  ];

  return (
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      className="border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-2 rounded w-48"
    >
      {countryCodes
        .sort((a, b) => a.country.localeCompare(b.country)) // Sort alphabetically
        .map(({ code, country }) => (
          <option key={code} value={code}>
            {code} ({country})
          </option>
        ))}
    </select>
  );
};

export default TelephoneCodeSelect;
