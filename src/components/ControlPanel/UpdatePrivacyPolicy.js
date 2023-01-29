import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import Success from "../../images/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";

export const UpdatePrivacyPolicy = () => {
  const editor = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [privacy, setPrivacy] = useState("");
  const [agentId, setAgentId] = useState("");
  const [siteConfig, setSiteConfig] = useState({});
  useEffect(() => {
    //todo: fetching the data
    axios
      .get(
        `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
          "www.",
          ""
        )}`
      )
      .then((res) => {
        setSiteConfig(res?.data);
        setAgentId(res?.data?.agentId);
        setPrivacy(res?.data?.privacy_policy);
      });
  }, []);

  //todo: update Text field
  const updateData = async (name, value) => {
    setIsLoading(true);
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/add.php?option=${name}&agentId=${agentId}`;
    const body = {
      method: "POST",
      "application-type": "application/json",
      body: JSON.stringify({
        data: value,
      }),
    };
    await fetch(url, body)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status.toLowerCase() === "success") {
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: err.message,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(function () {
          caches
            .keys()
            .then((keyList) =>
              Promise.all(keyList.map((key) => caches.delete(key)))
            );
          window.location.reload(true);
        });
      });
  };
  return (
    <Box>
      <Grid
        container
        sx={{ margin: "30px 0px 30px" }}
        columnSpacing={1}
        rowSpacing={1}
      >
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            sx={{
              color: "var(--black)",
              fontSize: "calc(16px + 0.390625vw)",
              fontWeight: 400,
            }}
          >
            Update Privacy Policy (1000 Words)
          </Typography>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Box
            sx={{
              width: "100%",
              height: "fit-content",
            }}
          >
            {/* <TextareaAutosize
              name="privacy"
              id="privacy"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              minRows={10}
              maxRows={10}
              placeholder="Write Privacy..."
              style={{
                width: "calc(100% - 10px)",
                outline: "none",
                border: "none",
                paddingLeft: "10px",
                backgroundColor: "var(--input-bgcolor)",
                borderRadius: "5px",
              }}
            /> */}
            <JoditEditor
              ref={editor}
              value={privacy}
              onChange={(newContent) => setPrivacy(newContent)}
            />
            <Box>
              <Button
                sx={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  fontSize: "14px",
                  "&:hover": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                  margin: "5px 0px",
                }}
                onClick={() => updateData("privacy", privacy)}
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
