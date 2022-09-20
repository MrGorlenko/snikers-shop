import React, { FunctionComponent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface Brands {
  brands: string[];
  handleCurrentBrand(brand: string): string;
}

export const BrandButtons: FunctionComponent<Brands> = ({
  brands,
  handleCurrentBrand,
}) => {
  const [currentBrandIndex, setcurrentBrandIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, index: number) => {
    setcurrentBrandIndex(index);
    if (index === 0) {
      handleCurrentBrand("Все");
      return;
    }
    handleCurrentBrand(brands[index - 1]);
  };

  return (
    <Box
      sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
      className="brand-buttons"
    >
      <Tabs
        value={currentBrandIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="Все"></Tab>
        {brands.map((brand, index) => (
          <Tab key={index} label={brand}></Tab>
        ))}
      </Tabs>
    </Box>
  );
};
