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
      sx={{ maxWidth: { xs: "100%", sm: 480 }, bgcolor: "background.paper" }}
    >
      <Tabs
        value={currentBrandIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        classes={{
          indicator: "catalog-tab-indicator",
        }}
      >
        <Tab
          label="Все"
          classes={{
            root: "catalog-tab",
            selected: "selected-catalog-tab",
          }}
        ></Tab>
        {brands.map((brand, index) => (
          <Tab
            key={index}
            label={brand}
            classes={{
              root: "catalog-tab",
              selected: "selected-catalog-tab",
            }}
          ></Tab>
        ))}
      </Tabs>
    </Box>
  );
};
