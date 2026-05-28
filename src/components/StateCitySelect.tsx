import React, { useState, useEffect } from "react";
import { Select } from "./Select";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchStates, fetchCities } from "../features/master/masterApi";
import { clearCities } from "../features/master/masterSlice";

interface StateCitySelectProps {
  onStateChange: (state: string, stateId: string, stateCode: string) => void;
  onCityChange: (city: string, cityId: string) => void;
  size?: "sm" | "md" | "lg" | "xl";
  required?: boolean;
  initialStateValue?: string;
  initialCityValue?: string;
  stateError?: string;
  cityError?: string;
  disabled?: boolean;
}

interface StateData {
  _id: string;
  state: string;
}

interface CityData {
  _id: string;
  city: string;
}

export const StateCitySelect: React.FC<StateCitySelectProps> = ({
  onStateChange,
  onCityChange,
  size = "sm",
  required = true,
  initialStateValue = "",
  initialCityValue = "",
  stateError,
  cityError,
  disabled,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { states, cities, loadingStates, loadingCities } = useSelector(
    (state: RootState) => state.master,
  );

  const [selectedState, setSelectedState] = useState(initialStateValue);
  const [selectedCity, setSelectedCity] = useState(initialCityValue);

  useEffect(() => {
    if (states.length === 0) {
      dispatch(fetchStates());
    }
  }, [dispatch, states.length]);

  const stateOptions = React.useMemo(
    () =>
      states
        .map((s: any) => ({
          value: s._id || s.id || "",
          label: s.name || s.state || s.label || "",
          stateCode: s.state_code || s.stateCode || s.code || "",
        }))
        .filter((option) => option.value && option.label),
    [states],
  );

  // Handle case where initial values might be names instead of IDs
  useEffect(() => {
    if (initialStateValue && states.length > 0) {
      const match = stateOptions.find(
        (o) => o.value === initialStateValue || o.label === initialStateValue,
      );
      if (match && selectedState !== match.value) {
        setSelectedState(match.value);
        onStateChange(match.label, match.value, match.stateCode);
      }
    }
  }, [initialStateValue, states, stateOptions]);

  const cityOptions = React.useMemo(
    () =>
      cities
        .map((c: any) => {
          if (typeof c === "string") {
            return { value: c, label: c };
          }
          return {
            value: c._id || c.id || "",
            label: c.name || c.city || c.label || "",
          };
        })
        .filter((option) => option.value && option.label),
    [cities],
  );

  useEffect(() => {
    if (initialCityValue && cities.length > 0) {
      const cityMatch = cities.find((c) => {
        const cityName = typeof c === "string" ? c : c.name || c.city || "";
        return (
          (typeof c !== "string" && c._id === initialCityValue) ||
          cityName === initialCityValue
        );
      });

      if (cityMatch) {
        const cityName =
          typeof cityMatch === "string"
            ? cityMatch
            : cityMatch.name || cityMatch.city || "";
        const cityId =
          typeof cityMatch === "string" ? cityMatch : cityMatch._id;
        if (selectedCity !== cityId) {
          setSelectedCity(cityId);
          onCityChange(cityName, cityId);
        }
      }
    }
  }, [initialCityValue, cities]);

  useEffect(() => {
    if (selectedState) {
      dispatch(fetchCities(selectedState));
    } else {
      dispatch(clearCities());
    }
  }, [selectedState, dispatch]);

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    setSelectedCity("");
    const selected = stateOptions.find((opt) => opt.value === stateId);
    const stateName = selected ? (selected as any).label : "";
    const stateCode = selected ? (selected as any).stateCode : "";
    onStateChange(stateName, stateId, stateCode);
    onCityChange("", "");
  };

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    const selected = cityOptions.find((opt) => opt.value === cityId);
    const cityName = selected ? selected.label : "";
    onCityChange(cityName, cityId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="State"
        placeholder={loadingStates ? "Loading states..." : "Select State"}
        options={stateOptions}
        value={selectedState}
        onChange={handleStateChange}
        size={size}
        showSearch={true}
        error={stateError}
        required={required}
        disabled={disabled}
      />
      <Select
        label="City"
        placeholder="Select City"
        size={size}
        required={required}
        value={selectedCity}
        onChange={handleCityChange}
        options={cityOptions}
        disabled={disabled || !selectedState}
        error={cityError}
        showSearch={true}
      />
    </div>
  );
};
