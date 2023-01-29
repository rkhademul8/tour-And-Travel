import {
  Box,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import commaNumber from "comma-number";
import { Notify } from "notiflix";
import secureLocalStorage from "react-secure-storage";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    // outline: "2px auto rgba(19,124,189,.6)",
    outline: "2px auto #003566",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#003566",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#DC143C",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Commission = ({
  openCm,
  setOpenCm,
  agentFarePrice,
  setAgentFarePrice,
  commisionFarePrice,
  setCommisionFarePrice,
  defaultCommissionRate,
  setDefaultCommissionRate,
  defaultCommissionRateAmount,
  setDefaultCommissionRateAmount,
  customerFare,
  setCustomerFare,
}) => {
  const commissionData = secureLocalStorage.getItem("commissionData");
  const [openCustomize, setOpenCustomize] = useState(false);
  const [openDefault, setOpenDefault] = useState(false);
  const [customizeRadio, setCustomizeRadio] = useState(false);
  const handleAgentFare = (e) => {
    setAgentFarePrice(!agentFarePrice);
  };
  const handleCommissionFare = (e) => {
    setCommisionFarePrice(!commisionFarePrice);
  };
  const handleCustomerFare = (e) => {
    setCustomerFare(!customerFare);
  };

  const handleCustomizeRadio = (e) => {
    setCustomizeRadio(e.target.value);
  };

  const handleClickAway = () => {
    // Notify.warning("Click Save to Close");
    // setOpenCm(false);
    // localStorage.setItem(
    //   "commissionData",
    //   JSON.stringify({
    //     agentFarePrice,
    //     commissionFarePrice: commisionFarePrice,
    //     defaultCommissionRate,
    //     customizeRadio,
    //     openCustomize,
    //     openDefault,
    //   })
    // );
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <button
          style={{ backgroundColor: "#003566" }}
          onClick={() => setOpenCm((prev) => !prev)}
        >
          CM%
        </button>

        {openCm && (
          <Box className="cm-box">
            <Box>
              <input
                onChange={handleCustomerFare}
                type="checkbox"
                name="customerFare"
                value="customerFare"
                checked={customerFare ? true : false}
                id="customerFare"
              />
              <label for="customerFare">Customer Fare </label>
            </Box>
            <Box>
              <input
                onChange={handleAgentFare}
                type="checkbox"
                name="agentFare"
                value="agentFarePrice"
                checked={agentFarePrice ? true : false}
                id="agentFare"
              />
              <label for="agentFare">Agent Fare </label>
            </Box>
            <Box>
              <input
                onChange={handleCommissionFare}
                type="checkbox"
                name="profitAmount"
                value="commisionFarePrice"
                checked={commisionFarePrice ? true : false}
                id="profitAmount"
              />
              <label for="profitAmount">Commission Amount </label>
            </Box>
            <Box className="price-customization">
              <h5>Markup</h5>

              <Box display={"flex"} gap={"10px"}>
                <button
                  style={
                    openDefault
                      ? {
                          backgroundColor: "#003566",
                          color: "#fff",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "red",
                        }
                  }
                  onClick={() => {
                    setOpenCustomize(false);
                    setOpenDefault(true);
                  }}
                >
                  Default
                </button>
                <button
                  style={
                    openCustomize
                      ? {
                          backgroundColor: "#003566",
                          color: "#fff",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "red",
                        }
                  }
                  onClick={() => {
                    setOpenCustomize(true);
                    setOpenDefault(false);
                  }}
                >
                  Customize
                </button>
              </Box>

              {openDefault && (
                <Box mt={2}>
                  {customizeRadio === "percent" ? (
                    <input
                      style={{
                        width: "100%",
                        height: "32px",
                        border: "1px solid #003566",
                        padding: "0px 5px",
                        color: "#003566",
                      }}
                      type="text"
                      value={`7%`}
                    />
                  ) : (
                    <input
                      style={{
                        width: "100%",
                        height: "32px",
                        border: "1px solid #003566",
                        padding: "0px 5px",
                        color: "#003566",
                      }}
                      type="text"
                      value={`7%`}
                    />
                  )}
                </Box>
              )}

              {openCustomize && (
                <>
                  <Box>This is Under Construction</Box>
                  <Box
                    mt={2}
                    style={{
                      display: "none",
                    }}
                  >
                    <Box>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          row
                          value={customizeRadio}
                          onChange={handleCustomizeRadio}
                        >
                          <FormControlLabel
                            value="percent"
                            control={<BpRadio />}
                            label="Percent"
                            sx={{
                              mr: "21px",
                            }}
                          />
                          <FormControlLabel
                            value="amount"
                            control={<BpRadio />}
                            label="Amount"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>

                    {customizeRadio === "percent" ? (
                      <input
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid #003566",
                          padding: "0px 5px",
                          color: "#003566",
                          borderRadius: "5px",
                        }}
                        type="text"
                        placeholder={
                          defaultCommissionRate !== 0 && "increase by %"
                        }
                        value={`${defaultCommissionRate}`}
                        onChange={(e) =>
                          setDefaultCommissionRate(e.target.value)
                        }
                      />
                    ) : (
                      <>
                        {/* <input
                        style={{
                          width: "100%",
                          height: "30px",
                          border: "1px solid #003566",
                          padding: "0px 5px",
                          color: "#003566",
                          borderRadius: "5px",
                        }}
                        type="text"
                        placeholder={
                          defaultCommissionRate !== 0 && "increase by TK"
                        }
                        value={`${commaNumber(defaultCommissionRateAmount)}BDT`}
                        onChange={(e) =>
                          setDefaultCommissionRateAmount(e.target.value)
                        }
                      /> */}
                        <Typography variant="BUTTON TEXT">
                          This section is under construction
                        </Typography>
                      </>
                    )}
                  </Box>
                </>
              )}

              <Box mt={1} className="cm-save-btn">
                <button
                  onClick={() => {
                    setOpenCm(false);
                    secureLocalStorage.setItem("commissionData", {
                      agentFarePrice,
                      commissionFarePrice: commisionFarePrice,
                      defaultCommissionRate,
                      defaultCommissionRateAmount,
                      customizeRadio,
                      openCustomize,
                      openDefault,
                      customerFare,
                    });
                  }}
                >
                  Save
                </button>
              </Box>
              {openDefault ? (
                <Box mt={2}>
                  <p
                    style={{
                      color: "#003566",
                      fontSize: "12px",
                      fontWeight: "500",
                      fontFamily: "poppins",
                    }}
                  >
                    Commission rate increased 7%
                  </p>
                </Box>
              ) : (
                <Box mt={2}>
                  <p
                    style={{
                      color: "#003566",
                      fontSize: "12px",
                      fontWeight: "500",
                      fontFamily: "poppins",
                    }}
                  >
                    Commission rate increased{" "}
                    {customizeRadio === "percent"
                      ? defaultCommissionRate
                      : defaultCommissionRateAmount}
                    {customizeRadio === "percent" ? "%" : <span>&#2547;</span>}
                  </p>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Commission;
