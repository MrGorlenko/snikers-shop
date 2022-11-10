import { FunctionComponent } from "react";
import TFReact from "tformat.js";
import { useEffect } from "react";

interface PhoneNumberMaskInput {
  value: string;
  setFormattedValue(value: string): any;
  setUnformattedValue(value: string): any;
}

export const PhoneNumberMaskInput: FunctionComponent<PhoneNumberMaskInput> = ({
  value,
  setFormattedValue,
  setUnformattedValue,
}) => {
  return (
    <TFReact
      style={{
        width: "100%",
        height: 40,
        border: "0px solid",
        background: "transparent",
        outline: "none",
        paddingLeft: "8.5px",
      }}
      placeholder="+7 "
      template="+7 (xxx) xxx xx xx"
      showPrefixOnFocus={true}
      value={value}
      onFormatted={(val: string, rawVal: string) => {
        setFormattedValue(val);
        setUnformattedValue(rawVal);
      }}
    />
  );
};
