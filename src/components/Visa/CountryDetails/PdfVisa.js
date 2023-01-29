import React from "react";
import "hammerjs";
import "@progress/kendo-theme-material/dist/all.css";
import { useRef } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport } from "@progress/kendo-react-pdf";
import logo from "../../../images/logo.png";
import pdfFooter from "../../../images/pdfFooter.png";
import { Box, Container } from "@mui/system";
import pdf1 from "../../../images/pdf1.png";

const footer = {
  backgroundImage: `url(${pdfFooter})`,
  backgroundSize: "cover",
  height: "8vh",
};

const bg = {
  backgroundImage: `url(${pdf1})`,
  backgroundRepeat: "no-repeat",
};

const PdfVisa = () => {
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };
  return (
    <div id="example">
      <Container>
        <div
          style={{ textAlign: "right", position: "fixed" }}
          className="box-col"
        >
          <Button primary={true} onClick={handleExportWithComponent}>
            Print pdf
          </Button>
        </div>
      </Container>

      <div className="page-container hidden-on-narrow">
        <PDFExport ref={pdfExportComponent}>
          <div style={bg} className="pdf-page size-a4">
            <div className="inner-page">
              <div className="pdf-header">
                <img
                  style={{
                    width: "150px",
                    position: "relative",
                    left: "-15px",
                  }}
                  src={logo}
                />
              </div>

              <div className="pdf-body">
                <h3>Ledger Report From</h3>
              </div>
            </div>

            <div className="pdf-footer">
              <Box className="footer-pdf" style={footer}>
                <p>01755543442, 09639205205</p>
                <span>WWW.FLYFARINT.COM</span>
              </Box>
            </div>
          </div>
        </PDFExport>
      </div>
    </div>
  );
};

export default PdfVisa;
